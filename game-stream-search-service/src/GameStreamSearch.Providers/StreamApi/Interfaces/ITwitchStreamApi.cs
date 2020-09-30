using System;
using System.Threading.Tasks;
using GameStreamSearch.StreamProviders.Dto;

namespace GameStreamSearch.StreamProviders.StreamApi.Interfaces
{
    public interface ITwitchStreamApi
    {
        Task<TwitchCategoriesDto> SearchCategories(string categoryName);
    }
}
