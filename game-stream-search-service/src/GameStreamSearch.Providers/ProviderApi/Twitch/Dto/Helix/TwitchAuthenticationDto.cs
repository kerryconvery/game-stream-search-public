using System;
namespace GameStreamSearch.StreamProviders.Twitch.Dto.Helix
{
    public class TwitchAuthenticationDto
    {
        public string access_token { get; set; }
        public string refresh_token { get; set; }
        public int expires_in { get; set; }
        public string[] scope { get; set; }
        public string token_type { get; set; }
    }
}
