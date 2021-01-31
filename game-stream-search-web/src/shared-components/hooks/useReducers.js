import { useReducer, useCallback, useMemo } from 'react';

const useReducers = (reducers, initialState) => {
  const internalReducer = useCallback((state, action) => {
    const reducerMethods = reducers(state);

    return reducerMethods[action.reducerKey](...action.props)
  });

  const [ state, dispatch ] = useReducer(internalReducer, initialState);

  const memorisedReducers = useMemo(() => {
    const proxyReducer = (key, dispatch) => (...props) => {
      dispatch({ reducerKey: key, props });
    }

    const proxyReducers = {};

    const reducerMethods = reducers();
    
    Object.keys(reducerMethods).forEach((key) => {
      proxyReducers[key] = proxyReducer(key, dispatch);
    });

    return proxyReducers;
  });

  return { state, ...memorisedReducers };
}

export default useReducers