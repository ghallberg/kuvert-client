import React from 'react';

class KuvertPage extends React.Component{
  constructor(props) {
    super(props)

    this.kuvertId = this.props.match.params.kuvertId;

    this.state = {kuvert: null,
                  isLoaded: false,
                  error:  null};
  }

  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch('http://localhost:8080/kuvert/' + this.kuvertId, requestOptions)
      .then(response => response.json())
      .then((data) => {
        if (data.kuvert) {
          this.setState({
            kuvert: data.kuvert,
            isLoaded: true
          })
        } else {
          this.setState({
            error: data.error,
            isLoaded: true
          })
        }
      })
      .catch(
        this.setState({
          error: "Unkown error. Maybe try again?",
          isLoaded: true
        })
      );
  }

  render() {
    const { kuvert, isLoaded, error } = this.state;
    if (isLoaded && kuvert) {
      return (
        <div>
          <div className="KuvertPage">
            <h1>
              {kuvert.title} - {kuvert.opening_date}
            </h1>
            {kuvert.content
                ? <p>Content: {kuvert.content}</p>
                : <p>NOT OPENED YET!</p> }

            <p>Created at: {kuvert.created_at}</p>
          </div>
        </div>
      )
    } else if (isLoaded && error) {
      return (
        <p> {error} </p>
      )
    } else {
      return(<p> LOADING </p>)
    }
  }
}

export default KuvertPage;
