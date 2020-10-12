using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.Services.Dto;
using GameStreamSearch.Services.Interfaces;
using GameStreamSearch.StreamProviders.ProviderApi.YouTube;
using GameStreamSearch.StreamProviders.ProviderApi.YouTube.Interfaces;
using GameStreamSearch.StreamProviders.ProviderApi.YouTube.Dto.YouTubeV3;
using GameStreamSearch.StreamProviders.Builders;

namespace GameStreamSearch.StreamProviders
{
    public class YouTubeStreamProvider : IStreamProvider
    {
        private readonly IYouTubeWatchUrlBuilder urlBuilder;
        private readonly IYouTubeV3Api youTubeV3Api;

        public YouTubeStreamProvider(string providerName, IYouTubeWatchUrlBuilder urlBuilder, IYouTubeV3Api youTubeV3Api)
        {
            ProviderName = providerName;
            this.urlBuilder = urlBuilder;
            this.youTubeV3Api = youTubeV3Api;
        }

        private IEnumerable<GameStreamDto> mapToGameStream(IEnumerable<YouTubeVideoSearchItemDto> streams, IEnumerable<YouTubeVideoStatisticsItemDto> streamStatistics, bool isLive)
        {
            var gameStreams = streams.Select(v => {
                var statistics = streamStatistics.FirstOrDefault(s => s.id == v.id.videoId)?.statistics;

                return new GameStreamDto
                {
                    Streamer = v.snippet.channelTitle,
                    GameName = v.snippet.title,
                    ImageUrl = v.snippet.thumbnails.medium.url,
                    PlatformName = ProviderName,
                    StreamUrl = urlBuilder.Build(v.id.videoId),
                    IsLive = isLive,
                    Views = statistics != null ? statistics.viewCount : 0,
                };
            });

            return gameStreams;
        }

        private async Task<IEnumerable<YouTubeVideoStatisticsItemDto>> GetStreamStatistics(
            IEnumerable<YouTubeVideoSearchItemDto> streams)
        {
            var videoIds = new List<string>();

            videoIds.AddRange(streams.Select(v => v.id.videoId));

            var statistics = await youTubeV3Api.GetVideoStatisticsPart(videoIds);

            return statistics.items;
        }

        public async Task<GameStreamsDto> GetLiveStreams(StreamFilterOptionsDto filterOptions, int pageSize, string pageToken = null)
        {
            var liveVideos = await youTubeV3Api.SearchVideos(filterOptions.GameName, VideoEventType.Live, pageToken);

            if (liveVideos.items == null)
            {
                return GameStreamsDto.Empty();
            }

            var statistics = await GetStreamStatistics(liveVideos.items);

            return new GameStreamsDto
            {
                Items = mapToGameStream(liveVideos.items, statistics, true),
                NextPageToken = liveVideos.nextPageToken,
            };
        }

        public async Task<GameStreamsDto> GetOnDemandStreamsByGameName(string gameName)
        {
            var completedVideos = await youTubeV3Api.SearchVideos(gameName, VideoEventType.Completed, null);

            if (completedVideos.items == null)
            {
                return GameStreamsDto.Empty();
            }

            var statistics = await GetStreamStatistics(completedVideos.items);

            return new GameStreamsDto
            {
                Items = mapToGameStream(completedVideos.items, statistics, false),
            };
        }

        public Task<IEnumerable<GameStreamDto>> GetTopLiveStreams()
        {
            return null;
        }

        public string ProviderName { get; private set;  }
    }
}
