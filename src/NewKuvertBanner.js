import React from 'react';
import { Link } from 'react-router-dom';

class NewKuvertBanner extends React.Component {
  render() {
    return (
      this.props.newKuvertId &&
        <span id="new-kuvert-banner">
          Your new kuvert is at: <Link to={"/kuvert/"+this.props.newKuvertId}> {this.props.newKuvertId} </Link>
        </span>
    )
  }
}

export default NewKuvertBanner;
