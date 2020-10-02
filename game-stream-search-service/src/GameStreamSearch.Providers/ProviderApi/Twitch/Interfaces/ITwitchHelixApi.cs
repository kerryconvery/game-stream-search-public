using System;
using System.Threading.Tasks;
using GameStreamSearch.StreamProviders.Twitch.Dto.Helix;

namespace GameStreamSearch.StreamProviders.ProviderApi.Twitch.Interfaces
{
    public interface ITwitchHelixApi
    {
        Task<TwitchCategoriesDto> SearchCategories(string categoryName);
    }
}
