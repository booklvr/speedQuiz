import {
  ADD_POINT_TO_CURRENT_TEAM,
  CLOSE_START_MODAL,
  CORRECT_WORD,
  LOAD_GAME,
  PREVIOUS_WORD,
  SET_CURRENT_TEAM,
  SHUFFLE_AND_ADD_TO_WORD_LIST,
  SKIP_WORD,
  START_THE_ROUND,
} from '../constants/gameConstants'

export const gameReducer = (
  state = {
    teams: [],
    teamIndex: 0,
    timer: {
      time: 30,
      start: false,
    },
    wordList: [],
    wordIndex: 0,
    points: 0,
  },
  action
) => {
  const { type, payload } = action
  switch (type) {
    case LOAD_GAME:
      return {
        ...state,
        teams: [...payload.teams],
        wordList: [...payload.wordList],
        showStartModal: true,
        timer: {
          ...state.timer,
          time: payload.timer.time,
          start: false,
        },
      }
    case SET_CURRENT_TEAM:
      return {
        ...state,
        teamIndex: payload,
        showStartModal: true,
      }
    case CORRECT_WORD:
      return {
        ...state,
        teams: [...state.teams].map((team, index) => {
          if (state.teamIndex === index) {
            return {
              ...team,
              points: team.points + 1,
            }
          } else {
            return {
              ...team,
            }
          }
        }),
        wordIndex: state.wordIndex + 1,
        points: state.points + 1,
      }
    case SKIP_WORD:
      return {
        ...state,
        wordIndex: state.wordIndex + 1,
      }
    case PREVIOUS_WORD:
      return {
        ...state,
        wordIndex: state.wordIndex - 1,
      }
    case SHUFFLE_AND_ADD_TO_WORD_LIST:
      return {
        ...state,
        wordList: [...state.wordList, ...payload],
      }
    case ADD_POINT_TO_CURRENT_TEAM:
      return {
        ...state,
        points: state.points + 1,
        teams: [...state.teams].map((team, index) => {
          if (state.teamIndex === index) {
            return {
              ...team,
              points: team.points + 1,
            }
          } else {
            return {
              ...team,
            }
          }
        }),
      }
    case CLOSE_START_MODAL:
      return {
        ...state,
        showStartModal: false,
      }
    case START_THE_ROUND:
      return {
        ...state,
        points: 0,
        showStartModal: false,
        timer: {
          ...state.timer,
          start: true,
        },
      }
    default:
      return state
  }
}
