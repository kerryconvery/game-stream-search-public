﻿using System;
using Amazon.DynamoDBv2.DataModel;
using GameStreamSearch.Application.Entities;
using GameStreamSearch.Application.Enums;

namespace GameStreamSearch.Repositories.AwsDynamoDbRepositories.Dto
{
    [DynamoDBTable("Channels")]
    public class DynamoDbChannelDto
    {
        [DynamoDBHashKey]
        public StreamPlatformType StreamPlatform { get; init; }

        [DynamoDBRangeKey]
        public string ChannelName { get; init; }

        [DynamoDBProperty]
        public DateTime DateRegistered { get; init; }

        [DynamoDBProperty]
        public string AvatarUrl { get; init; }

        [DynamoDBProperty]
        public string ChannelUrl { get; init; }

        public static DynamoDbChannelDto FromEntity(Channel channel)
        {
            return new DynamoDbChannelDto
            {
                ChannelName = channel.ChannelName,
                StreamPlatform = channel.StreamPlatform,
                DateRegistered = channel.DateRegistered,
                AvatarUrl = channel.AvatarUrl,
                ChannelUrl = channel.ChannelUrl,
            };
        }

        public Channel ToEntity()
        {
            return new Channel(ChannelName, StreamPlatform, DateRegistered, AvatarUrl, ChannelUrl);
        }
    }
}
