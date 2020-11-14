using System;

namespace GameStreamSearch.StreamPlatformApi.DLive.Dto
{
    public class DLiveUserByDisplayNameDataDto
    {
        public DLiveUserDto userByDisplayName { get; set; }
    }

    public class DLiveUserByDisplayNameDto
    {
        public DLiveUserByDisplayNameDataDto data { get; set; }
    }
}
