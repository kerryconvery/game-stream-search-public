using System;
using System.Threading.Tasks;
using GameStreamSearch.StreamProviders.ProviderApi.Twitch.Dto.Kraken;
using GameStreamSearch.StreamProviders.Twitch.Dto;
using GameStreamSearch.StreamProviders.Twitch.Dto.Kraken;

namespace GameStreamSearch.StreamProviders.ProviderApi.Twitch.Interfaces
{
    public interface ITwitchKrakenApi
    {
        Task<TwitchStreamSearchDto> SearchStreams(string searchTerm);
        Task<TwitchTopVideosDto> GetTopGameVideos(string gameName);
    }
}
