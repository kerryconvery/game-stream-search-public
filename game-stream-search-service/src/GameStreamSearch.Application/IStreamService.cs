using System.Threading.Tasks;
using GameStreamSearch.Application.Dto;

namespace GameStreamSearch.Application.Services
{
    public interface IStreamService
    {
        Task<GameStreamsDto> GetStreams(StreamFilterOptions filterOptions, int pageSize, string pageToken);
    };
}