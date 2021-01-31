﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.Types;
using GameStreamSearch.StreamProviders.Dto.YouTube.YouTubeV3;

namespace GameStreamSearch.StreamProviders
{
    public enum VideoEventType
    {
        Completed,
        Live,
        Upcoming
    }

    public enum VideoSortType
    {
        Date,
        Rating,
        Relevance,
        Title,
        VideoCount,
        ViewCount
    }

    public enum YouTubeErrorType
    {
        None,
        ProviderNotAvailable,
    }

    public static class YouTubeTypeExtensions
    {
        public static string GetAsString(this VideoEventType videoEventType)
        {
            return videoEventType.ToString().ToLower();
        }

        public static string GetAsString(this VideoSortType videoSortType)
        {
            switch(videoSortType)
            {
                case VideoSortType.VideoCount: return "videoCount";
                case VideoSortType.ViewCount: return "viewCount";
                default: return videoSortType.ToString().ToLower();
            }
        }
    }

    public interface IYouTubeV3Gateway
    {
        Task<MaybeResult<YouTubeSearchDto, YouTubeErrorType>> SearchGamingVideos(string query, VideoEventType eventType, VideoSortType order, int pageSize, string pageToken);
        Task<MaybeResult<IEnumerable<YouTubeChannelDto>, YouTubeErrorType>> GetChannels(string[] channelIds);
        Task<MaybeResult<IEnumerable<YouTubeVideoDto>, YouTubeErrorType>> GetVideos(string[] videoIds);
        Task<MaybeResult<IEnumerable<YouTubeChannelDto>, YouTubeErrorType>> SearchChannelsByUsername(string username, int pageSize);
    }
}
