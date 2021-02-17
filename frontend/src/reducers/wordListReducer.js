import {
  ADD_SUBCATEGORY_BY_CHECKBOX,
  ADD_WORD_BY_CHECKBOX,
  REMOVE_SUBCATEGORY_BY_CHECKBOX,
  REMOVE_WORD,
} from '../constants/wordListConstants'

export const wordListReducer = (state = [], action) => {
  const { type, payload } = action
  switch (type) {
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
      return [...state].filter((word) => word.id != payload)
    default:
      return state
  }
}
