using System;
using System.Threading.Tasks;

namespace GameStreamSearch.Application
{
    public interface ICommandHandler<TCommand, TResult>
    {
        Task<TResult> Handle(TCommand request);
    }
}
