using System.Threading.Tasks;
using GameStreamSearch.Services.Dto;
using GameStreamSearch.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GameStreamSearch.UseCases
{
    [ApiController]
    [Route("api")]
    public class StreamUseCases : ControllerBase
    {
        private readonly IStreamService streamService;

        public StreamUseCases(IStreamService streamService)
        {
            this.streamService = streamService;
        }

        [HttpGet]
        [Route("streams")]
        public async Task<IActionResult> GetStreams(
            [FromQuery(Name = "game")] string gameName,
            [FromQuery(Name = "pageToken")] string pageToken,
            [FromQuery(Name = "pageSize")] int pageSize = 25)
        {
            var filterOptions = new StreamFilterOptionsDto
            {
                GameName = gameName
            };

            var streams = await streamService.GetStreams(filterOptions, pageSize, pageToken);

            return Ok(streams);
        }
    }
}
