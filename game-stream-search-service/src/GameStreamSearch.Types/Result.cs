using System;

namespace GameStreamSearch.Types
{
    public struct Result<E> where E : Enum
    {
        public static Result<E> Success()
        {
            return new Result<E>()
            {
                IsSuccess = true,
            };
        }

        public static Result<E> Fail(E error)
        {
            return new Result<E>
            {
                IsSuccess = false,
                Error = error,
            };
        }

        public bool IsSuccess { get; init; }
        public bool IsFailure => !IsSuccess;
        public E Error { get; init; }
    }
}
