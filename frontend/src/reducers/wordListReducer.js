import uuid from 'react-uuid'
import {
  ADD_NEW_WORD,
  ADD_SUBCATEGORY_BY_CHECKBOX,
  ADD_WORD_BY_CHECKBOX,
  REMOVE_SUBCATEGORY_BY_CHECKBOX,
  REMOVE_WORD,
  SAVE_WORD_LIST_FAIL,
  SAVE_WORD_LIST_REQUEST,
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
      return { loading: true }
    case SAVE_WORD_LIST_SUCCESS:
      return { loading: false, userInfo: payload }
    case SAVE_WORD_LIST_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
