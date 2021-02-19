import {
  LOAD_GAME,
  SET_CURRENT_TEAM,
  CORRECT_WORD,
  SKIP_WORD,
  PREVIOUS_WORD,
  SHUFFLE_AND_ADD_TO_WORD_LIST,
  ADD_POINT_TO_CURRENT_TEAM,
  CLOSE_START_MODAL,
  START_THE_ROUND,
  START_THE_ROUND_OUTSIDE_MODAL,
} from '../constants/gameConstants'

const shuffleArray = (array) => {
  const shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}

export const nextTeam = () => (dispatch, getState) => {
  const { teams, teamIndex } = getState().game

  dispatch({
    type: SET_CURRENT_TEAM,
    payload: teamIndex === teams.length - 1 ? 0 : teamIndex + 1,
  })
}

export const previousTeam = () => (dispatch, getState) => {
  const { teams, teamIndex } = getState().game

  dispatch({
    type: SET_CURRENT_TEAM,
    payload: teamIndex === 0 ? teams.length - 1 : teamIndex - 1,
  })
}

export const loadGame = () => (dispatch, getState) => {
  const { teams, timer } = getState().settings
  const wordList = getState().wordList

  dispatch({
    type: LOAD_GAME,
    payload: {
      teams,
      // teamIndex: 0,
      timer: {
        time: timer,
        // start: false,
      },
      wordList: shuffleArray(wordList),
      // wordIndex: 0,
      // points: 0,
    },
  })
}

export const correctWord = () => (dispatch, getState) => {
  const { wordList, wordIndex } = getState().game

  // if you reach the end of the word list shuffle and rest index to 0
  if (wordIndex === wordList.length - 1) {
    dispatch({
      type: SHUFFLE_AND_ADD_TO_WORD_LIST,
      payload: shuffleArray(wordList),
    })
    dispatch({
      type: ADD_POINT_TO_CURRENT_TEAM,
    })
  } else {
    dispatch({
      type: CORRECT_WORD,
    })
  }
}

export const skipWord = () => (dispatch, getState) => {
  const { wordIndex, wordList } = getState().game
  if (wordIndex === wordList.length - 1) {
    dispatch({
      type: SHUFFLE_AND_ADD_TO_WORD_LIST,
      payload: shuffleArray(wordList),
    })
  } else {
    dispatch({
      type: SKIP_WORD,
    })
  }
}

export const previousWord = () => (dispatch) => {
  dispatch({
    type: PREVIOUS_WORD,
  })
}

export const startTheRound = () => (dispatch) => {
  dispatch({
    type: START_THE_ROUND,
  })
}

export const closeStartModal = () => (dispatch) => {
  console.log('fucking close the modal')
  dispatch({
    type: CLOSE_START_MODAL,
  })
}

export const startTheRoundOutsideModal = () => (dispatch) => {
  dispatch({
    type: START_THE_ROUND_OUTSIDE_MODAL,
  })
}
