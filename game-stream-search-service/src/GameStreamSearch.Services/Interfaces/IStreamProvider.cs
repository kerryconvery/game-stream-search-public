using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.Services.Dto;

namespace GameStreamSearch.Services.Interfaces
{
    public interface IStreamProvider
    {
        Task<GameStreamsDto> GetLiveStreams(StreamFilterOptionsDto filterOptions, int pageSize, string pageToken = null);
        Task<GameStreamsDto> GetOnDemandStreamsByGameName(string gameName);
        Task<IEnumerable<GameStreamDto>> GetTopLiveStreams();

        string ProviderName { get; }
    }
}
