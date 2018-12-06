import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { has, get } from 'lodash';
import { patchRequest } from '../../utils/request.utils';
import { setUserScore, setRemainingTime, changeGameState } from '../../redux/actions';
import HitButton from './shared/HitButton.component';
import './GamePage.css';

class GamePage extends Component {
  componentDidMount = () => {
    this.timer = setInterval(this.tickHandler, 1000);
  }

  onTimeComplete = () => {
    const { progressGame, userName } = this.props;
    patchRequest('stop', { userName });
    progressGame(3);
  }

  hitHandler = () => {
    const {
      userName, updateUserScore, currentScore, progressGame,
    } = this.props;
    patchRequest(`hit/${userName}`).then(response => response.json()).then((jsonResponse) => {
      if (has(jsonResponse, 'score')) {
        updateUserScore(get(jsonResponse, 'score', currentScore) + 1);
      } else if (has(jsonResponse, 'gameOver')) {
        patchRequest('stop', { userName });
        clearInterval(this.timer);
        progressGame(3);
      }
    });
  }

  tickHandler = () => {
    const { updateUserTime, timerValue } = this.props;
    if (timerValue === 0) {
      clearInterval(this.timer);
      this.onTimeComplete();
    } else {
      updateUserTime((timerValue - 1));
    }
  }

  render() {
    const { currentScore, timerValue } = this.props;
    return (
      <div className="game_page_container">
        <HitButton hitHandler={this.hitHandler} />
        <div className="current_score">
          Your score:
          {' '}
          {currentScore}
        </div>
        <div className="timer">
          Time remaining
          <br />
          {' '}
          {timerValue}
          {' '}
          s
        </div>
      </div>
    );
  }
}

GamePage.propTypes = {
  currentScore: PropTypes.number,
  timerValue: PropTypes.number,
  userName: PropTypes.string.isRequired,
  updateUserScore: PropTypes.func,
  updateUserTime: PropTypes.func.isRequired,
  progressGame: PropTypes.func.isRequired,
};

GamePage.defaultProps = {
  currentScore: 0,
  timerValue: 30,
  updateUserScore: () => {},
};

const mapStateToProps = ({ user }) => ({
  currentScore: user.score,
  timerValue: (user.gamePlayTimeInSeconds),
  userName: user.userName,
});

const mapDispatchToProps = dispatch => ({
  updateUserScore: payload => (dispatch(setUserScore(payload))),
  updateUserTime: payload => (dispatch(setRemainingTime(payload))),
  progressGame: payload => dispatch(changeGameState(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
