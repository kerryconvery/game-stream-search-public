﻿using System;
using System.Threading.Tasks;

namespace GameStreamSearch.Types
{
    public class Maybe<T>
    {
        private bool hasValue;
        internal T value;

        internal Maybe()
        {
            hasValue = false;
        }

        internal Maybe(T value)
        {
            if (value == null)
            {
                throw new ArgumentNullException(nameof(value));
            }

            this.value = value;
            hasValue = true;
        }

        public Maybe<TResult> Select<TResult>(Func<T, TResult> selector)
        {
            if (selector == null)
            {
                throw new ArgumentNullException(nameof(selector));
            }

            if (!hasValue)
            {
                return Maybe<TResult>.Nothing;
            }

            return Maybe<TResult>.ToMaybe(selector(value)); 
        }

        public Maybe<TResult> Chain<TResult>(Func<T, Maybe<TResult>> selector)
        {
            if (selector == null)
            {
                throw new ArgumentNullException(nameof(selector));
            }

            if (!hasValue)
            {
                return Maybe<TResult>.Nothing;
            }

            return Maybe<TResult>.ToMaybe(selector(value).value);
        }

        public async Task<Maybe<TResult>> SelectAsync<TResult>(Func<T, Task<TResult>> selector)
        {
            if (selector == null)
            {
                throw new ArgumentNullException(nameof(selector));
            }

            if (!hasValue)
            {
                return Maybe<TResult>.Nothing;
            }

            var result = await selector(value);

            return Maybe<TResult>.ToMaybe(result);
        }

        public async Task<Maybe<TResult>> ChainAsync<TResult>(Func<T, Task<Maybe<TResult>>> selector)
        {
            if (selector == null)
            {
                throw new ArgumentNullException(nameof(selector));
            }

            if (!hasValue)
            {
                return Maybe<TResult>.Nothing;
            }

            var result = await selector(value);

            return Maybe<TResult>.ToMaybe(result.value);
        }

        public T GetOrElse(T elseValue)
        {
            if (elseValue == null)
                throw new ArgumentNullException(nameof(elseValue));

            if (hasValue)
                return value;
            else
                return elseValue;
        }

        public bool IsNothing => !hasValue;
        public bool IsSome => hasValue;

        public static Maybe<T> ToMaybe(T? value)
        {
            return value != null ? Some(value) : Nothing;
        }

        public static Maybe<T> Some(T value)
        {
            return new Maybe<T>(value);
        }

        public static Maybe<T> Nothing => new Maybe<T>();
    }
}
