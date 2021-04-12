using System.Threading.Tasks;
using GameStreamSearch.Types;
using GameStreamSearch.DataAccess;
using GameStreamSearch.DataAccess.Dto;

namespace GameStreamSearch.Application.GetASingleChannel
{
    public struct GetASingleChannelQuery
    {
        public string platformName { get; init; }
        public string channelName { get; init; }
    }

    public class Channel
    {
        public string ChannelName { get; init; }
        public string PlatformName { get; init; }
        public string AvatarUrl { get; init; }
        public string ChannelUrl { get; init; }
    }

    public class GetASingleChannelResponse
    {
        public GetASingleChannelResponse(Maybe<Channel> channel)
        {
            this.channel = channel;
        }

        public Maybe<Channel> channel { get; }
    }

    public class GetASingleChannelQueryHandler : IQueryHandler<GetASingleChannelQuery, GetASingleChannelResponse>
    {
        private readonly AwsDynamoDbTable<DynamoDbChannelTable> dynamoDbGateway;

        public GetASingleChannelQueryHandler(AwsDynamoDbTable<DynamoDbChannelTable> dynamoDbGateway)
        {
            this.dynamoDbGateway = dynamoDbGateway;
        }

        public async Task<GetASingleChannelResponse> Execute(GetASingleChannelQuery query)
        {
           var channel = await dynamoDbGateway.GetItem(query.platformName, query.channelName);

            return new GetASingleChannelResponse(channel.Select(v => new Channel
            {
                PlatformName = v.StreamPlatformName,
                ChannelName = v.ChannelName,
                ChannelUrl = v.ChannelUrl,
                AvatarUrl = v.AvatarUrl
            }));
        }
    }
}
