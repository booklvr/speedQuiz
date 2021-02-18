import {
  LOAD_GAME,
  SET_CURRENT_TEAM,
  CORRECT_WORD,
  SKIP_WORD,
  PREVIOUS_WORD,
} from '../constants/gameConstants'

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
  console.log('teams', teams)
  console.log('timer', timer)
  console.log('wordList', wordList)

  const shuffleArray = (array) => {
    let newArray = [...array]
    for (var i = newArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var temp = newArray[i]
      newArray[i] = newArray[j]
      newArray[j] = temp
    }
    return newArray
  }

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

export const correctWord = () => (dispatch) => {
  dispatch({
    type: CORRECT_WORD,
  })
}

export const skipWord = () => (dispatch) => {
  dispatch({
    type: SKIP_WORD
  })
}

export const previousWord = () => (dispatch) => {
  dispatch({
    type: PREVIOUS_WORD
  })
}
