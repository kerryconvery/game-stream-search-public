using System;
using System.Threading.Tasks;
using GameStreamSearch.StreamProviders.ProviderApi.Smashcast.Dto;

namespace GameStreamSearch.StreamProviders.ProviderApi.Smashcast.Interfaces
{
    public interface ISmashcastApi
    {
        Task<SmashcastGameDto> GetGameList(string query);
    }
}
