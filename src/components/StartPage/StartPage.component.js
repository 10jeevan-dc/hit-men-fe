import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { getRequest, postRequest } from '../../utils/request.utils';
import { setUserAllocationDetails, userDetailsSet, changeGameState } from '../../redux/actions';
import TextInputButton from './shared/TextInputButton/TextInputButton.component';
import LoaderButton from './shared/LoaderButton/LoaderButton.component';
import './StartPage.css';
import 'react-toastify/dist/ReactToastify.css';

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

  refreshPage = () => {
    window.location.reload();
  }

  onContinue = () => {
    const { isInputFieldActive, inputFieldValue } = this.state;
    const {
      setUserDetails, toggleUserDetailsSet, progressGame,
    } = this.props;
    if (isInputFieldActive) {
      postRequest('allocate/user', {
        userName: inputFieldValue,
      }).then((jsonResponse) => {
        setUserDetails(get(jsonResponse, 'data', {}));
        toggleUserDetailsSet(true);
        getRequest(`start/${inputFieldValue}`).then((jsonEligibilityResponse) => {
          if (get(jsonEligibilityResponse, 'data.canStart', false)) {
            progressGame(2);
          }
        });
      }).catch((error) => {
        toast.error(get(error, 'response.data.message', 'Oops! An unexpected error occured'), {
          onClose: this.refreshPage,
          position: toast.POSITION.BOTTOM_CENTER,
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
        <ToastContainer />
      </div>
    );
  }
}

StartPage.propTypes = {
  setUserDetails: PropTypes.func,
  isUserDetailsSet: PropTypes.bool,
  toggleUserDetailsSet: PropTypes.func,
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
