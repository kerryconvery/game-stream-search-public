using System;
using GameStreamSearch.Application.Enums;

namespace GameStreamSearch.Application.Dto
{
    public class StreamerChannelDto
    {
        public string ChannelName { get; set; }
        public StreamPlatformType Platform { get; set; }
        public string AvatarUrl { get; set; }
        public string ChannelUrl { get; set; }
    }
}
