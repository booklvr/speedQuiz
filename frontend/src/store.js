import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'

import { categoryListReducer } from './reducers/categoryListReducer'

import { wordListReducer } from './reducers/wordListReducer'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  categoryList: categoryListReducer,
  wordList: wordListReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const wordListFromStorage = localStorage.getItem('wordList')
  ? JSON.parse(localStorage.getItem('wordList'))
  : []

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  wordList: wordListFromStorage,
}

const middleware = [thunk]

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
})
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
)

export default store
