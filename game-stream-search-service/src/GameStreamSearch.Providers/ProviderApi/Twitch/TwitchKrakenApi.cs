using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.StreamProviders.ProviderApi.Twitch.Dto.Kraken;
using GameStreamSearch.StreamProviders.ProviderApi.Twitch.Interfaces;
using GameStreamSearch.StreamProviders.Twitch.Dto.Kraken;
using RestSharp;

namespace GameStreamSearch.StreamProviders.ProviderApi.Twitch
{
    public class TwitchKrakenApi : ITwitchKrakenApi
    {
        private readonly string twitchApiUrl;
        private readonly string twitchClientId;

        public TwitchKrakenApi(string twitchApiUrl, string twitchClientId)
        {
            this.twitchApiUrl = twitchApiUrl;
            this.twitchClientId = twitchClientId;
        }

        public async Task<IEnumerable<TwitchLiveStreamDto>> GetLiveStreamsByChannel(IEnumerable<string> channelIds)
        {
            var client = new RestClient(this.twitchApiUrl);

            var request = new RestRequest("/kraken/streams", Method.GET);

            request.AddHeader("Accept", "application/vnd.twitchtv.v5+json");
            request.AddHeader("Client-ID", twitchClientId);

            request.AddParameter("channel", string.Join(",", channelIds));

            var response = await client.ExecuteAsync<IEnumerable<TwitchLiveStreamDto>>(request);

            return response.Data;
        }

        public async Task<TwitchTopVideosDto> GetTopGameVideos(string gameName)
        {
            var client = new RestClient(this.twitchApiUrl);

            var request = new RestRequest("/kraken/videos/top", Method.GET);

            request.AddHeader("Accept", "application/vnd.twitchtv.v5+json");
            request.AddHeader("Client-ID", twitchClientId);

            request.AddParameter("game", gameName);

            var response = await client.ExecuteAsync<TwitchTopVideosDto>(request);

            return response.Data;
        }

        public async Task<TwitchStreamSearchDto> SearchStreams(string searchTerm)
        {
            var client = new RestClient(this.twitchApiUrl);

            var request = new RestRequest(string.Format("/kraken/search/streams?query={0}", searchTerm), Method.GET);

            request.AddHeader("Accept", "application/vnd.twitchtv.v5+json");
            request.AddHeader("Client-ID", twitchClientId);

            var response = await client.ExecuteAsync<TwitchStreamSearchDto>(request);

            return response.Data;
        }
    }
}
