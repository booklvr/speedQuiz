import axios from 'axios'
import {
  ADD_NEW_WORD,
  ADD_WORD_BY_CHECKBOX,
  REMOVE_WORD,
  SAVE_WORD_LIST_FAIL,
  SAVE_WORD_LIST_REQUEST,
  SAVE_WORD_LIST_SUCCESS,
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

export const saveWordList = (wordListName) => async (dispatch, getState) => {
  const wordList = getState().wordList
  try {
    dispatch({
      type: SAVE_WORD_LIST_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/wordList',
      { wordList, name: wordListName },
      config
    )
    console.log('saved word list', data)
    dispatch({
      type: SAVE_WORD_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SAVE_WORD_LIST_FAIL,
    })
  }
}
