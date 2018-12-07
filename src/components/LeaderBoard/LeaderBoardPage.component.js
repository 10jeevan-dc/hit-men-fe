import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  get, forOwn, has, map,
} from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import { getRequest } from '../../utils/request.utils';
import { setLeaderboardData, setUserScore, setTeamScoreData } from '../../redux/actions';
import './LeaderBoardPage.css';

class LeaderBoardPage extends Component {
  componentDidMount = () => {
    const {
      userName, updateUserScore, updateLeaderBoard, updateTeamScores,
    } = this.props;
    const leaderBoardData = [];
    const teamScoreData = {};
    getRequest(`score/${userName}`).then((scoreResponse) => {
      forOwn(get(scoreResponse, 'data.score', {}), (value, key) => {
        if (typeof (value) === 'object' && has(value, 'score')) {
          map(value.members, (member) => {
            leaderBoardData.push({
              playerName: member.username,
              score: member.score,
              team: member.team,
            });
          });
          teamScoreData[key] = value.score;
        }
      });
      const selfScore = get(scoreResponse, 'data.selfScore', 0);
      updateUserScore(selfScore);
      updateLeaderBoard(leaderBoardData);
      updateTeamScores(teamScoreData);
    }).catch((error) => {
      toast.error(get(error, 'response.data.message', 'Oops! An unexpected error occured'), {
        onClose: this.refreshPage,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    });
  }

  getLeaderboardTableRow = (playerName, score, team) => (
    <tr className="custom_table_row">
      <td>{playerName}</td>
      <td>{score}</td>
      <td>{team}</td>
    </tr>
  )

  getTeamScoreTableRows = (teamScores) => {
    const teamScoreRows = [];
    forOwn(teamScores, (score, teamName) => {
      teamScoreRows.push(
        <tr className="custom_table_row">
          <td>{teamName}</td>
          <td>{score}</td>
        </tr>,
      );
    });
    return teamScoreRows;
  };

  render() {
    const { leaderBoardData, currentScore, teamScores } = this.props;
    return (
      <div>
        <div className="current_score_container">
          Your score:
          {' '}
          {currentScore}
        </div>
        <br />
        <div className="current_score_container">Team Scores</div>
        <table className="custom_table_style">
          <thead>
            <tr className="custom_table_row">
              <th>Team</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {this.getTeamScoreTableRows(teamScores)}
          </tbody>
        </table>
        <br />
        <div className="current_score_container">Leaderboard</div>
        <table className="custom_table_style">
          <thead>
            <tr className="custom_table_row">
              <th>Player</th>
              <th>Score</th>
              <th>Team </th>
            </tr>
          </thead>
          <tbody>
            {leaderBoardData.map(playerData => this.getLeaderboardTableRow(playerData.playerName, playerData.score, playerData.team))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    );
  }
}

LeaderBoardPage.propTypes = {
  leaderBoardData: PropTypes.array,
  currentScore: PropTypes.number,
  userName: PropTypes.string.isRequired,
  updateLeaderBoard: PropTypes.func.isRequired,
  updateUserScore: PropTypes.func.isRequired,
  updateTeamScores: PropTypes.func.isRequired,
  teamScores: PropTypes.object,
};

LeaderBoardPage.defaultProps = {
  leaderBoardData: [],
  currentScore: 0,
  teamScores: {},
};

const mapStateToProps = ({ user, game }) => ({
  currentScore: user.score,
  userName: user.userName,
  leaderBoardData: game.leaderBoardData,
  teamScores: game.teamScoreData,
});

const mapDispatchToProps = dispatch => ({
  updateLeaderBoard: payload => dispatch(setLeaderboardData(payload)),
  updateUserScore: payload => (dispatch(setUserScore(payload))),
  updateTeamScores: payload => (dispatch(setTeamScoreData(payload))),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardPage);
