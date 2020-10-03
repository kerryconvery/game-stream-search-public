using System;
using System.Threading.Tasks;
using GameStreamSearch.StreamProviders.ProviderApi.YouTube.Dto.YouTubeV3;
using GameStreamSearch.StreamProviders.ProviderApi.YouTube.Interfaces;
using RestSharp;

namespace GameStreamSearch.StreamProviders.ProviderApi.YouTube
{
    public enum VideoEventType
    {
        Completed,
        Live,
        Upcoming
    }

    public class YouTubeV3Api : IYouTubeV3Api
    {
        private readonly string googleApiUrl;
        private readonly string googleApiKey;

        public YouTubeV3Api(string googleApiUrl, string googleApiKey)
        {
            this.googleApiUrl = googleApiUrl;
            this.googleApiKey = googleApiKey;
        }

        public async Task<YouTubeVideoSearchDto> SearchVideos(string query, VideoEventType eventType)
        {
            var client = new RestClient(this.googleApiUrl);

            var request = new RestRequest("/youtube/v3/search");

            request.Method = Method.GET;
            request.AddParameter("part", "snippet");
            request.AddParameter("eventType", eventType.ToString().ToLower());
            request.AddParameter("q", query);
            request.AddParameter("type", "video");
            request.AddParameter("videoCategoryId", 20);
            request.AddParameter("key", googleApiKey);


            request.AddHeader("Accept", "application/json");

            var response = await client.ExecuteAsync<YouTubeVideoSearchDto>(request);

            return response.Data;
        }
    }
}
