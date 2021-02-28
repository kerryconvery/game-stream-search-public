﻿using System.Collections.Generic;
using System.Linq;
using GameStreamSearch.Application.StreamProvider.Dto;
using GameStreamSearch.StreamProviders.Const;
using GameStreamSearch.StreamProviders.Twitch.Gateways.Dto.Kraken;
using GameStreamSearch.Types;

namespace GameStreamSearch.StreamProviders.Twitch.Mappers
{
    public class TwitchStreamMapper
    {
        public PlatformStreamsDto Map(
            MaybeResult<IEnumerable<TwitchStreamDto>, StreamProviderError> twitchStreamResults,
            int pageSize,
            int pageOffset
        )
        {
            return twitchStreamResults.Select(streams =>
            {
                var nextPagToken = streams.Count() == pageSize ? (pageOffset + pageSize).ToString() : string.Empty;
                return new PlatformStreamsDto
                {
                    StreamPlatformName = StreamPlatform.Twitch,
                    Streams = streams.Select(stream => new PlatformStreamDto
                    {
                        StreamTitle = stream.channel.status,
                        StreamerName = stream.channel.display_name,
                        StreamerAvatarUrl = stream.channel.logo,
                        StreamThumbnailUrl = stream.preview.medium,
                        StreamUrl = stream.channel.url,
                        IsLive = true,
                        Views = stream.viewers,
                    }),
                    NextPageToken = nextPagToken,
                };
            }).GetOrElse(PlatformStreamsDto.Empty(StreamPlatform.Twitch));
        }
    }
}
