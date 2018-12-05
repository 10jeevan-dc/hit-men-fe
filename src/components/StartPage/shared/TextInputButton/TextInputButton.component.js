import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TextInputButton.css';

class TextInputButton extends Component {
  render() {
    const {
      isInputFieldActive,
      inputFieldValue,
      updateInputFieldValue,
      activateInputField,
    } = this.props;
    return (
      <div className="button_with_text">
        <button
          className={isInputFieldActive ? 'button_invisible' : 'button_visible'}
          onClick={activateInputField}
        >
            Start
        </button>
        <div className={isInputFieldActive ? 'slider slider-active' : 'slider'}>
          <input
            type="text"
            value={inputFieldValue}
            onChange={updateInputFieldValue}
            placeholder="Please enter your name"
            className="slider_input_field"
          />
        </div>
      </div>
    );
  }
}

TextInputButton.propTypes = {
  isInputFieldActive: PropTypes.bool,
  inputFieldValue: PropTypes.string,
  updateInputFieldValue: PropTypes.func,
  activateInputField: PropTypes.func,
};

TextInputButton.defaultProps = {
  isInputFieldActive: false,
  inputFieldValue: '',
  updateInputFieldValue: () => {},
  activateInputField: () => {},
};

export default TextInputButton;
