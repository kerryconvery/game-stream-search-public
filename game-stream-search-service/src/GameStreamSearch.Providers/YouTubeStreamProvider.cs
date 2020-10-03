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

            var liveStreams = liveVideos.items.Select(v => new GameStreamDto
            {
                GameName = v.snippet.title,
                ImageUrl = v.snippet.thumbnails.high.url,
                PlatformName = "YouTube",
                StreamUrl = string.Format("https://www.youtube.com/watch?v={0}", v.id.videoId),
                IsLive = true,
            });

            var completedStreams = completedVideos.items.Select(v => new GameStreamDto
            {
                GameName = v.snippet.title,
                ImageUrl = v.snippet.thumbnails.high.url,
                PlatformName = "YouTube",
                StreamUrl = string.Format("https://www.youtube.com/watch?v={0}", v.id.videoId),
                IsLive = false,
            });

            var gameStreams = new List<GameStreamDto>();

            gameStreams.AddRange(liveStreams);
            gameStreams.AddRange(completedStreams);

            return gameStreams;
        }
    }
}
