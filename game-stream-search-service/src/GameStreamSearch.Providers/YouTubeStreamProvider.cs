using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.Services.Dto;
using GameStreamSearch.Services.Interfaces;
using GameStreamSearch.StreamProviders.ProviderApi.YouTube;
using GameStreamSearch.StreamProviders.ProviderApi.YouTube.Interfaces;
using GameStreamSearch.StreamProviders.ProviderApi.YouTube.Dto.YouTubeV3;

namespace GameStreamSearch.StreamProviders
{
    public class YouTubeStreamProvider : IStreamProvider
    {
        private readonly string platformName = "YouTube";
        private readonly IYouTubeV3Api youTubeV3Api;
        private readonly string streamUrl;

        public YouTubeStreamProvider(IYouTubeV3Api youTubeV3Api, string streamUrl)
        {
            this.youTubeV3Api = youTubeV3Api;
            this.streamUrl = streamUrl;
        }

        private IEnumerable<GameStreamDto> mapToGameStreams(IEnumerable<YouTubeVideoSearchItemDto> videos, IEnumerable<YouTubeVideoStatisticsItemDto> videoStatistics, bool isLive)
        {

            var gameStreams = videos.Select(v => {
                var statistics = videoStatistics.FirstOrDefault(s => s.id == v.id.videoId)?.statistics;

                return new GameStreamDto
                {
                    Streamer = v.snippet.channelTitle,
                    GameName = v.snippet.title,
                    ImageUrl = v.snippet.thumbnails.high.url,
                    PlatformName = platformName,
                    StreamUrl = string.Format("{0}/watch?v={1}", streamUrl, v.id.videoId),
                    IsLive = isLive,
                    Views = statistics != null ? statistics.viewCount : 0,
                };
            });

            return gameStreams;
        }
        public async Task<IEnumerable<GameStreamDto>> GetStreams(string gameName)
        {
            var liveVideosRequest = youTubeV3Api.SearchVideos(gameName, VideoEventType.Live);
            var completedVideosRequest = youTubeV3Api.SearchVideos(gameName, VideoEventType.Completed);

            var liveVideos = await liveVideosRequest;
            var completedVideos = await completedVideosRequest;

            var videoIds = new List<string>();

            videoIds.AddRange(liveVideos.items.Select(v => v.id.videoId));
            videoIds.AddRange(completedVideos.items.Select(v => v.id.videoId));

            var statistics = await youTubeV3Api.GetVideoStatisticsPart(videoIds);

            var liveStreams = mapToGameStreams(liveVideos.items, statistics.items, true);
            var completedStreams = mapToGameStreams(completedVideos.items, statistics.items, false);

            var gameStreams = new List<GameStreamDto>();

            gameStreams.AddRange(liveStreams);
            gameStreams.AddRange(completedStreams);

            return gameStreams;
        }
    }
}
