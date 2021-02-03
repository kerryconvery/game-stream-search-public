using System;
using System.Threading.Tasks;
using GameStreamSearch.Application.Entities;
using GameStreamSearch.Application.Enums;
using GameStreamSearch.Application.Services;
using GameStreamSearch.Types;

namespace GameStreamSearch.Application.Commands
{
    public enum UpsertChannelResult
    {
        ChannelNotFoundOnPlatform,
        ChannelAdded,
        ChannelUpdated,
        PlatformServiceIsNotAvailable,
    }

    public class UpsertChannelRequest
    {
        public string ChannelName { get; set; }
        public DateTime RegistrationDate { get; set; }
        public StreamPlatformType StreamPlatform { get; set; }
    }

    public class UpsertChannelCommand
    {
        private readonly IChannelRepository channelRepository;
        private readonly IChannelService channelService;

        public UpsertChannelCommand(IChannelRepository channelRepository, IChannelService channelService)
        {
            this.channelRepository = channelRepository;
            this.channelService = channelService;
        }

        private async Task<UpsertChannelResult> UpsertChannel(Channel channel)
        {
            var existingChannel = await channelRepository.Get(channel.StreamPlatform, channel.ChannelName);

            if (existingChannel.IsSome)
            {
                await channelRepository.Update(channel);

                return UpsertChannelResult.ChannelUpdated;
            }

            await channelRepository.Add(channel);

            return UpsertChannelResult.ChannelAdded;
        }

        public async Task<UpsertChannelResult> Invoke(UpsertChannelRequest request)
        {
            var streamChannelResult = await channelService.GetStreamerChannel(request.ChannelName, request.StreamPlatform);

            if (streamChannelResult.IsFailure)
            {
                return UpsertChannelResult.PlatformServiceIsNotAvailable;
            }

            return await streamChannelResult.Value
                .Select(s => s.ToChannel(request.RegistrationDate))
                .Select(c => UpsertChannel(c))
                .GetOrElse(Task.FromResult(UpsertChannelResult.ChannelNotFoundOnPlatform));
        }

    }
}
