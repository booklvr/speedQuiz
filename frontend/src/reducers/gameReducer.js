import {
  CORRECT_WORD,
  LOAD_GAME,
  PREVIOUS_WORD,
  SET_CURRENT_TEAM,
  SKIP_WORD,
} from '../constants/gameConstants'

export const gameReducer = (
  state = {
    teams: [],
    teamIndex: 0,
    timer: {
      time: 0,
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
        teams: [...state.teams, ...payload.teams],
        wordList: [...state.wordList, ...payload.wordList],
        timer: {
          ...state.timer,
          timeLeft: payload.timer,
        },
      }
    case SET_CURRENT_TEAM:
      return {
        ...state,
        teamIndex: payload,
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
    default:
      return state
  }
}
