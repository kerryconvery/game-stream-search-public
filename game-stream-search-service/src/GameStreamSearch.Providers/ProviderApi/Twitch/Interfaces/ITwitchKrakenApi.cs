using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.StreamProviders.ProviderApi.Twitch.Dto.Kraken;
using GameStreamSearch.StreamProviders.Twitch.Dto;
using GameStreamSearch.StreamProviders.Twitch.Dto.Kraken;

namespace GameStreamSearch.StreamProviders.ProviderApi.Twitch.Interfaces
{
    public interface ITwitchKrakenApi
    {
        Task<TwitchStreamSearchDto> SearchStreams(string searchTerm, int pageSize, int pageOffset);
        Task<TwitchTopVideosDto> GetTopVideos(string gameName);
        Task<IEnumerable<TwitchLiveStreamDto>> GetLiveStreamsByChannel(IEnumerable<string> channelIds);
    }
}
