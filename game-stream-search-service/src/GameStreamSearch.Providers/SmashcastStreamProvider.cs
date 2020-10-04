using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.Services.Dto;
using GameStreamSearch.Services.Interfaces;
using GameStreamSearch.StreamProviders.ProviderApi.Smashcast.Interfaces;

namespace GameStreamSearch.StreamProviders.ProviderApi
{
    public class SmashcastStreamProvider : IStreamProvider
    {
        private readonly ISmashcastApi smashcastApi;

        public SmashcastStreamProvider(ISmashcastApi smashcastApi)
        {
            this.smashcastApi = smashcastApi;
        }

        public async Task<IEnumerable<GameStreamDto>> GetStreams(string gameName)
        {
            var gameList = await smashcastApi.GetGameList(gameName);

            var gameStreams = gameList.categories.Select(c => new GameStreamDto
            {
                GameName = c.category_name,
                ImageUrl = c.category_logo_large,
                PlatformName = "Smashcast",
                IsLive = false,
                StreamUrl = "",
            });

            return gameStreams;
        }
    }
}
