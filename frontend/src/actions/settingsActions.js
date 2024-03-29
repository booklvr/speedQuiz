import uuid from 'react-uuid'
import {
  CHANGE_NUMBER_OF_SECONDS,
  REMOVE_TEAMS,
  ADD_TEAMS,
  CHANGE_TEAM_NAME,
  RESET_POINTS,
  RESET_ALL,
} from '../constants/settingsConstants'
import { RESET_LISTS } from '../constants/wordListConstants'

export const changeNumberOfSeconds = (seconds) => (dispatch, getState) => {
  dispatch({
    type: CHANGE_NUMBER_OF_SECONDS,
    payload: seconds,
  })
  localStorage.setItem('settings', JSON.stringify(getState().settings))
}

export const changeNumberOfTeams = (numberOfTeams) => (dispatch, getState) => {
  const { teams } = getState().settings
  if (numberOfTeams < teams.length) {
    dispatch({
      type: REMOVE_TEAMS,
      payload: teams.length - numberOfTeams,
    })
  } else if (numberOfTeams > teams.length) {
    const newTeams = []
    for (let i = 0; i < numberOfTeams - teams.length; i++) {
      newTeams.push({
        name: `team ${i + teams.length + 1}`,
        id: uuid(),
        current: false,
        points: 0,
      })
    }
    dispatch({
      type: ADD_TEAMS,
      payload: newTeams,
    })
  }
  localStorage.setItem('settings', JSON.stringify(getState().settings))
}

export const changeTeamName = (name, id) => (dispatch, getState) => {
  dispatch({
    type: CHANGE_TEAM_NAME,
    payload: { name, id },
  })
  localStorage.setItem('settings', JSON.stringify(getState().settings))
}

export const resetPoints = () => (dispatch, getState) => {
  dispatch({
    type: RESET_POINTS,
  })
  localStorage.setItem('settings', JSON.stringify(getState().settings))
}

export const resetAll = () => (dispatch, getState) => {
  dispatch({
    type: RESET_ALL,
  })
  dispatch({
    type: RESET_LISTS,
  })
  localStorage.setItem('wordList', JSON.stringify(getState().wordList))
  localStorage.setItem('categoryList', JSON.stringify(getState().categoryList))
}
