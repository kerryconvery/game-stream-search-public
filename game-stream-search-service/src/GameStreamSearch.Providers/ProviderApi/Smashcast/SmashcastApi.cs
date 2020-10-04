using System;
using System.Threading.Tasks;
using GameStreamSearch.StreamProviders.ProviderApi.Smashcast.Dto;
using GameStreamSearch.StreamProviders.ProviderApi.Smashcast.Interfaces;
using RestSharp;

namespace GameStreamSearch.StreamProviders.ProviderApi.Smashcast
{
    public class SmashcastApi : ISmashcastApi
    {
        private readonly string smashcastApiUrl;

        public SmashcastApi(string smashcastApiUrl)
        {
            this.smashcastApiUrl = smashcastApiUrl;
        }

        public async Task<SmashcastGameDto> GetGameList(string query)
        {
            var client = new RestClient(this.smashcastApiUrl);

            var request = new RestRequest("/games", Method.GET);

            request.AddParameter("q", query);

            var response = await client.ExecuteAsync<SmashcastGameDto>(request);

            return response.Data;
        }
    }
}
