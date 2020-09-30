using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.Services.Dto;
using GameStreamSearch.Services.Interfaces;

namespace GameStreamSearch.Services
{
    public class StreamCollectorService : IStreamCollectorService
    {
        private List<IStreamProvider> streamProviders;

        public StreamCollectorService()
        {
            streamProviders = new List<IStreamProvider>();
        }

        public async Task<IEnumerable<GameStreamDto>> CollectStreams(string gameName)
        {
            var gameStreams = new List<GameStreamDto>();

            foreach(var streamProvider in streamProviders)
            {
                var providerStreams = await streamProvider.GetStreams(gameName);

                gameStreams.AddRange(providerStreams);
            }

            return gameStreams;
        }

        public StreamCollectorService RegisterStreamProvider(IStreamProvider streamProvider)
        {
            streamProviders.Add(streamProvider);

            return this;
        }
    }
}
