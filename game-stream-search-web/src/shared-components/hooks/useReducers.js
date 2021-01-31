import { useReducer, useCallback, useMemo } from 'react';

const useReducers = (createReducers, initialState) => {
  const internalReducer = useCallback((state, action) => {
    const reducerMethods = createReducers(state);

    return reducerMethods[action.reducerKey](...action.props)
  });

  const [ state, dispatch ] = useReducer(internalReducer, initialState);

  const actions = useMemo(() => {
    const proxyReducer = (key, dispatch) => (...props) => {
      dispatch({ reducerKey: key, props });
    }

    const reducerMethods = createReducers();
    
    return Object.keys(reducerMethods).map(key => proxyReducer(key, dispatch));
  });

  return [ state, ...actions ];
}

export default useReducers