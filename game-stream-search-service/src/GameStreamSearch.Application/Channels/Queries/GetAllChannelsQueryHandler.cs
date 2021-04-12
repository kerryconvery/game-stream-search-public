using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameStreamSearch.DataAccess;
using GameStreamSearch.DataAccess.Dto;

namespace GameStreamSearch.Application.GetAllChannels
{
    public class GetAllChannelsQuery { }

    public class Channel
    {
        public string ChannelName { get; init; }
        public string PlatformName { get; init; }
        public string AvatarUrl { get; init; }
        public string ChannelUrl { get; init; }
    }

    public class GetAllChannelsResponse
    {
        public IEnumerable<Channel> Channels { get; init; }
    }

    public class GetAllChannelsQueryHandler : IQueryHandler<GetAllChannelsQuery, GetAllChannelsResponse>
    {
        private readonly AwsDynamoDbTable<DynamoDbChannelTable> dynamoDbGateway;

        public GetAllChannelsQueryHandler(AwsDynamoDbTable<DynamoDbChannelTable> dynamoDbGateway)
        {
            this.dynamoDbGateway = dynamoDbGateway;
        }

        public async Task<GetAllChannelsResponse> Execute(GetAllChannelsQuery query)
        {
            var channels = await dynamoDbGateway.GetAllItems();

            return new GetAllChannelsResponse
            {
                Channels = channels
                    .OrderBy(c => c.DateRegistered)
                    .Select(c => new Channel
                    {
                        ChannelName = c.ChannelName,
                        PlatformName = c.StreamPlatformName,
                        AvatarUrl = c.AvatarUrl,
                        ChannelUrl = c.ChannelUrl,
                    })
            };
        }
    }
}
