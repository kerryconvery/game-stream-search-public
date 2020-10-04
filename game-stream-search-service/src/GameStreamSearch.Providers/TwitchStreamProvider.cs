using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.Services.Dto;
using GameStreamSearch.Services.Interfaces;
using GameStreamSearch.StreamProviders.ProviderApi.Twitch.Interfaces;

namespace GameStreamSearch.Providers
{
    public class TwitchStreamProvider : IStreamProvider
    {
        private readonly ITwitchKrakenApi twitchStreamApi;

        public TwitchStreamProvider(ITwitchKrakenApi twitchStreamApi)
        {
            this.twitchStreamApi = twitchStreamApi;
        }

        public async Task<IEnumerable<GameStreamDto>> GetStreams(string gameName)
        {
            var searchStreamRequest = twitchStreamApi.SearchStreams(gameName);
            var topVideosRequest = twitchStreamApi.GetTopGameVideos(gameName);

            var searchStreamResult = await searchStreamRequest;
            var topVideosResult = await topVideosRequest;

            var liveStreams = searchStreamResult?.streams.Select(s =>
                new GameStreamDto
                {
                    Streamer = s.channel.display_name,
                    GameName = s.channel.status,
                    ImageUrl = s.preview.large,
                    PlatformName = "Twitch",
                    StreamUrl = s.channel.url,
                    IsLive = true,
                    Views = s.viewers,
                }).ToList();

            var videoStreams = topVideosResult?.vods.Select(v => new GameStreamDto
            {
                Streamer = v.channel.display_name,
                GameName = v.title,
                ImageUrl = v.preview.medium,
                PlatformName = "Twitch",
                StreamUrl = v.url,
                IsLive = false,
                Views = v.views,
            });

            var gameStreams = new List<GameStreamDto>();

            gameStreams.AddRange(liveStreams);
            gameStreams.AddRange(videoStreams);

            return gameStreams;
        }
    }
}
