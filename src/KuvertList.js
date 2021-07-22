import React from 'react';

class KuvertCard extends React.Component {
  state = {
    show_state: false
  };

  handleClick = () => {
    this.setState({
      show_state: !this.state.show_state
    });
  }

  render() {
    const kuvert = this.props.kuvert;

    return(
      <li className="kuvert-card">
        <h3 onClick={this.handleClick}>{kuvert.title} - {kuvert.opening_date}</h3>
          { this.state.show_state &&
              <div className="kuvert-content">
                <p>{kuvert.content}</p>
                <p>Created at: {kuvert.created_at}</p>
              </div>
          }
      </li>);
  }
}

class KuvertList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {kuvert: []}
  }

  componentDidMount() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    fetch(process.env.REACT_APP_SERVER_URL+'/kuvert/open', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({kuvert: data.kuvert}));
  }

  render() {
    const listItems = this.state.kuvert.map((kuvert) =>
      <KuvertCard kuvert={kuvert} />
    );

    return (
      <ul id="kuvert-list">
        <h2>Recently Opened</h2>
        {listItems}
      </ul>
    )
  }
}

export default KuvertList;
