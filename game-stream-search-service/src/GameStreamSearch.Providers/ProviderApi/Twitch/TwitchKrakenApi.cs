﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.StreamProviders.ProviderApi.Twitch.Dto.Kraken;
using GameStreamSearch.StreamProviders.ProviderApi.Twitch.Interfaces;
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

        public async Task<TwitchLiveStreamDto> GetLiveStreams(int pageSize, int pageOffset)
        {
            var client = new RestClient(this.twitchApiUrl);

            var request = new RestRequest("/kraken/streams", Method.GET);

            request.AddHeader("Accept", "application/vnd.twitchtv.v5+json");
            request.AddHeader("Client-ID", twitchClientId);

            request.AddParameter("limit", pageSize);
            request.AddParameter("offset", pageOffset);

            var response = await client.ExecuteAsync<TwitchLiveStreamDto>(request);

            return response.Data;
        }

        public async Task<TwitchTopVideosDto> GetTopVideos(string gameName)
        {
            var client = new RestClient(this.twitchApiUrl);

            var request = new RestRequest("/kraken/videos/top", Method.GET);

            request.AddHeader("Accept", "application/vnd.twitchtv.v5+json");
            request.AddHeader("Client-ID", twitchClientId);

            request.AddParameter("game", gameName);

            var response = await client.ExecuteAsync<TwitchTopVideosDto>(request);

            return response.Data;
        }

        public async Task<TwitchLiveStreamDto> SearchStreams(string searchTerm, int pageSize, int pageOffset)
        {
            var client = new RestClient(this.twitchApiUrl);

            var request = new RestRequest("/kraken/search/streams", Method.GET);

            request.AddHeader("Accept", "application/vnd.twitchtv.v5+json");
            request.AddHeader("Client-ID", twitchClientId);

            request.AddParameter("query", searchTerm);
            request.AddParameter("limit", pageSize);
            request.AddParameter("offset", pageOffset);

            var response = await client.ExecuteAsync<TwitchLiveStreamDto>(request);

            return response.Data;
        }
    }
}
