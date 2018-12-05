import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './LoaderButton.scss';

class LoaderButton extends Component {
  render() {
    const { onClick, clickEnabled, checked } = this.props;
    return (
      <div className={styles.loader_button_container}>
        <input id="mycheckbox" type="checkbox" onClick={onClick} disabled={!clickEnabled || checked} />
        <label htmlFor="mycheckbox" />
      </div>
    );
  }
}

LoaderButton.propTypes = {
  onClick: PropTypes.func,
  clickEnabled: PropTypes.bool,
  checked: PropTypes.bool,
};

LoaderButton.defaultProps = {
  onClick: () => {},
  clickEnabled: false,
  checked: false,
};

export default LoaderButton;
