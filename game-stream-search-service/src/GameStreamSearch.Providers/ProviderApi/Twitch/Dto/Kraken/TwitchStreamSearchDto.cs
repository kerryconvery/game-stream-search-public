using System;
using System.Collections.Generic;

namespace GameStreamSearch.StreamProviders.Twitch.Dto.Kraken
{
    public class TwitchChannelDto
    {
        public string _id { get; set; }
        public string display_name { get; set; }
        public string url { get; set; }
        public string status { get; set; }
    }

    public class TwitchStreamPreviewDto
    {
        public string large { get; set; }
        public string medium { get; set; }
    }

    public class TwitchStreamDto
    {
        public string _id { get; set; }
        public TwitchChannelDto channel { get; set; }
        public string game { get; set; }
        public int viewers { get; set; }
        public TwitchStreamPreviewDto preview { get; set; }
    }

    public class TwitchStreamSearchDto
    {
        public IEnumerable<TwitchStreamDto> streams { get; set; }
    }
}
