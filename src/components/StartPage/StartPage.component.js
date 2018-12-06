import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { getRequest, postRequest } from '../../utils/request.utils';
import { setUserAllocationDetails, userDetailsSet, changeGameState } from '../../redux/actions';
import TextInputButton from './shared/TextInputButton/TextInputButton.component';
import LoaderButton from './shared/LoaderButton/LoaderButton.component';
import './StartPage.css';

class StartPage extends Component {
  state={
    isInputFieldActive: false,
    inputFieldValue: '',
    alowPlay: false,
  }

  activateInputField = () => {
    this.setState({
      isInputFieldActive: true,
    });
  }

  updateInputFieldValue = (event) => {
    const inputFieldValue = event.target.value;
    this.setState({
      inputFieldValue,
      alowPlay: !!inputFieldValue,
    });
  }

  onContinue = () => {
    const { isInputFieldActive, inputFieldValue } = this.state;
    const {
      setUserDetails, toggleUserDetailsSet, progressGame,
    } = this.props;
    if (isInputFieldActive) {
      postRequest('allocate/user', {
        userName: inputFieldValue,
      }).then(response => response.json()).then((jsonResponse) => {
        setUserDetails(jsonResponse);
        toggleUserDetailsSet(true);
        getRequest(`start/${inputFieldValue}`).then(eligibilityResponse => eligibilityResponse.json()).then((jsonEligibilityResponse) => {
          if (get(jsonEligibilityResponse, 'canStart', false)) {
            progressGame(2);
          }
        });
      });
    }
  }

  render() {
    const { isInputFieldActive, inputFieldValue, alowPlay } = this.state;
    const { isUserDetailsSet } = this.props;
    return (
      <div className="start_page_container">
        <TextInputButton
          isInputFieldActive={isInputFieldActive}
          inputFieldValue={inputFieldValue}
          updateInputFieldValue={this.updateInputFieldValue}
          activateInputField={this.activateInputField}
        />
        {
          isInputFieldActive && (
          <LoaderButton
            onClick={this.onContinue}
            clickEnabled={alowPlay}
            checked={isUserDetailsSet}
          />
          )
        }
      </div>
    );
  }
}

StartPage.propTypes = {
  setUserDetails: PropTypes.func,
  isUserDetailsSet: PropTypes.bool,
  toggleUserDetailsSet: PropTypes.func,
  userName: PropTypes.string.isRequired,
  progressGame: PropTypes.func,
};

StartPage.defaultProps = {
  setUserDetails: () => {},
  isUserDetailsSet: false,
  toggleUserDetailsSet: () => {},
  progressGame: () => {},
};

const mapStateToProps = ({ game, user }) => ({
  isUserDetailsSet: game.isUserDetailsSet,
  userName: user.userName,
});

const mapDispatchToProps = dispatch => ({
  setUserDetails: payload => dispatch(setUserAllocationDetails(payload)),
  toggleUserDetailsSet: payload => dispatch(userDetailsSet(payload)),
  progressGame: payload => dispatch(changeGameState(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
