import React from 'react';

class KuvertForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {title: '', content: '', tag: '', opening_date: null};

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
        .then(data => this.props.handleNewKuvert(data.id));
    event.preventDefault();
    this.setState({
      title: '',
      content: '',
      tag: '',
      opening_date: null
    });
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

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="kuvert-form">
        <h2>Preserve Your Prediction</h2>
        <input id="titleInput" type="text" name="title" placeholder="Title" onChange={this.handleTitleChange} value = {this.state.title} />
        <input id="contentInput" type="text" name="content" placeholder="Content" onChange={this.handleContentChange} value={this.state.content} />
        <input id="tagInput" type="text" name="tag" placeholder="Tag" onChange={this.handleTagChange} value={this.state.tag} />
        <label>
          Opening date: <input id = "openingDateInput" type="date" name="opening_date" onChange={this.handleDateChange} value={this.state.opening_date} />
        </label>
        <input id="submitButton" type="submit" value="submit" />
      </form>
    );
  }
}

export default KuvertForm;
