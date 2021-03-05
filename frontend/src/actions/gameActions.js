import {
  LOAD_GAME,
  SET_CURRENT_TEAM,
  CORRECT_WORD,
  SKIP_WORD,
  SHUFFLE_AND_ADD_TO_WORD_LIST,
  CLOSE_START_MODAL,
  START_THE_ROUND,
  START_THE_ROUND_OUTSIDE_MODAL,
  START_THE_TIMER,
  END_THE_ROUND,
  UNDO_CORRECT,
  UNDO_SKIP,
  EDIT_TEAM_POINTS,
  EDIT_ROUND_POINTS_MODAL,
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

export const loadGame = (insideInstructionModal) => (dispatch, getState) => {
  const { teams, timer } = getState().settings
  const wordList = getState().wordList

  dispatch({
    type: LOAD_GAME,
    payload: {
      teams,
      showModal: insideInstructionModal ? false : true,
      insideInstructionModal: insideInstructionModal ? true : false,
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
  // localStorage.setItem('game', JSON.stringify(getState().game))
}

export const correctWord = () => (dispatch, getState) => {
  dispatch({
    type: CORRECT_WORD,
  })

  const { wordList, wordIndex } = getState().game

  // if you reach the end of the word list shuffle and rest index to 0
  if (wordIndex === wordList.length) {
    dispatch({
      type: SHUFFLE_AND_ADD_TO_WORD_LIST,
      payload: shuffleArray(wordList),
    })
  }
}

export const skipWord = () => (dispatch, getState) => {
  dispatch({
    type: SKIP_WORD,
  })
  const { wordIndex, wordList } = getState().game
  if (wordIndex === wordList.length) {
    dispatch({
      type: SHUFFLE_AND_ADD_TO_WORD_LIST,
      payload: shuffleArray(wordList),
    })
  }
}

export const undoWord = () => (dispatch, getState) => {
  const { skippedWords, correctWords, wordIndex, wordList } = getState().game

  const previousSkipped = skippedWords.length
    ? skippedWords[skippedWords.length - 1].id
    : undefined
  const previousCorrect = correctWords.length
    ? correctWords[correctWords.length - 1].id
    : undefined
  const previousWord = wordList[wordIndex - 1].id

  if (previousSkipped === previousWord) {
    dispatch({
      type: UNDO_SKIP,
    })
  } else if (previousCorrect === previousWord) {
    dispatch({
      type: UNDO_CORRECT,
    })
  }
}

export const startTheRound = () => (dispatch) => {
  dispatch({
    type: START_THE_ROUND,
  })
}

export const closeStartModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_START_MODAL,
  })
}

export const startTheRoundOutsideModal = () => (dispatch) => {
  dispatch({
    type: START_THE_ROUND_OUTSIDE_MODAL,
  })
}

export const startTheTimer = () => (dispatch) => {
  dispatch({
    type: START_THE_TIMER,
  })
}

export const endOfRound = (insideInstructionModal) => (dispatch) => {
  dispatch({
    type: END_THE_ROUND,
  })
}

export const editRoundPointsModal = (roundPoints) => (dispatch) => {
  dispatch({
    type: EDIT_ROUND_POINTS_MODAL,
    payload: roundPoints,
  })
}

export const editTeamPoints = (points, id) => (dispatch) => {
  dispatch({
    type: EDIT_TEAM_POINTS,
    payload: {
      points,
      id,
    },
  })
}
