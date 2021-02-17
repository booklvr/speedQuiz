import {
  ADD_WORD_BY_CHECKBOX,
  REMOVE_WORD,
} from '../constants/wordListConstants'

export const addWordByCheckbox = ({ id, word }) => (dispatch) => {
  dispatch({
    type: ADD_WORD_BY_CHECKBOX,
    payload: { id, word },
  })
}

export const removeWord = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_WORD,
    payload: id,
  })
}
