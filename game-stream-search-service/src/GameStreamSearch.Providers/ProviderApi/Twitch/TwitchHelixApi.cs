using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.StreamProviders.ProviderApi.Twitch.Dto.Helix;
using GameStreamSearch.StreamProviders.ProviderApi.Twitch.Interfaces;
using RestSharp;
using RestSharp.Authenticators;

namespace GameStreamSearch.StreamProviders.ProviderApi.Twitch
{
    public class TwitchHelixApi : ITwitchHelixApi
    {
        private readonly string twitchApiUrl;
        private readonly string twitchClientId;
        private readonly string twitchClientSecret;
        private readonly string twitchAuthUrl;

        public TwitchHelixApi(string twitchApiUrl, string twitchAuthUrl, string twitchClientId, string twitchClientSecret)
        {
            this.twitchApiUrl = twitchApiUrl;
            this.twitchAuthUrl = twitchAuthUrl;
            this.twitchClientId = twitchClientId;
            this.twitchClientSecret = twitchClientSecret;
        }

        private async Task<string> GetAccessToken()
        {
            var client = new RestClient(this.twitchAuthUrl);
            var request = new RestRequest();

            request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
            request.AddHeader("Accept", "application/json");

            request.AddParameter("client_id", twitchClientId);
            request.AddParameter("client_secret", twitchClientSecret);
            request.AddParameter("grant_type", "client_credentials");

            client.Authenticator = new HttpBasicAuthenticator(twitchClientId, twitchClientSecret);

            var authResponse = await client.PostAsync<TwitchAuthenticationDto>(request);

            return authResponse.access_token;
        }

        public async Task<TwitchCategoriesDto> SearchCategories(string categoryName)
        {
            var accessToken = await GetAccessToken();

            var client = new RestClient(this.twitchApiUrl);

            var request = new RestRequest(string.Format("/helix/search/categories?query={0}", categoryName), Method.GET);

            request.AddHeader("Authorization", string.Format("Bearer {0}", accessToken));
            request.AddHeader("client-id", twitchClientId);

            var response = await client.ExecuteAsync<TwitchCategoriesDto>(request);

            return response.Data;
        }

        Task<TwitchCategoriesDto> ITwitchHelixApi.SearchCategories(string categoryName)
        {
            throw new NotImplementedException();
        }

        public Task<TwitchStreamDto> GetStreamsByGameId(IEnumerable<string> gameIds)
        {
            throw new NotImplementedException();
        }
    }
}
