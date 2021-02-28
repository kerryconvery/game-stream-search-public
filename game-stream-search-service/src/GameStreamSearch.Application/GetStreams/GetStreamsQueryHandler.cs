﻿using System.Linq;
using System.Threading.Tasks;
using GameStreamSearch.Application.GetStreams.Dto;
using GameStreamSearch.Application.Services.StreamProvider;
using GameStreamSearch.Application.StreamProvider;

namespace GameStreamSearch.Application.GetStreams
{
    public class GetStreamsQueryHandler : IQueryHandler<GetStreamsQuery, AggregatedStreamsDto>
    {
        private readonly StreamPlatformService streamPlatformService;

        public GetStreamsQueryHandler(StreamPlatformService streamPlatformService)
        {
            this.streamPlatformService = streamPlatformService;
        }

        public async Task<AggregatedStreamsDto> Execute(GetStreamsQuery query)
        {
            var streamFilters = new StreamFilterOptions { GameName = query.Filters.GameName };

            var unpackedTokens = PageTokens.UnpackTokens(query.PageToken);

            var supportedPlatforms = streamPlatformService.GetSupportingPlatforms(streamFilters);

            var platformStreams = await streamPlatformService.GetStreams(supportedPlatforms, streamFilters, query.PageSize, unpackedTokens);

            var packedTokens = PageTokens
                .FromList(platformStreams.Select(p => new PageToken(p.StreamPlatformName, p.NextPageToken)))
                .PackTokens();

            var aggregatedStreams = platformStreams.SelectMany(p => p.Streams.Select(s => new StreamDto
                {
                    StreamTitle = s.StreamTitle,
                    StreamerName = s.StreamerName,
                    StreamUrl = s.StreamUrl,
                    IsLive = s.IsLive,
                    Views = s.Views,
                    PlatformName = p.StreamPlatformName,
                    StreamThumbnailUrl = s.StreamThumbnailUrl,
                    StreamerAvatarUrl = s.StreamerAvatarUrl,
                }));

            return new AggregatedStreamsDto
            {
                Streams = aggregatedStreams.OrderByDescending(s => s.Views),
                NextPageToken = packedTokens
            };
        }
    }
}
