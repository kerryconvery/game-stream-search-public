using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.StreamProviders.ProviderApi.Twitch.Dto.Helix;

namespace GameStreamSearch.StreamProviders.ProviderApi.Twitch.Interfaces
{
    public interface ITwitchHelixApi
    {
        Task<TwitchCategoriesDto> SearchCategories(string categoryName);
        Task<TwitchStreamDto> GetStreamsByGameId(IEnumerable<string> gameIds);
    }
}
