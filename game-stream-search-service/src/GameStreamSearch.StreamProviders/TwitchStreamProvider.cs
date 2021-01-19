﻿using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.Application;
using GameStreamSearch.Application.Dto;
using Base64Url;
using System.Security.Cryptography;
using GameStreamSearch.Application.Enums;
using GameStreamSearch.StreamPlatformApi;
using GameStreamSearch.StreamPlatformApi.Twitch.Dto.Kraken;
using GameStreamSearch.Types;

namespace GameStreamSearch.StreamProviders
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
                StreamUrl = s.channel.url,
                StreamPlatformName = Platform.GetFriendlyName(),
                IsLive = true,
                Views = s.viewers,
            });
        }

        public async Task<GameStreamsDto> GetLiveStreams(StreamFilterOptions filterOptions, int pageSize, string pageToken = null)
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

        public async Task<MaybeResult<StreamerChannelDto, GetStreamerChannelErrorType>> GetStreamerChannel(string channelName)
        {
            var channelsResult = await twitchStreamApi.SearchChannels(channelName, 1, 0);

            if (channelsResult.Channels.Count() == 0) {
                return MaybeResult<StreamerChannelDto, GetStreamerChannelErrorType>.Success(Maybe<StreamerChannelDto>.Nothing());
            }

            if (!channelsResult.Channels.First().display_name.Equals(channelName, System.StringComparison.CurrentCultureIgnoreCase))
            {
                return MaybeResult<StreamerChannelDto, GetStreamerChannelErrorType>.Success(Maybe<StreamerChannelDto>.Nothing());
            }

            return MaybeResult<StreamerChannelDto, GetStreamerChannelErrorType>.Success(
                new StreamerChannelDto
                {
                    ChannelName = channelsResult.Channels.First().display_name,
                    AvatarUrl = channelsResult.Channels.First().logo,
                    ChannelUrl = channelsResult.Channels.First().url,
                    Platform = Platform,
                }
            );
        }

        public StreamPlatformType Platform => StreamPlatformType.Twitch;
    }
}
