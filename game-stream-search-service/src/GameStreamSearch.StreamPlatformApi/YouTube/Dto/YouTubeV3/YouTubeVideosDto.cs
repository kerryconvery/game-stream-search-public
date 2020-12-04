﻿using System;
using System.Collections.Generic;

namespace GameStreamSearch.StreamPlatformApi.YouTube.Dto.YouTubeV3
{
    public class YouTubeVideoLiveStreamingDetailsDto
    {
        public int concurrentViewers { get; set; }
    }

    public class YouTubeVideoStatisticsDto
    {
        public int viewCount { get; set; }
    }

    public class YouTubeVideoDto
    {
        public string id { get; set; }
        public YouTubeVideoStatisticsDto statistics { get; set; }
        public YouTubeVideoLiveStreamingDetailsDto liveStreamingDetails { get; set; }
    }

    public class YouTubeVideosDto
    {
        public IEnumerable<YouTubeVideoDto> items { get; set; }
    }
}