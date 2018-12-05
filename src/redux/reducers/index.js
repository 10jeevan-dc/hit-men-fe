import { combineReducers } from 'redux';

import user from './user.reducer';
import game from './gameControl.reducer';

const combinedReducers = combineReducers({
  user,
  game,
});

export default combinedReducers;
