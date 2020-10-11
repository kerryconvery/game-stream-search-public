using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameStreamSearch.Services.Dto;
using GameStreamSearch.StreamProviders;
using GameStreamSearch.StreamProviders.Builders;
using GameStreamSearch.StreamProviders.ProviderApi.YouTube;
using GameStreamSearch.StreamProviders.ProviderApi.YouTube.Dto.YouTubeV3;
using GameStreamSearch.StreamProviders.ProviderApi.YouTube.Interfaces;
using Moq;
using NUnit.Framework;

namespace GameSearchService.StreamProviders.Tests
{
    
    public class YouTubeStreamProviderTests
    {
        private YouTubeVideoSearchDto liveStreams = new YouTubeVideoSearchDto()
        {
             items = new List<YouTubeVideoSearchItemDto>
             {
                 new YouTubeVideoSearchItemDto
                 {
                     id = new YouTubeVideoSearchItemIdDto
                     {
                         videoId = "stream1"
                     },
                     snippet = new YouTubeVideoSearchSnippetDto
                     {
                         channelTitle = "fake channel",
                         title = "fake game",
                         thumbnails = new YouTubeVideoSearchSnippetThumbnailsDto
                         {
                             high = new YouTubeVideoSearchSnippetThumbnailDto
                             {
                                 url = "http://fake.thumbnail.url"
                             }
                         }
                     }
                 }
             },
             nextPageToken = "next page token"
        };

        private YouTubeVideoStatisticsPartDto streamStatistics = new YouTubeVideoStatisticsPartDto
        {
            items = new List<YouTubeVideoStatisticsItemDto>
            {
                new YouTubeVideoStatisticsItemDto
                {
                    id = "stream1",
                    statistics = new YouTubeVideoStatisticsDto
                    {
                        viewCount = 2,
                    },
                }
            }
        };

        private Mock<IYouTubeWatchUrlBuilder> watchUrlBuilderStub;
        private string watchUrl = "fake.watch.url";

        [SetUp]
        public void Setup()
        {
            watchUrlBuilderStub = new Mock<IYouTubeWatchUrlBuilder>();
            watchUrlBuilderStub.Setup(m => m.Build("stream1")).Returns(watchUrl);
        }

        [Test]
        public async Task Should_Return_A_List_Of_Streams()
        {
            var youTubeV3ApiStub = new Mock<IYouTubeV3Api>();

            youTubeV3ApiStub.Setup(m => m.SearchVideos("fake game", VideoEventType.Live, "fake page token")).ReturnsAsync(liveStreams);
            youTubeV3ApiStub.Setup(m => m.GetVideoStatisticsPart(It.Is<IEnumerable<string>>(i => i.First() == "stream1"))).ReturnsAsync(streamStatistics);

            var youTubeStreamProvider = new YouTubeStreamProvider("YouTube", watchUrlBuilderStub.Object, youTubeV3ApiStub.Object);

            var streams = await youTubeStreamProvider.GetLiveStreams(new StreamFilterOptionsDto { GameName = "fake game" }, 1, "fake page token");

            Assert.AreEqual(streams.Items.Count(), 1);
            Assert.AreEqual(streams.Items.First().GameName, liveStreams.items.First().snippet.title);
            Assert.AreEqual(streams.Items.First().Streamer, liveStreams.items.First().snippet.channelTitle);
            Assert.AreEqual(streams.Items.First().ImageUrl, liveStreams.items.First().snippet.thumbnails.high.url);
            Assert.AreEqual(streams.Items.First().StreamUrl, watchUrl);
            Assert.AreEqual(streams.Items.First().Views, 2);
            Assert.IsTrue(streams.Items.First().IsLive);
            Assert.AreEqual(streams.NextPageToken, liveStreams.nextPageToken);
        }

        [Test]
        public async Task Should_Return_As_Empty_List_Of_Streams_When_There_Is_An_Api_Error()
        {
            var youTubeV3ApiStub = new Mock<IYouTubeV3Api>();

            youTubeV3ApiStub.Setup(m => m.SearchVideos(null, VideoEventType.Live, null)).ReturnsAsync(new YouTubeVideoSearchDto());

            var youTubeStreamProvider = new YouTubeStreamProvider("YouTube", watchUrlBuilderStub.Object, youTubeV3ApiStub.Object);

            var streams = await youTubeStreamProvider.GetLiveStreams(new StreamFilterOptionsDto(), 1, null);

            Assert.IsEmpty(streams.Items);
            Assert.IsNull(streams.NextPageToken);
        }
    }
}
