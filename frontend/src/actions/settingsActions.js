import uuid from 'react-uuid'
import {
  CHANGE_NUMBER_OF_SECONDS,
  REMOVE_TEAMS,
  ADD_TEAMS,
  CHANGE_TEAM_NAME,
  RESET_POINTS,
} from '../constants/settingsConstants'

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
        name: `team ${parseInt(i + numberOfTeams)}`,
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
