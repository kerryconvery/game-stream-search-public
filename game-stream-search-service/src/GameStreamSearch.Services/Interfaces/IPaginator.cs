using System;
using System.Collections.Generic;
using GameStreamSearch.Services.Dto;

namespace GameStreamSearch.Services.Interfaces
{
    public interface IPaginator
    {
        string encode(Dictionary<string, string> paginations);
        Dictionary<string, string> decode(string encodedPaginations);
        string getToken(Dictionary<string, string> paginations, string pageKey);
    }
}
