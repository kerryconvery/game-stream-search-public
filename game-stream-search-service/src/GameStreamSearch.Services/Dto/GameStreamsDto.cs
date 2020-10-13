using System;
using System.Collections.Generic;

namespace GameStreamSearch.Services.Dto
{
    public class GameStreamDto
    {
        public string StreamTitle { get; set; }
        public string StreamThumbnailUrl { get; set; }
        public string StreamUrl { get; set; }
        public string Streamer { get; set; }
        public string ChannelThumbnailUrl { get; set; }
        public string PlatformName { get; set; }
        public bool IsLive { get; set; }
        public int Views { get; set; }
    }

    public class GameStreamsDto
    {
        public IEnumerable<GameStreamDto> Items { get; set; }
        public string NextPageToken { get; set; }

        public static GameStreamsDto Empty()
        {
            return new GameStreamsDto
            {
                Items = new List<GameStreamDto>(),
                NextPageToken = null,
            };
        }

    }
}
