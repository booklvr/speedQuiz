import {
  ADD_POINT_TO_CURRENT_TEAM,
  CLOSE_START_MODAL,
  CORRECT_WORD,
  END_THE_ROUND,
  LOAD_GAME,
  UNDO_SKIP,
  UNDO_CORRECT,
  SET_CURRENT_TEAM,
  SHUFFLE_AND_ADD_TO_WORD_LIST,
  SKIP_WORD,
  START_THE_ROUND,
  START_THE_TIMER,
  EDIT_TEAM_POINTS,
  EDIT_ROUND_POINTS_MODAL,
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
    skippedWords: [],
    correctWords: [],
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
        showModal: payload.showModal,
        insideInstructionModal: payload.insideInstructionModal,
        startModal: true,
        startRound: false,
        timer: {
          ...state.timer,
          time: payload.timer.time,
          start: false,
        },
        points: 0,
      }
    case SET_CURRENT_TEAM:
      return {
        ...state,
        points: 0,
        teamIndex: payload,
        showModal: state.insideInstructionModal ? false : true,
        startModal: true,
        startRound: false,
        timer: {
          ...state.timer,
          time: state.timer.time,
          start: false,
        },
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
        correctWords: [...state.correctWords, state.wordList[state.wordIndex]],
      }
    case SKIP_WORD:
      return {
        ...state,
        wordIndex: state.wordIndex + 1,
        skippedWords: [...state.skippedWords, state.wordList[state.wordIndex]],
      }
    case UNDO_SKIP:
      return {
        ...state,
        skippedWords: state.skippedWords.slice(0, -1),
        wordIndex: state.wordIndex - 1,
      }
    case UNDO_CORRECT:
      return {
        ...state,
        correctWords: state.correctWords.slice(0, -1),
        teams: [...state.teams].map((team, index) => {
          if (state.teamIndex === index) {
            return {
              ...team,
              points: team.points - 1,
            }
          } else {
            return {
              ...team,
            }
          }
        }),
        points: state.points - 1,
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
        showModal: false,
      }
    case START_THE_ROUND:
      return {
        ...state,
        showModal: false,
        startRound: true,
        skippedWords: [],
        correctWords: [],
      }
    case END_THE_ROUND:
      return {
        ...state,
        showModal: state.insideInstructionModal ? false : true,
        startModal: false,
        startRound: false,
        timer: {
          ...state.timer,
          start: false,
        },
      }
    case START_THE_TIMER:
      return {
        ...state,
        startRound: false,
        timer: {
          ...state.timer,
          start: true,
        },
      }
    case EDIT_ROUND_POINTS_MODAL:
      return {
        ...state,
        points: payload,
        teams: [...state.teams].map((team, index) => {
          if (state.teamIndex === index) {
            return {
              ...team,
              points: team.points + payload - state.points,
            }
          } else {
            return {
              ...team,
            }
          }
        }),
      }
    case EDIT_TEAM_POINTS:
      return {
        ...state,
        teams: [...state.teams].map((team, index) => {
          if (team.id === payload.id) {
            return {
              ...team,
              points: payload.points,
            }
          } else {
            return {
              ...team,
            }
          }
        }),
      }
    default:
      return state
  }
}
