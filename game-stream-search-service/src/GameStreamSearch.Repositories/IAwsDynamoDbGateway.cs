using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GameStreamSearch.Repositories
{
    public interface IAwsDynamoDbGateway<T>
    {
        Task PutItem(T document);
        Task<T> GetItem(object partitionKey, object rangeKey);
        Task<IEnumerable<T>> GetAllItems();
        Task DeleteItem(object partitionKey, object rangeKey);
    }
}
