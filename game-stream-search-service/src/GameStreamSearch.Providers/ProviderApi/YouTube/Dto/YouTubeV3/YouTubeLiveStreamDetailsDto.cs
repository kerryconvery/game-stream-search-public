using System;
using System.Collections.Generic;

namespace GameStreamSearch.StreamProviders.ProviderApi.YouTube.Dto.YouTubeV3
{
    public class YouTubeLiveStreamingDetailsDto
    {
        public int concurrentViewers { get; set; }
    }

    public class YouTubeLiveStreamDetailsItemDto
    {
        public string id { get; set; }
        public YouTubeLiveStreamingDetailsDto liveStreamingDetails { get; set; }
    }

    public class YouTubeLiveStreamDetailsDto
    {
        public IEnumerable<YouTubeLiveStreamDetailsItemDto> items { get; set; }
    }
}
