import React from 'react';
import './App.css';

class KuvertCard extends React.Component {
  render() {
    const kuvert = this.props.kuvert;
    return( <li>{kuvert.title} {kuvert.content}</li>);
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
    fetch('http://localhost:8080/kuvert/open', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({kuvert: data.kuvert}));
  }

  render() {
    console.log(this.state);
    const listItems = this.state.kuvert.map((kuvert) =>
      <KuvertCard kuvert={kuvert} />
    );

    return (
    <div>
      <h2>Open Kuvert</h2>
    <ul>
      {listItems}
    </ul>
    </div>
    )
  }
}

class KuvertForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {content: '', opening_date: null}

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleOwnerChange = this.handleOwnerChange.bind(this);
  }

  handleSubmit(event) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {content: this.state.content,
         title: this.state.title,
        owner: this.state.owner,
         opening_date: this.state.opening_date})
    };
    fetch('http://localhost:8080/kuvert', requestOptions)
        .then(response => response.json())
        .then(data => this.handleNewKuvert(data.id));
    event.preventDefault();
  }

  handleOwnerChange(event) {
    this.setState({owner: event.target.value})
  }

  handleContentChange(event) {
    this.setState({content: event.target.value})
  }

  handleDateChange(event) {
    this.setState({opening_date: event.target.value})
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value})
  }

  handleNewKuvert(id) {
    console.log(id)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>New Kuvert</h2>
        <label>
          Title:
          <input type="text" name="title" onChange={this.handleTitleChange} />
        </label>
        <label>
          Content:
          <input type="text" name="content" onChange={this.handleContentChange} />
        </label>
        <label>
          Owner:
          <input type="text" name="owner" onChange={this.handleOwnerChange} />
        </label>
        <label>
          Opening date:
          <input type="date" name="opening_date" onChange={this.handleDateChange}/>
        </label>
        <input type="submit" value="submit" />
      </form>
    );
  }
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> KUVERT </h1>
        <KuvertForm />
        <KuvertList />
      </header>
    </div>
  );
}

export default App;
