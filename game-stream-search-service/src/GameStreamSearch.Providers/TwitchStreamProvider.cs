using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.Services.Dto;
using GameStreamSearch.Services.Interfaces;
using GameStreamSearch.StreamProviders.ProviderApi.Twitch.Interfaces;
using GameStreamSearch.StreamProviders.Twitch.Dto.Kraken;
using GameStreamSearch.StreamProviders.ProviderApi.Twitch.Dto.Kraken;

namespace GameStreamSearch.Providers
{
    public class TwitchStreamProvider : IStreamProvider
    {
        private readonly string platformName = "Twitch";

        private readonly ITwitchKrakenApi twitchStreamApi;

        public TwitchStreamProvider(ITwitchKrakenApi twitchStreamApi)
        {
            this.twitchStreamApi = twitchStreamApi;
        }

        private IEnumerable<GameStreamDto> mapToGameStream(IEnumerable<TwitchStreamDto> liveStreams)
        {
            return liveStreams.Select(s =>
                new GameStreamDto
                {
                    Streamer = s.channel.display_name,
                    GameName = s.channel.status,
                    ImageUrl = s.preview.large,
                    PlatformName = platformName,
                    StreamUrl = s.channel.url,
                    IsLive = true,
                    Views = s.viewers,
                }).ToList();
        }

        private IEnumerable<GameStreamDto> mapToGameStream(IEnumerable<TwitchTopVideoDto> topVideos)
        {
            return topVideos.Select(v => new GameStreamDto
            {
                Streamer = v.channel.display_name,
                GameName = v.title,
                ImageUrl = v.preview.medium,
                PlatformName = platformName,
                StreamUrl = v.url,
                IsLive = false,
                Views = v.views,
            });
        }

        public async Task<IEnumerable<GameStreamDto>> GetStreams(string gameName)
        {
            var searchStreamRequest = twitchStreamApi.SearchStreams(gameName);
            var topVideosRequest = twitchStreamApi.GetTopGameVideos(gameName);

            var searchStreamResult = await searchStreamRequest;
            var topVideosResult = await topVideosRequest;

            var liveStreams = mapToGameStream(searchStreamResult.streams);
            var videoStreams = mapToGameStream(topVideosResult.vods);

            var gameStreams = new List<GameStreamDto>();

            gameStreams.AddRange(liveStreams);
            gameStreams.AddRange(videoStreams);

            return gameStreams;
        }
    }
}
