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
import { settingsReducer } from './reducers/SettingsReducer'
import { gameReducer } from './reducers/gameReducer'

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
  settings: settingsReducer,
  game: gameReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const categoryListFromStorage = localStorage.getItem('categoryList')
  ? JSON.parse(localStorage.getItem('categoryList'))
  : undefined

const wordListFromStorage = localStorage.getItem('wordList')
  ? JSON.parse(localStorage.getItem('wordList'))
  : []

const settingsFromStorage = localStorage.getItem('settings')
  ? JSON.parse(localStorage.getItem('settings'))
  : undefined

const gameFromStorage = localStorage.getItem('game')
  ? JSON.parse(localStorage.getItem('settings'))
  : undefined

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  categoryList: categoryListFromStorage,
  wordList: wordListFromStorage,
  settings: settingsFromStorage,
  game: gameFromStorage,
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
