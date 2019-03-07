import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';

import {connect} from 'react-redux';

import {formatSearch} from '../store/actions/dogActions';
import {getResults} from '../store/actions/dogActions';

import Image from './Image.js';
import OpenImage from './OpenImage.js';

class Results extends Component {

  constructor() {
    super();


    this.updateDisplayed = () => {
      // get length of displayed and pass it as the index of results
      let screenBottom = window.screenY + window.outerHeight;
      if (!this.props.isLoading) {
        let lastImage = document.querySelector('#results-container').lastChild;
        let top = lastImage.getBoundingClientRect().top;

        if (screenBottom >= top) {
          this.props.updateDisplayed(this.props.results.slice(this.props.displayed.length, this.props.displayed.length+12))
        }
      }

    }

  }


  componentDidMount() {
    this.props.getResults(formatSearch(this.props.match.params.breed));
    window.addEventListener('scroll', this.updateDisplayed);
  }


  componentDidUpdate(prevProps) {
    if (this.props.match.params.breed !== prevProps.match.params.breed) {
      this.props.toggleLoading(true);
      this.props.toggle404(false);
      this.props.clearDisplayed();
      this.props.getResults(this.props.match.params.breed);
      window.addEventListener('scroll', this.props.updateDisplayed);
    }
  }

  componentWillUnmount() {
    this.props.clearDisplayed();
    window.removeEventListener('scroll', this.props.updateDisplayed);
  }


  render() {

    if (this.props.isLoading) {

      return <p className="results-paragraph">Loading...</p>;
    } else if (!this.props.is404) {
      return (
        <div id="outer-results-container">
          <p className="results-paragraph">Displaying results for '{this.props.match.params.breed}'</p>
          <div id="results-container" onClick={(e) => e.target.tagName === 'IMG' ? this.props.setOpenImage(e.target.src) : null}>
            {this.props.displayed.map((current, index) => {
              return (
                <Link to={`/search/${this.props.match.params.breed}/${current}`} key={current} >
                  <Image src={current} key={index} />
                </Link>
              )
            })}
          </div>
            <Route path="/search/:breed/https://images.dog.ceo/breeds/:breed/:img" render={(props) => <OpenImage {...props} />} />
        </div>
      )
    } else {
      return <p className="results-paragraph">No results found for '{this.props.match.params.breed}'</p>;
    }


  }

}


const mapStateToProps = (state) => {
  return {
    results: state.results,
    displayed: state.displayed,
    isLoading: state.isLoading,
    is404: state.is404
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    getResults: (breed) => dispatch(getResults(breed)),
    updateDisplayed: (moreResults) => dispatch({type: 'UPDATE_DISPLAYED', payload: moreResults}),
    clearDisplayed: () => dispatch({type: 'CLEAR_DISPLAYED'}),
    toggleLoading: (val) => dispatch({type: 'TOGGLE_LOADING', payload: val}),
    toggle404: (val) => dispatch({type: 'TOGGLE_404', payload: val}),
    setOpenImage: (src) => dispatch({type: 'SET_OPEN_IMAGE', payload: src}),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Results);
