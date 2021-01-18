﻿using System;

namespace GameStreamSearch.Types
{
    public class Maybe<T>
    {
        private bool hasValue;
        private T value;

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

        public Maybe<TResult> Map<TResult>(Func<T, TResult> mapper)
        {
            if (mapper == null)
                throw new ArgumentNullException(nameof(mapper));

            if (hasValue)
                return Maybe<TResult>.Just(mapper(value));
            else
                return Maybe<TResult>.Nothing();
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

        public T Unwrap()
        {
            if (IsNothing)
            {
                throw new InvalidOperationException();
            }

            return value;
        }

        public bool IsNothing => !hasValue;
        public bool IsJust => hasValue;

        public static Maybe<T> ToMaybe(T? value)
        {
            return value != null ? Just(value) : Nothing();
        }

        public static Maybe<T> Just(T value)
        {
            return new Maybe<T>(value);
        }

        public static Maybe<T> Nothing()
        {
            return new Maybe<T>();
        }
    }
}
