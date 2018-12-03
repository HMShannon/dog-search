import React, {Component} from 'react';


class Home extends Component {

  constructor() {
    super();

    this.state = {
      dogImage: '',
      dogName: ''
    }

    this.setName = (message) => {
      let imageURL = message;

      let imageSplit = imageURL.split('/');

      let tempDogName = imageSplit[4][0].toUpperCase() + imageSplit[4].slice(1);

      if (tempDogName.includes('-')) {
        let temp = imageSplit[4].split('-');
        let temp1 = temp[1][0].toUpperCase() + temp[1].slice(1);
        let temp0 = temp[0][0].toUpperCase() + temp[0].slice(1);
        tempDogName = `${temp1} ${temp0}`;
      }
      this.setState({
        dogName: tempDogName
      });

    }

  }

  componentWillMount() {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(res => res.json())
      .then(data => {
        this.setState({dogImage: data.message});
        this.setName(data.message);
      })
  }

  render() {
    return (
      <div id="home-content">
        <img className="random-image" src={this.state.dogImage} alt={this.state.dogName} />
        <p>{this.state.dogName}</p>
      </div>
    );
  }
}

export default Home;
