import { Link } from 'react-router-dom';
import React from 'react';
import './MainPage.css';
import KuvertForm from './KuvertForm';
import KuvertList from './KuvertList';

class NewKuvertBanner extends React.Component {
  render() {
    return (
      this.props.newKuvertId &&
        <span id="new-kuvert-banner">
          Your new kuvert is at: <Link to={"/kuvert/"+this.state.newKuvertId}> {this.state.newKuvertId} </Link>
        </span>
    )
  }
}

class MainPage extends React.Component{
  constructor(props) {
    super(props)

    this.state = {newKuvertId: null}
  }

  handleNewKuvertId = (id) => {
    this.setState({ newKuvertId: id });
  }

  render() {
    return (
      <div>
        <NewKuvertBanner newKuvertId={this.state.newKuvertId} />
        <KuvertForm handleNewKuvert={this.handleNewKuvertId} />
        <KuvertList />
      </div>
    );
  }
}

export default MainPage;
