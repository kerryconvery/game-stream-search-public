using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using GameStreamSearch.Services.Dto;
using GameStreamSearch.Services.Interfaces;
using GameStreamSearch.StreamProviders.ProviderApi.YouTube;
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
            IEnumerable<YouTubeVideoSearchItemDto> streams,
            Dictionary<string, YouTubeChannelSnippetDto> channelSnippets,
            IEnumerable<YouTubeLiveStreamDetailsItemDto> liveStreamDetails)
        {
            var gameStreams = streams.Select(v => {
                var streamDetails = liveStreamDetails.FirstOrDefault(s => s.id == v.id.videoId)?.liveStreamingDetails;
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

        private IEnumerable<GameStreamDto> mapAsOnDemandStream(IEnumerable<YouTubeVideoSearchItemDto> streams, IEnumerable<YouTubeVideoStatisticsItemDto> videoStatistics)
        {
            var gameStreams = streams.Select(v => {
                var statistics = videoStatistics.FirstOrDefault(s => s.id == v.id.videoId)?.statistics;

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

        private async Task<IEnumerable<YouTubeLiveStreamDetailsItemDto>> GetLiveStreamDetails(
            IEnumerable<YouTubeVideoSearchItemDto> streams)
        {
            var videoIds = new List<string>();

            videoIds.AddRange(streams.Select(v => v.id.videoId));

            var statistics = await youTubeV3Api.GetLiveStreamDetails(videoIds);

            return statistics.items;
        }

        private async Task<Dictionary<string, YouTubeChannelSnippetDto>> GetChannelSnippets(
            IEnumerable<YouTubeVideoSearchItemDto> streams)
        {
            var channelIds = new List<string>();

            channelIds.AddRange(streams.Select(v => v.snippet.channelId));

            var channels = await youTubeV3Api.GetChannels(channelIds);

            return channels.items.ToDictionary(c => c.id, c => c.snippet);
        }

        private async Task<IEnumerable<YouTubeVideoStatisticsItemDto>> GetVideoStatistics(
            IEnumerable<YouTubeVideoSearchItemDto> streams)
        {
            var videoIds = new List<string>();

            videoIds.AddRange(streams.Select(v => v.id.videoId));

            var statistics = await youTubeV3Api.GetVideoStatistics(videoIds);

            return statistics.items;
        }

        public async Task<GameStreamsDto> GetLiveStreams(StreamFilterOptionsDto filterOptions, int pageSize, string pageToken = null)
        {
            var liveVideos = await youTubeV3Api.SearchVideos(filterOptions.GameName, VideoEventType.Live, pageToken);

            if (liveVideos.items == null || liveVideos.items.Count() == 0)
            {
                return GameStreamsDto.Empty();
            }

            var statisticsTask = GetLiveStreamDetails(liveVideos.items);
            var channelSnippetsTask = GetChannelSnippets(liveVideos.items);

            var statistics = await statisticsTask;
            var channelSnippets = await channelSnippetsTask;

            return new GameStreamsDto
            {
                Items = mapAsLiveStream(liveVideos.items, channelSnippets, statistics),
                NextPageToken = liveVideos.nextPageToken,
            };
        }

        public async Task<GameStreamsDto> GetOnDemandStreamsByGameName(string gameName)
        {
            var completedVideos = await youTubeV3Api.SearchVideos(gameName, VideoEventType.Completed, null);

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
