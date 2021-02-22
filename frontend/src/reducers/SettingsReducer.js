import uuid from 'react-uuid'
import {
  ADD_TEAMS,
  CHANGE_NUMBER_OF_SECONDS,
  CHANGE_TEAM_NAME,
  REMOVE_TEAMS,
  RESET_POINTS,
} from '../constants/settingsConstants'


export const settingsReducer = (
  state = {
    timer: 30,
    teams: [
      {
        name: 'team 1',
        id: uuid(),
        current: true,
        points: 0,
      },
      {
        name: 'team 2',
        id: uuid(),
        current: false,
        points: 0,
      },
      {
        name: 'team 3',
        id: uuid(),
        current: false,
        points: 0,
      },
    ],
  },
  action
) => {
  const { type, payload } = action
  switch (type) {
    case CHANGE_NUMBER_OF_SECONDS:
      return {
        ...state,
        timer: parseInt(payload),
      }
    case REMOVE_TEAMS:
      return {
        ...state,
        teams: [...state.teams].slice(0, payload * -1),
      }
    case ADD_TEAMS:
      return {
        ...state,
        teams: [...state.teams, ...payload],
      }
    case CHANGE_TEAM_NAME:
      return {
        ...state,
        teams: [...state.teams].map((team) => {
          if (team.id === payload.id) {
            return {
              ...team,
              name: payload.name,
            }
          }
          return { ...team }
        }),
      }
    case RESET_POINTS:
      return {
        ...state,
        teams: [...state.teams].map((team) => ({
          ...team,
          points: 0,
        })),
      }
    
    default:
      return state
  }
}
