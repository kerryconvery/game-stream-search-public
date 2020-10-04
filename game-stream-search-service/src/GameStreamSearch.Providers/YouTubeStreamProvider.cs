using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.Services.Dto;
using GameStreamSearch.Services.Interfaces;
using GameStreamSearch.StreamProviders.ProviderApi.YouTube;
using GameStreamSearch.StreamProviders.ProviderApi.YouTube.Interfaces;

namespace GameStreamSearch.StreamProviders
{
    public class YouTubeStreamProvider : IStreamProvider
    {
        private readonly IYouTubeV3Api youTubeV3Api;

        public YouTubeStreamProvider(IYouTubeV3Api youTubeV3Api)
        {
            this.youTubeV3Api = youTubeV3Api;
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

            var statisticsPart = await youTubeV3Api.GetVideoStatisticsPart(videoIds);

            var liveStreams = liveVideos.items.Select(v => {
                var statistics = statisticsPart.items.FirstOrDefault(s => s.id == v.id.videoId)?.statistics;

                return new GameStreamDto
                {
                    Streamer = v.snippet.channelTitle,
                    GameName = v.snippet.title,
                    ImageUrl = v.snippet.thumbnails.high.url,
                    PlatformName = "YouTube",
                    StreamUrl = string.Format("https://www.youtube.com/watch?v={0}", v.id.videoId),
                    IsLive = true,
                    Views = statistics != null ? statistics.viewCount : 0,
                };
            });

            var completedStreams = completedVideos.items.Select(v => {
                var statistics = statisticsPart.items.FirstOrDefault(s => s.id == v.id.videoId)?.statistics;

                return new GameStreamDto
                {
                    Streamer = v.snippet.channelTitle,
                    GameName = v.snippet.title,
                    ImageUrl = v.snippet.thumbnails.high.url,
                    PlatformName = "YouTube",
                    StreamUrl = string.Format("https://www.youtube.com/watch?v={0}", v.id.videoId),
                    IsLive = false,
                    Views = statistics != null ? statistics.viewCount : 0,
                };
            });

            var gameStreams = new List<GameStreamDto>();

            gameStreams.AddRange(liveStreams);
            gameStreams.AddRange(completedStreams);

            return gameStreams;
        }
    }
}
