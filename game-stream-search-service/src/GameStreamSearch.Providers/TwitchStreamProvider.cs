using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.Services.Dto;
using GameStreamSearch.Services.Interfaces;
using GameStreamSearch.StreamProviders.ProviderApi.Twitch.Interfaces;
using Base64Url;
using System.Security.Cryptography;

namespace GameStreamSearch.Providers
{
    public class TwitchStreamProvider : IStreamProvider
    {
        private readonly ITwitchKrakenApi twitchStreamApi;

        public TwitchStreamProvider(ITwitchKrakenApi twitchStreamApi)
        {
            this.twitchStreamApi = twitchStreamApi;
        }

        private int GetPageOffset(string nextPageToken)
        {
            if (string.IsNullOrEmpty(nextPageToken))
            {
                return 0;
            }

            var base64Decrypter = new Base64Decryptor(nextPageToken, new FromBase64Transform());

            return base64Decrypter.ReadInt32();
        }

        private string GetPageToken(int pageOffset)
        {
            var base64Encryptor = new Base64Encryptor(new ToBase64Transform());

            base64Encryptor.Write(pageOffset);

            return base64Encryptor.ToString();
        }

        public async Task<GameStreamsDto> GetLiveStreamsByGameName(string gameName, int pageSize, string pageToken = null)
        {
            var pageOffset = GetPageOffset(pageToken);

            var liveStreams = await twitchStreamApi.SearchStreams(gameName, pageSize, pageOffset);

            var nextPageToken = GetPageToken(pageOffset + pageSize);


            return new GameStreamsDto
            {
                Items = liveStreams.streams.Select(s => new GameStreamDto
                {
                    Streamer = s.channel.display_name,
                    GameName = s.channel.status,
                    ImageUrl = s.preview.large,
                    PlatformName = ProviderName,
                    StreamUrl = s.channel.url,
                    IsLive = true,
                    Views = s.viewers,
                }),
                NextPageToken = nextPageToken
            };
        }

        public async Task<GameStreamsDto> GetOnDemandStreamsByGameName(string gameName)
        {
            var topVideos = await twitchStreamApi.GetTopVideos(gameName);

            return new GameStreamsDto
            {
                Items = topVideos.vods.Select(v => new GameStreamDto
                {
                    Streamer = v.channel.display_name,
                    GameName = v.title,
                    ImageUrl = v.preview.medium,
                    PlatformName = ProviderName,
                    StreamUrl = v.url,
                    IsLive = false,
                    Views = v.views,
                })
            };
        }

        public Task<IEnumerable<GameStreamDto>> GetTopLiveStreams()
        {
            return null;
        }

        public string ProviderName { get; } = "Twitch";
    }
}
