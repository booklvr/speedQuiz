import uuid from 'react-uuid'
import {
  ADD_NEW_WORD,
  ADD_SUBCATEGORY_BY_CHECKBOX,
  ADD_WORD_BY_CHECKBOX,
  DELETE_WORD_LIST_FAIL,
  DELETE_WORD_LIST_REQUEST,
  DELETE_WORD_LIST_SUCCESS,
  REMOVE_SUBCATEGORY_BY_CHECKBOX,
  REMOVE_WORD,
  SAVED_WORD_LISTS_FAIL,
  SAVED_WORD_LISTS_REQUEST,
  SAVED_WORD_LISTS_SUCCESS,
  SAVE_WORD_LIST_FAIL,
  SAVE_WORD_LIST_REQUEST,
  SAVE_WORD_LIST_RESET,
  SAVE_WORD_LIST_SUCCESS,
} from '../constants/wordListConstants'

export const wordListReducer = (state = [], action) => {
  const { type, payload } = action
  switch (type) {
    case ADD_NEW_WORD:
      return [...state, { word: payload, id: uuid() }]
    case ADD_WORD_BY_CHECKBOX:
      return [...state, { ...payload }]
    case ADD_SUBCATEGORY_BY_CHECKBOX:
      return [
        ...state,
        ...payload.map((listItem) => ({
          word: listItem.word,
          id: listItem.id,
        })),
      ]
    case REMOVE_SUBCATEGORY_BY_CHECKBOX:
      return [...state].filter((word) => !payload.includes(word.id))
    case REMOVE_WORD:
      return [...state].filter((word) => word.id !== payload)
    default:
      return state
  }
}

export const saveWordListReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case SAVE_WORD_LIST_REQUEST:
      return { loading: true, success: false }
    case SAVE_WORD_LIST_SUCCESS:
      return { loading: false, success: true }
    case SAVE_WORD_LIST_FAIL:
      return { loading: false, error: payload }
    case SAVE_WORD_LIST_RESET:
      return { loading: false, success: false }
    default:
      return state
  }
}

export const savedWordListsReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case SAVED_WORD_LISTS_REQUEST:
      return { loading: true }
    case SAVED_WORD_LISTS_SUCCESS:
      return { loading: false, wordLists: payload }
    case SAVED_WORD_LISTS_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export const deleteWordListReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case DELETE_WORD_LIST_REQUEST:
      return { loading: true }
    case DELETE_WORD_LIST_SUCCESS:
      return { loading: false, success: true }
    case DELETE_WORD_LIST_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
