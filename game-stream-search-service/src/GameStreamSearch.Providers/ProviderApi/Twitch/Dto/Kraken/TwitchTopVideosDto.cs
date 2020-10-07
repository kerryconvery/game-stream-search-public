using System;
using System.Collections.Generic;

namespace GameStreamSearch.StreamProviders.ProviderApi.Twitch.Dto.Kraken
{
    public class TwitchTopVideoChannelDto
    {
        public string display_name { get; set; }
    }

    public class TwitchTopVideoPreviewDto
    {
        public string large { get; set; }
        public string medium { get; set; }
    }

    public class TwitchTopVideoDto
    {
        public TwitchTopVideoChannelDto channel { get; set; }
        public string game { get; set; }
        public string title { get; set; }
        public TwitchTopVideoPreviewDto preview { get; set;}
        public string url { get; set; }
        public int views { get; set; }
    }

    public class TwitchTopVideosDto
    {
        public IEnumerable<TwitchTopVideoDto> vods { get; set; }
    }
}
