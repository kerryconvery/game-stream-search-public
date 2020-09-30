using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.Services.Dto;

namespace GameStreamSearch.Services.Interfaces
{
    public interface IStreamProvider
    {
        Task<IEnumerable<GameStreamDto>> GetStreams(string gameName);
    }
}
