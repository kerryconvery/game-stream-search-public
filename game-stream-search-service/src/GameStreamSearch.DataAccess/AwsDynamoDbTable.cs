using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using GameStreamSearch.Types;

namespace GameStreamSearch.DataAccess
{
    public class AwsDynamoDbTable<T> : IDisposable
    {
        private DynamoDBContext dynamoDbContext;

        public AwsDynamoDbTable(IAmazonDynamoDB dynamoDB)
        {
            dynamoDbContext = new DynamoDBContext(dynamoDB);
        }

        public Task PutItem(T item)
        {
            return dynamoDbContext.SaveAsync(item);
        }

        public Task DeleteItem(object partitionKey, object rangeKey)
        {
            return dynamoDbContext.DeleteAsync<T>(partitionKey, rangeKey);
        }

        public async Task<Maybe<T>> GetItem(object partitionKey, object rangeKey)
        {
            var item = await dynamoDbContext.LoadAsync<T>(partitionKey, rangeKey);

            return Maybe<T>.ToMaybe(item);
        }

        public async Task<IEnumerable<T>> GetAllItems()
        {
            var scan = dynamoDbContext.ScanAsync<T>(null);

            return await scan.GetRemainingAsync();
        }

        public void Dispose()
        {
            dynamoDbContext.Dispose();
        }
    }
}
