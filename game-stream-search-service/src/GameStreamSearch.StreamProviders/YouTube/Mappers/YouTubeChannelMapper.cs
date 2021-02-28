﻿using System.Collections.Generic;
using System.Linq;
using GameStreamSearch.Application.StreamProvider.Dto;
using GameStreamSearch.StreamProviders.Const;
using GameStreamSearch.StreamProviders.YouTube.Gateways.Dto.V3;
using GameStreamSearch.Types;

namespace GameStreamSearch.StreamProviders.YouTube.Mappers.V3
{
    public class YouTubeChannelMapper
    {
        private readonly string youTubeWebUrl;

        public YouTubeChannelMapper(string youTubeWebUrl)
        {
            this.youTubeWebUrl = youTubeWebUrl;
        }

        public MaybeResult<PlatformChannelDto, StreamProviderError> Map(
            MaybeResult<IEnumerable<YouTubeChannelDto>, StreamProviderError> channelSnippetResults)
        {
            return channelSnippetResults.Select(channelSnippets =>
            {
                return channelSnippets.Select(channelSnippet =>
                {
                    return new PlatformChannelDto
                    {
                        ChannelName = channelSnippet.snippet.title,
                        AvatarUrl = channelSnippet.snippet.thumbnails.@default.url,
                        ChannelUrl = $"{youTubeWebUrl}/user/{channelSnippet.snippet.title}",
                        StreamPlatformName = StreamPlatform.YouTube,
                    };
                })
                .FirstOrDefault();
            });
        }
    }
}
