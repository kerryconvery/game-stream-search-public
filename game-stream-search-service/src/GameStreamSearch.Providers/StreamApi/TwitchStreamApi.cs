using System;
using System.Threading.Tasks;
using GameStreamSearch.StreamProviders.Dto;
using GameStreamSearch.StreamProviders.StreamApi.Interfaces;
using RestSharp;

namespace GameStreamSearch.StreamProviders.StreamApi
{
    public class TwitchStreamApi : ITwitchStreamApi
    {
        private readonly string twitchApiUrl;
        private readonly string twitchClientId;
        private readonly string twitchClientSecret;

        public TwitchStreamApi(string twitchApiUrl, string twitchClientId, string twitchClientSecret)
        {
            this.twitchApiUrl = twitchApiUrl;
            this.twitchClientId = twitchClientId;
            this.twitchClientSecret = twitchClientSecret;
        }

        public async Task<TwitchCategoriesDto> SearchCategories(string categoryName)
        {
            var client = new RestClient(this.twitchApiUrl);

            var request = new RestRequest(string.Format("search/categories?queries={0}", categoryName), DataFormat.Json);

            return await client.GetAsync<TwitchCategoriesDto>(request);
        }
    }
}
