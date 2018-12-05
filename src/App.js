import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './components/Header/Header.component';
import StartPage from './components/StartPage/StartPage.component';
import GamePage from './components/GamePage/GamePage.component';
import LeaderBoardPage from './components/LeaderBoard/LeaderBoardPage.component';
import './App.css';

class App extends Component {
  getStartPage = () => (
    <div className="App">
      <Header />
      <StartPage />
    </div>
  );

  getGamePage = () => (
    <div className="App">
      <Header />
      <GamePage />
    </div>
  );

  getLeaderBoardPage = () => (
    <div className="App">
      <Header />
      <LeaderBoardPage />
    </div>
  );

  render() {
    const { screenID } = this.props;
    switch (screenID) {
      case 2: return this.getGamePage();
      case 3: return this.getLeaderBoardPage();
      default: return this.getStartPage();
    }
  }
}

const mapStateToProps = ({ game }) => ({
  screenID: game.gameState,
});

App.propTypes = {
  screenID: Proptypes.number,
};

App.defaultProps = {
  screenID: 1,
};

export default connect(mapStateToProps)(App);
