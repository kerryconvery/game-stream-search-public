using System;
using System.Collections.Generic;

namespace GameStreamSearch.StreamProviders.ProviderApi.Twitch.Dto.Helix
{
    public class TwitchCategoryDto
    {
        public string id { get; set; }
        public string name { get; set; }
        public string box_art_url { get; set; }
    }

    public class TwitchCategoriesDto
    {
        public IEnumerable<TwitchCategoryDto> data { get; set; }
        public TwitchPaginationDto pagination { get; set; }
    }
}
