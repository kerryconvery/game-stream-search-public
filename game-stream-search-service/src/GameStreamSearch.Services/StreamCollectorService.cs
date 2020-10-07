using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.Services.Dto;
using GameStreamSearch.Services.Interfaces;

namespace GameStreamSearch.Services
{
    public class StreamCollectorService : IStreamCollectorService
    {
        private readonly IPaginator paginator;
        private List<IStreamProvider> streamProviders;

        public StreamCollectorService(IPaginator paginator)
        {
            streamProviders = new List<IStreamProvider>();
            this.paginator = paginator;
        }

        private string AggregateNextPageTokens(GameStreamsDto[] gameStreams)
        {
            var paginations = new Dictionary<string, string>();

            for (int index = 0; index < gameStreams.Length; index++)
            {
                if (gameStreams[index].NextPageToken != null)
                {
                    paginations.Add(streamProviders[index].ProviderName, gameStreams[index].NextPageToken);
                }
            }

            return paginator.encode(paginations);
        }

        public async Task<GameStreamsDto> CollectLiveStreams(string gameName, string pagination)
        {
            var paginationTokens = paginator.decode(pagination);

            var tasks = streamProviders.Select(p => {
                return p.GetLiveStreamsByGameName(gameName, 25, paginator.getToken(paginationTokens, p.ProviderName));
            });

            var results = await Task.WhenAll(tasks);

            var nextPageToken = AggregateNextPageTokens(results);

            return new GameStreamsDto()
            {
                Items = results.SelectMany(s => s.Items),
                NextPageToken = nextPageToken
            };

        }

        public StreamCollectorService RegisterStreamProvider(IStreamProvider streamProvider)
        {
            streamProviders.Add(streamProvider);

            return this;
        }
    }
}
