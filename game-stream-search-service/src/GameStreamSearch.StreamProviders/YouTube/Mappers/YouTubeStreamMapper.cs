﻿using System.Collections.Generic;
using System.Linq;
using GameStreamSearch.Application.StreamProvider.Dto;
using GameStreamSearch.StreamProviders.Const;
using GameStreamSearch.StreamProviders.YouTube.Gateways.Dto.V3;
using GameStreamSearch.Types;

namespace GameStreamSearch.StreamProviders.YouTube.Mappers.V3
{
    public class YouTubeStreamMapper
    {
        private readonly string youTubeWebUrl;

        public YouTubeStreamMapper(string youTubeWebUrl)
        {
            this.youTubeWebUrl = youTubeWebUrl;
        }

        public MaybeResult<PlatformStreamsDto, StreamProviderError> Map(
            YouTubeSearchDto videoSearchResults,
            MaybeResult<IEnumerable<YouTubeVideoDto>, StreamProviderError> videoDetailResults,
            MaybeResult<IEnumerable<YouTubeChannelDto>, StreamProviderError> videoChannelResults)
        {
            return videoDetailResults.Chain(videosResult =>
            {
                return videoChannelResults.Select(channelResults =>
                {
                    var videoDetails = videosResult.ToDictionary(v => v.id, v => v.liveStreamingDetails);
                    var videoChannels = channelResults.ToDictionary(c => c.id, c => c.snippet);

                    return ToStreams(videoSearchResults, videoChannels, videoDetails);
                });
            });
        }

        private PlatformStreamsDto ToStreams(
            YouTubeSearchDto streams,
            Dictionary<string, YouTubeChannelSnippetDto> channelSnippets,
            Dictionary<string, YouTubeVideoLiveStreamingDetailsDto> liveStreamDetails)
        {
            return new PlatformStreamsDto
            {
                StreamPlatformName = StreamPlatform.YouTube,
                Streams = streams.items.Select(v =>
                {
                    var viewers = liveStreamDetails.ContainsKey(v.id.videoId) ? liveStreamDetails[v.id.videoId].concurrentViewers : 0;
                    var avatarUrl = channelSnippets.ContainsKey(v.snippet.channelId) ? channelSnippets[v.snippet.channelId].thumbnails.@default.url : null;

                    return new PlatformStreamDto
                    {
                        StreamerName = v.snippet.channelTitle,
                        StreamTitle = v.snippet.title,
                        StreamThumbnailUrl = v.snippet.thumbnails.medium.url,
                        StreamerAvatarUrl = avatarUrl,
                        StreamUrl = $"{youTubeWebUrl}/watch?v={v.id.videoId}",
                        IsLive = true,
                        Views = viewers,
                    };
                }),
                NextPageToken = streams.nextPageToken ?? string.Empty,
            };
        }
    }
}
