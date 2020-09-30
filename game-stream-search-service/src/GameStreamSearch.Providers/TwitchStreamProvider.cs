using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.Services.Dto;
using GameStreamSearch.Services.Interfaces;
using GameStreamSearch.StreamProviders.StreamApi.Interfaces;

namespace GameStreamSearch.Providers
{
    public class TwitchStreamProvider : IStreamProvider
    {
        private readonly ITwitchStreamApi twitchStreamApi;

        public TwitchStreamProvider(ITwitchStreamApi twitchStreamApi)
        {
            this.twitchStreamApi = twitchStreamApi;
        }

        public async Task<IEnumerable<GameStreamDto>> GetStreams(string gameName)
        {
            var categories = await twitchStreamApi.SearchCategories(gameName);

            return categories.data.Select(c => new GameStreamDto {
                GameName = c.name,
                ThumbnailUrl = c.box_art_url,
            }).ToList();
        }
    }
}
