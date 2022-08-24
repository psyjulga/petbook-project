import { legacy_createStore as createStore } from 'redux'

import reducer from './reducers'
// the combined reducer from the index.ts

import middleware from './middleware'
// applied middleware from the index.ts (thunk and logger)

const store = createStore(reducer, middleware)

export default store
