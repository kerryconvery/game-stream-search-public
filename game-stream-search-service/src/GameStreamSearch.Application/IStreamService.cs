﻿using System.Collections.Generic;
using System.Threading.Tasks;

namespace GameStreamSearch.Application.Models
{
    public interface IStreamService
    {
        IEnumerable<string> GetSupportingPlatforms(StreamFilterOptions streamFilterOptions);
        Task<IEnumerable<PlatformStreamsDto>> GetStreams(
            IEnumerable<string> streamPlatforms, StreamFilterOptions filterOptions, int pageSize, PageTokens pageTokens);
    };
}