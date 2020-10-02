using System.Threading.Tasks;
using GameStreamSearch.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GameStreamSearch.UseCases
{
    [ApiController]
    [Route("api")]
    public class StreamUseCases : ControllerBase
    {
        private readonly IStreamCollectorService streamCollectorService;

        public StreamUseCases(IStreamCollectorService streamCollectorService)
        {
            this.streamCollectorService = streamCollectorService;
        }

        [HttpGet]
        [Route("streams")]
        public async Task<IActionResult> GetStreams([FromQuery(Name = "game")] string game)
        {
            var streams = await streamCollectorService.CollectStreams(game);

            return Ok(streams);
        }
    }
}
