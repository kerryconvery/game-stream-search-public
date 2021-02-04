using System;
using System.Threading.Tasks;

namespace GameStreamSearch.Application
{
    public interface ICommandHandler<TCommand, TResult> where TResult : Enum
    {
        Task<TResult> Handle(TCommand request);
    }
}
