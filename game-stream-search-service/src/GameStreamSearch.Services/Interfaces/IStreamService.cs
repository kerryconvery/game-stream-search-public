using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.Services.Dto;

namespace GameStreamSearch.Services.Interfaces
{
    public interface IStreamService
    {
        Task<GameStreamsDto> GetStreams(StreamFilterOptionsDto filterOptions, int pageSize, string pagination);
    }
}
