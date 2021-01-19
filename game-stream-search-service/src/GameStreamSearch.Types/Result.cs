﻿using System;

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

    public struct Result<V, E> where E : Enum
    {
        public static Result<V, E> Success(V value)
        {
            return new Result<V, E>
            {
                IsSuccess = true,
                Value = Maybe<V>.ToMaybe(value)
            };
        }

        public static Result<V, E> Success(Maybe<V> value)
        {
            return new Result<V, E>
            {
                IsSuccess = true,
                Value = value,
            };
        }

        public static Result<V, E> Fail(E error)
        {
            return new Result<V, E>
            {
                Value = Maybe<V>.Nothing(),
                IsSuccess = false,
                Error = error,
            };
        }

        public bool IsSuccess { get; init; }
        public bool IsFailure => !IsSuccess;
        public E Error { get; init; }
        public Maybe<V> Value { get; init; }
    }
}
