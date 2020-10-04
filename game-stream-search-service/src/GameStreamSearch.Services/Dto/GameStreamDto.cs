using System;
using System.Collections.Generic;

namespace GameStreamSearch.Services.Dto
{
    public class GameStreamDto
    {
        public string Streamer { get; set; }
        public string GameName { get; set; }
        public string ImageUrl { get; set; }
        public string PlatformName { get; set; }
        public string StreamUrl { get; set; }
        public bool IsLive { get; set; }
        public int Views { get; set; }
    }
}
