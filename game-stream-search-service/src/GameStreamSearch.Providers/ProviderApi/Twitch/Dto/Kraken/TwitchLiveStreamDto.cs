using System;
using System.Collections.Generic;

namespace GameStreamSearch.StreamProviders.ProviderApi.Twitch.Dto.Kraken
{
    public class TwitchChannelDto
    {
        public string display_name { get; set; }
        public string url { get; set; }
        public string status { get; set; }
    }

    public class TwitchStreamPreviewDto
    {
        public string large { get; set; }
    }

    public class TwitchStreamDto
    {
        public TwitchChannelDto channel { get; set; }
        public int viewers { get; set; }
        public TwitchStreamPreviewDto preview { get; set; }
    }

    public class TwitchLiveStreamDto
    {
        public IEnumerable<TwitchStreamDto> streams { get; set; }
    }
}
