﻿using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.StreamProviders.Dto.Twitch.Kraken;
using GameStreamSearch.Types;

namespace GameStreamSearch.StreamProviders
{
    public enum TwitchErrorType
    {
        None,
        ProviderNotAvailable,
    }

    public interface ITwitchKrakenGateway
    {
        Task<MaybeResult<IEnumerable<TwitchStreamDto>, TwitchErrorType>> SearchStreams(string searchTerm, int pageSize, int pageOffset);
        Task<MaybeResult<IEnumerable<TwitchStreamDto>, TwitchErrorType>> GetLiveStreams(int pageSize, int pageOffset);
        Task<MaybeResult<TwitchChannelsDto, TwitchErrorType>> SearchChannels(string searchTerm, int pageSize, int pageOffset);
    }
}
