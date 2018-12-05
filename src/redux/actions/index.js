import { createAction } from 'redux-actions';

// Action constants

export const RESET_USER_DETAILS = 'RESET_USER_DETAILS';
export const SET_USER_ALLOCATION_DETAILS = 'SET_USER_ALLOCATION_DETAILS';
export const RESET_GAME_STATE = 'RESET_GAME_STATE';
export const ALLOW_GAME_PLAY = 'ALLOW_GAME_PLAY';
export const CHANGE_GAME_STATE = 'CHANGE_GAME_STATE';
export const USER_DETAILS_SET = 'USER_DETAILS_SET';
export const SET_USER_SCORE = 'SET_USER_SCORE';
export const SET_REMAINING_TIME = 'SET_REMAINING_TIME';
export const SET_LEADERBOARD_DATA = 'SET_LEADERBOARD_DATA';
export const SET_TEAM_SCORE_DATA = 'SET_TEAM_SCORE_DATA';


// Actions

export const setUserAllocationDetails = createAction(SET_USER_ALLOCATION_DETAILS);
export const resetUserDetails = createAction(RESET_USER_DETAILS);
export const allowGamePlay = createAction(ALLOW_GAME_PLAY);
export const changeGameState = createAction(CHANGE_GAME_STATE);
export const resetGameState = createAction(RESET_GAME_STATE);
export const userDetailsSet = createAction(USER_DETAILS_SET);
export const setUserScore = createAction(SET_USER_SCORE);
export const setRemainingTime = createAction(SET_REMAINING_TIME);
export const setLeaderboardData = createAction(SET_LEADERBOARD_DATA);
export const setTeamScoreData = createAction(SET_TEAM_SCORE_DATA);
