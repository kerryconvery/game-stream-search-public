﻿using System;
using System.Threading.Tasks;
using GameStreamSearch.Application.Entities;
using GameStreamSearch.Application.Enums;
using GameStreamSearch.Application.Services;

namespace GameStreamSearch.Application.Commands
{
    public enum RegisterOrUpdateChannelCommandResult
    {
        ChannelNotFoundOnPlatform,
        ChannelAdded,
        ChannelUpdated,
        PlatformServiceIsNotAvailable,
    }

    public class RegisterOrUpdateChannelCommand
    {
        public string ChannelName { get; init; }
        public DateTime RegistrationDate { get; init; }
        public StreamPlatformType StreamPlatform { get; init; }
    }

    public class RegisterOrUpdateChannelCommandHandler : ICommandHandler<RegisterOrUpdateChannelCommand, RegisterOrUpdateChannelCommandResult>
    {
        private readonly IChannelRepository channelRepository;
        private readonly IChannelService channelService;

        public RegisterOrUpdateChannelCommandHandler(IChannelRepository channelRepository, IChannelService channelService)
        {
            this.channelRepository = channelRepository;
            this.channelService = channelService;
        }

        private async Task<RegisterOrUpdateChannelCommandResult> UpsertChannel(Channel channel)
        {
            var existingChannel = await channelRepository.Get(channel.StreamPlatform, channel.ChannelName);

            if (existingChannel.IsSome)
            {
                await channelRepository.Update(channel);

                return RegisterOrUpdateChannelCommandResult.ChannelUpdated;
            }

            await channelRepository.Add(channel);

            return RegisterOrUpdateChannelCommandResult.ChannelAdded;
        }

        public async Task<RegisterOrUpdateChannelCommandResult> Handle(RegisterOrUpdateChannelCommand request)
        {
            var streamChannelResult = await channelService.GetStreamerChannel(request.ChannelName, request.StreamPlatform);

            if (streamChannelResult.IsFailure)
            {
                return RegisterOrUpdateChannelCommandResult.PlatformServiceIsNotAvailable;
            }

            return await streamChannelResult.Value
                .Select(s => s.ToChannel(request.RegistrationDate))
                .Select(c => UpsertChannel(c))
                .GetOrElse(Task.FromResult(RegisterOrUpdateChannelCommandResult.ChannelNotFoundOnPlatform));
        }

    }
}
