import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';

import Image from './Image.js';
import OpenImage from './OpenImage.js';

class Results extends Component {

  constructor() {
    super();

    this.state = {
      results: [],
      displayed: [],
      isLoading: true,
      is404: false
    }


    this.getResults = (breed) => {
      let breedToSearch = breed;
      if (breedToSearch.split(' ').length != 1) {
        let tempBreed = breedToSearch.split(' ')[breedToSearch.split(' ').length-1];
        for (let i = 0; i < breedToSearch.split(' ').length-1; i++) {
          tempBreed += `-${breedToSearch.split(' ')[i]}`;
        }
        breedToSearch = tempBreed;
      }
      fetch(`https://dog.ceo/api/breed/${breedToSearch}/images`)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else if (res.status == 404) {
            this.setState({is404: true});
          }
        })
        .then(data => {
          if (data) {
            this.setState({
            results: data.message,
            displayed: data.message.slice(0, 12),
            isLoading: false
          })
        }
      })
        .catch((error) => console.log('There was a problem: ', error.message));
    }


    this.updateDisplayed = () => {
      // get length of displayed and pass it as the index of results
      let screenBottom = window.screenY + window.outerHeight;
      if (!this.state.isLoading) {
        let lastImage = document.querySelector('#results-container').lastChild;
        let top = lastImage.getBoundingClientRect().top;

        if (screenBottom >= top) {
          this.setState({
            displayed: [...this.state.displayed, ...this.state.results.slice(this.state.displayed.length, this.state.displayed.length+12)]
          });
        }
      }

    }

  }


  componentWillMount() {
    this.getResults(this.props.match.params.breed);
    window.addEventListener('scroll', this.updateDisplayed);
  }


  componentDidUpdate(prevProps) {
    if (this.props.match.params.breed != prevProps.match.params.breed) {
      this.setState({
        isLoading: true
      });
      this.getResults(this.props.match.params.breed);
      window.addEventListener('scroll', this.updateDisplayed);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateDisplayed);
  }

  render() {

    if (this.state.isLoading) {
      return <p>Loading...</p>;
    } else if (!this.state.is404) {
      return (
        <div id="outer-results-container">
          <p id="displaying-results">Displaying results for '{this.props.match.params.breed}'</p>
          <div id="results-container">
            {this.state.displayed.map((current, index) => {
              return (
                <Link to={`/search/${this.props.match.params.breed}/${current}`} key={current} >
                  <Image src={current} key={index} />
                </Link>
              )
            })}
          </div>
            <Route path="/search/:breed/https://images.dog.ceo/breeds/:breed/:img" render={(props) => <OpenImage src={this.state.openImage} {...props} />} />
        </div>
      )
    } else {
      return <p>No results found for '{this.props.match.params.breed}'</p>;
    }


  }

}

export default Results;
