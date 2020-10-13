using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.StreamProviders.ProviderApi.YouTube.Dto.YouTubeV3;

namespace GameStreamSearch.StreamProviders.ProviderApi.YouTube.Interfaces
{
    public interface IYouTubeV3Api
    {
        Task<YouTubeVideoSearchDto> SearchVideos(string query, VideoEventType eventType, string pageToken);
        Task<YouTubeVideoStatisticsPartDto> GetVideoStatistics(IEnumerable<string> videoIds);
        Task<YouTubeLiveStreamDetailsDto> GetLiveStreamDetails(IEnumerable<string> videoIds);
        Task<YouTubeChannelsDto> GetChannels(IEnumerable<string> channelIds);
    }
}
