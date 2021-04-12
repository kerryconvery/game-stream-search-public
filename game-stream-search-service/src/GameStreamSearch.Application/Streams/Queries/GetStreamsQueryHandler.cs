using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameStreamSearch.Application.Services.StreamProvider;
using GameStreamSearch.Application.StreamProvider;

namespace GameStreamSearch.Application.GetStreams
{
    public class StreamFilters
    {
        public string GameName { get; init; }
    }

    public class GetStreamsQuery
    {
        public IEnumerable<string> StreamPlatformNames { get; init; }
        public StreamFilters Filters { get; init; }
        public string PageToken { get; init; }
        public int PageSize { get; init; }
    }

    public class Stream
    {
        public string StreamTitle { get; init; }
        public string StreamThumbnailUrl { get; init; }
        public string StreamUrl { get; init; }
        public string StreamerName { get; init; }
        public string StreamerAvatarUrl { get; init; }
        public string PlatformName { get; set; }
        public bool IsLive { get; init; }
        public int Views { get; init; }
    }

    public class GetStreamsResponse
    {
        public IEnumerable<Stream> Streams { get; init; }
        public string NextPageToken { get; init; }
    }

    public class GetStreamsQueryHandler : IQueryHandler<GetStreamsQuery, GetStreamsResponse>
    {
        private readonly StreamPlatformService streamPlatformService;

        public GetStreamsQueryHandler(StreamPlatformService streamPlatformService)
        {
            this.streamPlatformService = streamPlatformService;
        }

        public async Task<GetStreamsResponse> Execute(GetStreamsQuery query)
        {
            var streamFilters = new StreamFilterOptions { GameName = query.Filters.GameName };

            var unpackedTokens = PageTokens.UnpackTokens(query.PageToken);

            var supportedPlatforms = streamPlatformService.GetSupportingPlatforms(streamFilters);

            var platformStreams = await streamPlatformService.GetStreams(supportedPlatforms, streamFilters, query.PageSize, unpackedTokens);

            var packedTokens = PageTokens
                .FromList(platformStreams.Select(p => new PageToken(p.StreamPlatformName, p.NextPageToken)))
                .PackTokens();

            var aggregatedStreams = platformStreams.SelectMany(p => p.Streams.Select(s => new Stream
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

            return new GetStreamsResponse
            {
                Streams = aggregatedStreams.OrderByDescending(s => s.Views),
                NextPageToken = packedTokens
            };
        }
    }
}
