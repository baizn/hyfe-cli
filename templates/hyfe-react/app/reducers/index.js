/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux'
import configurationReducer from './configReducer'

/**
 * 主reducers方法，合并各个子reducer
 * @param {object} asyncReducers asyncReducers
 * @returns {Object} Object
 */
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    configuration: configurationReducer,
    ...asyncReducers
  })
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
