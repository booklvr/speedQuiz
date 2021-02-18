import {
  ADD_NEW_WORD,
  ADD_WORD_BY_CHECKBOX,
  REMOVE_WORD,
} from '../constants/wordListConstants'

export const addWordByCheckbox = ({ id, word }) => (dispatch, getState) => {
  dispatch({
    type: ADD_WORD_BY_CHECKBOX,
    payload: { id, word },
  })
  localStorage.setItem('wordList', JSON.stringify(getState().wordList))
}

export const removeWord = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_WORD,
    payload: id,
  })
  localStorage.setItem('wordList', JSON.stringify(getState().wordList))
}

export const addNewWord = (word) => (dispatch, getState) => {
  dispatch({
    type: ADD_NEW_WORD,
    payload: word,
  })
  localStorage.setItem('wordList', JSON.stringify(getState().wordList))
}
