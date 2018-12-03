import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class OpenImage extends Component {

  componentWillMount() {
    document.querySelector('body').classList.add('modal-open');
  }

  componentWillUnmount() {
    document.querySelector('body').classList.remove('modal-open');
  }

  render() {
    return (
      <div className="open-image" >
        <div className="image-container">
          <button className="cancel-button" onClick={this.props.history.goBack} >X</button>
          <a href={`https://images.dog.ceo/breeds/${this.props.match.params.breed}/${this.props.match.params.img}`}>
            <img
              src={`https://images.dog.ceo/breeds/${this.props.match.params.breed}/${this.props.match.params.img}`}
              alt={`https://images.dog.ceo/breeds/${this.props.match.params.breed}/${this.props.match.params.img}`}
            />
          </a>
        </div>
      </div>
    )
  }
}

export default withRouter(OpenImage);
