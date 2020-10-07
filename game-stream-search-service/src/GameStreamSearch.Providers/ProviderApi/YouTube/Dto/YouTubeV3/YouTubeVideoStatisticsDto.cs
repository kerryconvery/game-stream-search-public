using System;
using System.Collections.Generic;

namespace GameStreamSearch.StreamProviders.ProviderApi.YouTube.Dto.YouTubeV3
{
    public class YouTubeVideoStatisticsDto {
        public int viewCount { get; set; }
    }

    public class YouTubeVideoStatisticsItemDto
    {
        public string id { get; set; }
        public YouTubeVideoStatisticsDto statistics { get; set; }
    }

    public class YouTubeVideoStatisticsPartDto
    {
        public IEnumerable<YouTubeVideoStatisticsItemDto> items { get; set; }
    }
}
