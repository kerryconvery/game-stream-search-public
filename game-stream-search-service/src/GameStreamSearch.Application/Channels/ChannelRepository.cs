using System.Threading.Tasks;
using GameStreamSearch.DataAccess;
using GameStreamSearch.DataAccess.Dto;
using GameStreamSearch.Types;

namespace GameStreamSearch.Domain.Channel
{
    public class ChannelRepository
    {
        private readonly AwsDynamoDbTable<DynamoDbChannelTable> awsDynamoDbTable;

        public ChannelRepository(AwsDynamoDbTable<DynamoDbChannelTable> awsDynamoDbTable)
        {
            this.awsDynamoDbTable = awsDynamoDbTable;
        }

        public Task Add(Channel channel)
        {
            DynamoDbChannelTable channelDto = FromChannel(channel);

            return awsDynamoDbTable.PutItem(channelDto);
        }

        public async Task<Maybe<Channel>> Get(string streamPlatformName, string channelName)
        {
            var dynamoChannelDto = await awsDynamoDbTable.GetItem(streamPlatformName, channelName);

            return dynamoChannelDto.Select(c => new Channel(c.ChannelName, c.StreamPlatformName, c.DateRegistered, c.AvatarUrl, c.ChannelUrl));
        }

        public Task Update(Channel channel)
        {
            DynamoDbChannelTable channelDto = FromChannel(channel);

            return awsDynamoDbTable.PutItem(channelDto);
        }

        private DynamoDbChannelTable FromChannel(Channel channel)
        {
            return new DynamoDbChannelTable
            {
                ChannelName = channel.ChannelName,
                StreamPlatformName = channel.StreamPlatformName,
                ChannelUrl = channel.ChannelUrl,
                AvatarUrl = channel.AvatarUrl,
                DateRegistered = channel.DateRegistered,
            };
        }
    }
}
