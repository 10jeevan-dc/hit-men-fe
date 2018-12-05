import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './HitButton.css';

class HitButton extends Component {
  render() {
    const { hitHandler } = this.props;
    return (
      <div>
        <button className="hit_button" onClick={hitHandler}>Hit!</button>
      </div>
    );
  }
}

HitButton.propTypes = {
  hitHandler: PropTypes.func,
};

HitButton.defaultProps = {
  hitHandler: () => {},
};

export default HitButton;
