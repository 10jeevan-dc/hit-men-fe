
import {
  RESET_GAME_STATE, ALLOW_GAME_PLAY, CHANGE_GAME_STATE, USER_DETAILS_SET,
  SET_LEADERBOARD_DATA, SET_TEAM_SCORE_DATA,
} from '../actions';

export const initialState = {
  gameState: 1,
  isUserAllowedToPlay: false,
  isUserDetailsSet: false,
  leaderBoardData: [],
  teamScoreData: {},
};

export default function gameControlReducer(state = initialState, action) {
  switch (action.type) {
    case ALLOW_GAME_PLAY:
      return { ...state, isUserAllowedToPlay: action.payload };
    case CHANGE_GAME_STATE:
      return { ...state, gameState: action.payload };
    case USER_DETAILS_SET:
      return { ...state, isUserDetailsSet: action.payload };
    case SET_LEADERBOARD_DATA:
      return { ...state, leaderBoardData: action.payload };
    case SET_TEAM_SCORE_DATA:
      return { ...state, teamScoreData: action.payload };
    case RESET_GAME_STATE:
      return initialState;
    default:
      return state;
  }
}
