import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { combineReducers, createStore } from 'redux';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

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
it('renders without crashing for start page', () => {
  const wrapper = Enzyme.shallow(<App store={mockStore} />);
  expect(wrapper).toMatchSnapshot();
});

it('renders without crashing for game page', () => {
  const wrapper = Enzyme.shallow(<App store={mockStore} />);
  wrapper.setProps({
    gameState: 2,
  });
  expect(wrapper).toMatchSnapshot();
});

it('renders without crashing for result page', () => {
  const wrapper = Enzyme.shallow(<App store={mockStore} />);
  wrapper.setProps({
    gameState: 3,
  });
  expect(wrapper).toMatchSnapshot();
});
