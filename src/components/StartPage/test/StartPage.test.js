import React from 'react';
import Enzyme from 'enzyme';
import { combineReducers, createStore } from 'redux';
import StartPage from '../StartPage.component';


const mockReducers = {
  user: () => ({
    sessionName: '',
    userName: '',
    selfTeam: '',
    opponentTeam: '',
    gamePlayTimeInSeconds: 0,
    score: 0,
  }),
  game: () => ({
    gameState: 1,
    isUserAllowedToPlay: false,
    isUserDetailsSet: false,
    leaderBoardData: [],
    teamScoreData: {},
  }),
};

const mockStore = createStore(combineReducers(mockReducers), {});
it('renders without crashing', () => {
  const wrapper = Enzyme.shallow(<StartPage store={mockStore} />);
  expect(wrapper).toMatchSnapshot();
});
