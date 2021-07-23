import './MainPage.css';

import React from 'react';

import KuvertForm from './KuvertForm';
import KuvertList from './KuvertList';
import NewKuvertBanner from './NewKuvertBanner';

class MainPage extends React.Component{
  constructor(props) {
    super(props)

    this.state = {newKuvertId: null}
  }

  handleNewKuvertId = (id) => {
    this.setState({ newKuvertId: id.toString() });
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
