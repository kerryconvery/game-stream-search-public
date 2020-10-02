using System;
using System.Collections.Generic;

namespace GameStreamSearch.StreamProviders.ProviderApi.Twitch.Dto.Kraken
{

    public class TwitchVideoPreviewDto
    {
        public string large { get; set; }
        public string medium { get; set; }
    }

    public class TwitchVideoDto
    {
        public string game { get; set; }
        public string title { get; set; }
        public TwitchVideoPreviewDto preview { get; set;}
        public string url { get; set; }
        public int views { get; set; }
    }

    public class TwitchTopVideosDto
    {
        public IEnumerable<TwitchVideoDto> vods { get; set; }
    }
}
