
import {
  RESET_USER_DETAILS, SET_USER_ALLOCATION_DETAILS, SET_USER_SCORE, SET_REMAINING_TIME,
} from '../actions';

export const initialState = {
  sessionName: '',
  userName: '',
  selfTeam: '',
  opponentTeam: '',
  gamePlayTimeInSeconds: 0,
  score: 0,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_ALLOCATION_DETAILS:
      return { ...state, ...action.payload };
    case SET_USER_SCORE:
      return { ...state, score: action.payload };
    case SET_REMAINING_TIME:
      return { ...state, gamePlayTimeInSeconds: action.payload };
    case RESET_USER_DETAILS:
      return initialState;
    default:
      return state;
  }
}
