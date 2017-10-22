//@flow
'use-strict';
import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore ,autoRehydrate} from 'redux-persist';
import reducers from './reducers';

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}
var createSIAStore = applyMiddleware(...middlewares)(createStore);
var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

export default function configureStore(onCompletion: ?()=>void):any {

  //use realm instead of AsyncStorage for performance
  // const store = autoRehydrate()(createRodStore)(reducers);
  const store = createSIAStore(reducers)
  if (isDebuggingInChrome) {
    window.store = store;
  }
  // persistStore(store, {storage: AsyncStorage}, onCompletion);

  return store;
}
