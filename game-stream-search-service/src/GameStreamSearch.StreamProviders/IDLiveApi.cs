﻿using System.Threading.Tasks;
using GameStreamSearch.StreamProviders.Dto.DLive;
using GameStreamSearch.Types;

namespace GameStreamSearch.StreamProviders
{
    public enum StreamSortOrder
    {
        New,
        Trending
    };

    public enum DLiveErrorType
    {
        None,
        ProviderNotAvailable,
    }

    public static class DLiveTypeExtension
    {
        public static string GetAsString(this StreamSortOrder streamSortType)
        {
            return streamSortType.ToString().ToUpper();
        }
    }

    public interface IDLiveApi
    {
        Task<MaybeResult<DLiveStreamDto, DLiveErrorType>> GetLiveStreams(int pageSize, int pageOffset, StreamSortOrder sortOrder);
        Task<MaybeResult<DLiveUserDto, DLiveErrorType>> GetUserByDisplayName(string displayName);
    }
}
