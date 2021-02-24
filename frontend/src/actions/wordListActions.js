import axios from 'axios'
import {
  ADD_NEW_WORD,
  ADD_WORD_BY_CHECKBOX,
  DELETE_WORD_LIST_FAIL,
  DELETE_WORD_LIST_REQUEST,
  DELETE_WORD_LIST_SUCCESS,
  REMOVE_WORD,
  SAVED_WORD_LISTS_FAIL,
  SAVED_WORD_LISTS_REQUEST,
  SAVED_WORD_LISTS_SUCCESS,
  SAVE_WORD_LIST_FAIL,
  SAVE_WORD_LIST_REQUEST,
  SAVE_WORD_LIST_RESET,
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

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      '/api/wordList',
      { wordList, name: wordListName },
      config
    )

    console.log('data', data)
    dispatch({
      type: SAVE_WORD_LIST_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: SAVE_WORD_LIST_FAIL,
    })
  }
}

export const resetSaveModal = () => (dispatch) => {
  dispatch({
    type: SAVE_WORD_LIST_RESET,
  })
}

export const getAllWordLists = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SAVED_WORD_LISTS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/wordList', config)
    dispatch({
      type: SAVED_WORD_LISTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SAVED_WORD_LISTS_FAIL,
    })
  }
}

export const deleteWordList = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_WORD_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/wordList/${id}`, config)

    dispatch({
      type: DELETE_WORD_LIST_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DELETE_WORD_LIST_FAIL,
    })
  }
}
