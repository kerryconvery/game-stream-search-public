﻿using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.Services.Dto;
using GameStreamSearch.Services.Interfaces;
using GameStreamSearch.StreamProviders.ProviderApi.Twitch.Interfaces;
using Base64Url;
using System.Security.Cryptography;
using GameStreamSearch.StreamProviders.ProviderApi.Twitch.Dto.Kraken;

namespace GameStreamSearch.Providers
{
    public class TwitchStreamProvider : IStreamProvider
    {
        private readonly ITwitchKrakenApi twitchStreamApi;

        public TwitchStreamProvider(string providerName, ITwitchKrakenApi twitchStreamApi)
        {
            ProviderName = providerName;
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

        private string GetNextPageToken(bool hasStreams, int pageSize, int pageOffset)
        {
            if (!hasStreams)
            {
                return null;
            }

            var base64Encryptor = new Base64Encryptor(new ToBase64Transform());

            base64Encryptor.Write(pageOffset + pageSize);

            return base64Encryptor.ToString();
        }

        public IEnumerable<GameStreamDto> MapToGameStream(TwitchLiveStreamDto liveStreams)
        {
            return liveStreams.streams.Select(s => new GameStreamDto
            {
                StreamTitle = s.channel.status,
                StreamerName = s.channel.display_name,
                StreamerAvatarUrl = s.channel.logo,
                StreamThumbnailUrl = s.preview.medium,
                PlatformName = ProviderName,
                StreamUrl = s.channel.url,
                IsLive = true,
                Views = s.viewers,
            });
        }

        public async Task<GameStreamsDto> GetLiveStreams(StreamFilterOptionsDto filterOptions, int pageSize, string pageToken = null)
        {
            var pageOffset = GetPageOffset(pageToken);

            TwitchLiveStreamDto liveStreams;

            if (string.IsNullOrEmpty(filterOptions.GameName))
            {
                liveStreams = await twitchStreamApi.GetLiveStreams(pageSize, pageOffset);
            }
            else
            {
                liveStreams = await twitchStreamApi.SearchStreams(filterOptions.GameName, pageSize, pageOffset);
            }

            if (liveStreams.streams == null)
            {
                return GameStreamsDto.Empty();
            }

            var nextPageToken = GetNextPageToken(liveStreams.streams.Any(), pageSize, pageOffset);


            return new GameStreamsDto
            {
                Items = MapToGameStream(liveStreams),
                NextPageToken = nextPageToken
            };
        }

        public string ProviderName { get; private set; }
    }
}
