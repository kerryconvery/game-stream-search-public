using System;
using System.Collections.Generic;

namespace GameStreamSearch.StreamProviders.ProviderApi.Smashcast.Dto
{
    public class SmashcastCategory
    {
        public string category_name { get; set; }
        public string categpry_viewers { get; set; }
        public string category_logo_large { get; set; }
    }

    public class SmashcastGameDto
    {
        public IEnumerable<SmashcastCategory> categories { get; set; }
    }
}
