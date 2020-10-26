import React from 'react';
import './App.css';

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
      <li class="kuvert-card">
        <h3 onClick={this.handleClick}>{kuvert.title}</h3>
          { this.state.show_state &&
              <div class="kuvert-content">
                {kuvert.content}
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
      <ul id="kuvert-list">
        <h2>Recently Opened</h2>
        {listItems}
      </ul>
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
    this.handleTagChange = this.handleTagChange.bind(this);
  }

  handleSubmit(event) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {content: this.state.content,
         title: this.state.title,
        tag: this.state.tag,
         opening_date: this.state.opening_date})
    };
    fetch('http://localhost:8080/kuvert', requestOptions)
        .then(response => response.json())
        .then(data => this.handleNewKuvert(data.id));
    event.preventDefault();
  }

  handleTagChange(event) {
    this.setState({tag: event.target.value})
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
      <form onSubmit={this.handleSubmit} id="kuvert-form">
        <h2>Preserve Your Prediction</h2>
        <input type="text" name="title" placeholder="Title" onChange={this.handleTitleChange} />
        <input type="text" name="content" placeholder="Content" onChange={this.handleContentChange} />
        <input type="text" name="tag" placeholder="Tag" onChange={this.handleTagChange} />
        <label>
          Opening date: <input type="date" name="opening_date" onChange={this.handleDateChange}/>
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
      </header>
      <KuvertForm />
      <KuvertList />
    </div>
  );
}

export default App;
