using System;
namespace GameStreamSearch.StreamProviders.ProviderApi.Twitch.Dto.Kraken
{
    public class TwitchLiveStreamChannelDto
    {
        public string _id { get; set; }
        public string broadcaster_language { get; set; }
        public string display_name { get; set; }
    }

    public class TwitchLiveStreamDto
    {
        public TwitchLiveStreamChannelDto channel { get; set; }
    }
}
