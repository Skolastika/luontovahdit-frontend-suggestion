import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import mapReducer from './reducers/mapReducer'
import userReducer from './reducers/userReducer'
import hotspotReducer from './reducers/hotspotReducer'
//import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  map: mapReducer,
  user: userReducer,
  hotspot: hotspotReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store