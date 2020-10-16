﻿using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.Services.Dto;
using GameStreamSearch.Services.Interfaces;
using GameStreamSearch.StreamProviders.ProviderApi.YouTube.Interfaces;
using GameStreamSearch.StreamProviders.ProviderApi.YouTube.Dto.YouTubeV3;
using GameStreamSearch.StreamProviders.Builders;

namespace GameStreamSearch.StreamProviders
{
    public class YouTubeStreamProvider : IStreamProvider
    {
        private readonly IYouTubeWatchUrlBuilder urlBuilder;
        private readonly IYouTubeV3Api youTubeV3Api;

        public YouTubeStreamProvider(string providerName, IYouTubeWatchUrlBuilder urlBuilder, IYouTubeV3Api youTubeV3Api)
        {
            ProviderName = providerName;
            this.urlBuilder = urlBuilder;
            this.youTubeV3Api = youTubeV3Api;
        }

        private IEnumerable<GameStreamDto> mapAsLiveStream(
            IEnumerable<YouTubeSearchItemDto> streams,
            Dictionary<string, YouTubeChannelSnippetDto> channelSnippets,
            Dictionary<string, YouTubeVideoLiveStreamingDetailsDto> liveStreamDetails)
        {
            var gameStreams = streams.Select(v => {
                var streamDetails = liveStreamDetails.ContainsKey(v.id.videoId) ? liveStreamDetails[v.id.videoId] : null;
                var channelSnippet = channelSnippets.ContainsKey(v.snippet.channelId) ? channelSnippets[v.snippet.channelId] : null;

                return new GameStreamDto
                {
                    Streamer = v.snippet.channelTitle,
                    StreamTitle = v.snippet.title,
                    StreamThumbnailUrl = v.snippet.thumbnails.medium.url,
                    ChannelThumbnailUrl = channelSnippet?.thumbnails.@default.url,
                    PlatformName = ProviderName,
                    StreamUrl = urlBuilder.Build(v.id.videoId),
                    IsLive = true,
                    Views = streamDetails != null ? streamDetails.concurrentViewers : 0,
                };
            });

            return gameStreams;
        }

        private IEnumerable<GameStreamDto> mapAsOnDemandStream(
            IEnumerable<YouTubeSearchItemDto> streams,
            Dictionary<string, YouTubeVideoStatisticsDto> videoStatistics)
        {
            var gameStreams = streams.Select(v => {
                var statistics = videoStatistics.ContainsKey(v.id.videoId) ? videoStatistics[v.id.videoId] : null;

                return new GameStreamDto
                {
                    StreamTitle = v.snippet.title,
                    Streamer = v.snippet.channelTitle,
                    StreamThumbnailUrl = v.snippet.thumbnails.medium.url,
                    PlatformName = ProviderName,
                    StreamUrl = urlBuilder.Build(v.id.videoId),
                    IsLive = false,
                    Views = statistics != null ? statistics.viewCount : 0,
                };
            });

            return gameStreams;
        }

        private async Task<Dictionary<string, YouTubeVideoLiveStreamingDetailsDto>> GetLiveStreamDetails(
            IEnumerable<YouTubeSearchItemDto> streams)
        {
            var videoIds = streams.Select(v => v.id.videoId).ToArray();

            var videos = await youTubeV3Api.GetVideos(videoIds);

            return videos.items.ToDictionary(v => v.id, v => v.liveStreamingDetails);
        }

        private async Task<Dictionary<string, YouTubeChannelSnippetDto>> GetChannelSnippets(
            IEnumerable<YouTubeSearchItemDto> streams)
        {
            var channelIds = streams.Select(v => v.snippet.channelId).ToArray();

            var channels = await youTubeV3Api.GetChannels(channelIds);

            return channels.items.ToDictionary(c => c.id, c => c.snippet);
        }

        private async Task<Dictionary<string, YouTubeVideoStatisticsDto>> GetVideoStatistics(
            IEnumerable<YouTubeSearchItemDto> streams)
        {
            var videoIds = streams.Select(v => v.id.videoId).ToArray();

            var videos = await youTubeV3Api.GetVideos(videoIds);

            return videos.items.ToDictionary(v => v.id, v => v.statistics);
        }

        public async Task<GameStreamsDto> GetLiveStreams(StreamFilterOptionsDto filterOptions, int pageSize, string pageToken = null)
        {
            var liveVideos = await youTubeV3Api.SearchGamingVideos(filterOptions.GameName, VideoEventType.Live, VideoSortType.ViewCount, pageToken);

            if (liveVideos.items == null || liveVideos.items.Count() == 0)
            {
                return GameStreamsDto.Empty();
            }

            var getLiveStreamDetailsTask = GetLiveStreamDetails(liveVideos.items);
            var getChannelSnippetsTask = GetChannelSnippets(liveVideos.items);

            var liveStreamDetails = await getLiveStreamDetailsTask;
            var channelSnippets = await getChannelSnippetsTask;

            return new GameStreamsDto
            {
                Items = mapAsLiveStream(liveVideos.items, channelSnippets, liveStreamDetails),
                NextPageToken = liveVideos.nextPageToken,
            };
        }

        public async Task<GameStreamsDto> GetOnDemandStreamsByGameName(string gameName)
        {
            var completedVideos = await youTubeV3Api.SearchGamingVideos(gameName, VideoEventType.Completed, VideoSortType.ViewCount, null);

            if (completedVideos.items == null)
            {
                return GameStreamsDto.Empty();
            }

            var statistics = await GetVideoStatistics(completedVideos.items);

            return new GameStreamsDto
            {
                Items = mapAsOnDemandStream(completedVideos.items, statistics),
            };
        }

        public Task<IEnumerable<GameStreamDto>> GetTopLiveStreams()
        {
            return null;
        }

        public string ProviderName { get; private set;  }
    }
}
