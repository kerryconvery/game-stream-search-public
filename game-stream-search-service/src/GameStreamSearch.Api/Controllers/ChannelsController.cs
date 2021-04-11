using System;
using System.Threading.Tasks;
using GameStreamSearch.Api.Contracts;
using GameStreamSearch.Application;
using GameStreamSearch.Application.GetAllChannels;
using GameStreamSearch.Application.GetASingleChannel;
using GameStreamSearch.Application.RegisterOrUpdateChannel;
using GameStreamSearch.Types;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GameStreamSearch.Api.Controllers
{
    public class GetChannelParams
    {
        public string ChannelName { get; init; }
        public string PlatformName { get; init; }
    }

    [ApiController]
    [Route("api")]
    public class ChannelsController : ControllerBase
    {
        private readonly ICommandHandler<RegisterOrUpdateChannelCommand, RegisterOrUpdateChannelResponse> upsertChannelCommand;
        private readonly IQueryHandler<GetAllChannelsQuery, GetAllChannelsResponse> getAllChannelsQueryHandler;
        private readonly IQueryHandler<GetASingleChannelQuery, GetASingleChannelResponse> getChannelQueryHandler;

        public ChannelsController(
            ICommandHandler<RegisterOrUpdateChannelCommand, RegisterOrUpdateChannelResponse> upsertChannelCommand,
            IQueryHandler<GetAllChannelsQuery, GetAllChannelsResponse> getAllChannelsQueryHandler,
            IQueryHandler<GetASingleChannelQuery, GetASingleChannelResponse> getChannelQueryHandler)
        {
            this.upsertChannelCommand = upsertChannelCommand;
            this.getAllChannelsQueryHandler = getAllChannelsQueryHandler;
            this.getChannelQueryHandler = getChannelQueryHandler;
        }

        [HttpPut]
        [Route("channels/{platformName}/{channelName}")]
        public async Task<IActionResult> RegisterOrUpdateChannel([FromRoute] string platformName, string channelName)
        {
            var command = new RegisterOrUpdateChannelCommand
            {
                ChannelName = channelName,
                StreamPlatformName = platformName,
            };

            var commandResponse = await upsertChannelCommand.Handle(command);

            switch (commandResponse.Result)
            {
                case RegisterOrUpdateChannelResult.ChannelNotFoundOnPlatform:
                    return PresentChannelNotFoundOnPlatform(platformName, channelName);
                case RegisterOrUpdateChannelResult.ChannelAdded:
                    return PresentChannelAdded(platformName, channelName);
                case RegisterOrUpdateChannelResult.ChannelUpdated:
                    return new NoContentResult();
                case RegisterOrUpdateChannelResult.PlatformServiceIsNotAvailable:
                    return PresentPlatformServiceIsUnavilable(platformName);
                default:
                    throw new ArgumentException($"Unsupported channel upsert result {commandResponse.Result}");
            }
        }

        private IActionResult PresentChannelAdded(string platformName, string channelName)
        {
            var urlParams = new GetChannelParams
            {
                ChannelName = channelName,
                PlatformName = platformName,
            };

            return new CreatedResult(Url.Link(nameof(GetChannel), urlParams), null);
        }

        private IActionResult PresentChannelNotFoundOnPlatform(string platformName, string channelName)
        {
            var errorResponse = new ErrorResponseContract()
                .AddError(new ErrorContract
                {
                    ErrorCode = ErrorCodeType.ChannelNotFoundOnPlatform,
                    ErrorMessage = $"Channel {channelName} not found on {platformName}"
                });

            return new BadRequestObjectResult(errorResponse);
        }

        private IActionResult PresentPlatformServiceIsUnavilable(string platformName)
        {
            var errorResponse = new ErrorResponseContract()
                .AddError(new ErrorContract
                {
                    ErrorCode = ErrorCodeType.PlatformServiceIsNotAvailable,
                    ErrorMessage = $"The platform {platformName} is not available at this time"
                });

            return StatusCode(StatusCodes.Status424FailedDependency, errorResponse);
        }

        [HttpGet]
        [Route("channels")]
        public async Task<IActionResult> GetChannels()
        {
            var response = await getAllChannelsQueryHandler.Execute(new GetAllChannelsQuery());

            return Ok(response);
        }

        [HttpGet]
        [Route("channels/{platformName}/{channelName}", Name = "GetChannel")]
        public async Task<IActionResult> GetChannel([FromRoute] string platformName, string channelName)
        {
            var getChannelQuery = new GetASingleChannelQuery { platformName = platformName, channelName = channelName };

            var getChannelResponse = await getChannelQueryHandler.Execute(getChannelQuery);

            return getChannelResponse.channel
                .Select<IActionResult>(v => new OkObjectResult(v))
                .GetOrElse(new NotFoundResult());
        }
    }
}
