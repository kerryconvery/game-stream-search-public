﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.Application.Models;
using GameStreamSearch.Types;

namespace GameStreamSearch.Application
{
    public enum StreamProviderError
    {
        None,
        ProviderNotAvailable,
    }

    public interface IStreamProvider
    {
        Task<PlatformStreamsDto> GetLiveStreams(StreamFilterOptions filterOptions, int pageSize, PageToken pageToken);
        Task<MaybeResult<PlatformChannelDto, StreamProviderError>> GetStreamerChannel(string channelName);
        bool AreFilterOptionsSupported(StreamFilterOptions filterOptions) => true;

        StreamPlatform StreamPlatform { get; }
    }
}
