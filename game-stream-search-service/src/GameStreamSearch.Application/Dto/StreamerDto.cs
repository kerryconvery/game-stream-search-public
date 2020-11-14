using System;
using GameStreamSearch.Application.Enums;

namespace GameStreamSearch.Application.Dto
{
    public class StreamerDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public StreamPlatformType StreamPlatform { get; set; }
        public DateTime DateRegistered { get; set; }
        public string StreamPlatformDisplayName => StreamPlatform.GetFriendlyName();
    }
}
