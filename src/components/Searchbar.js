import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

import Autosuggest from './Autosuggest.js';

class Searchbar extends Component {

  constructor() {
    super();


    this.onSubmit = (e) => {
      e.preventDefault();
      if (this.props.searchInput === '') {
        return;
      } else {
        this.props.history.push(`/search/${this.props.searchInput}`);
        this.props.resetSearch();
      }
    }

  }




  render() {
    return (
      <div className="flex-container" id="search-block">
        <form id="search-form" onSubmit={this.onSubmit}>
          <input
            type="text"
            id="main-searchbar"
            placeholder="Search by breed"
            autoComplete="off"
            value={this.props.searchInput}
            onChange={(e) => {
              this.props.updateSearch(e);
              this.props.focusSearch();
            }}
            onBlur={this.props.blurSearch}
          />
          <button type="submit" id="search-button"></button>
        </form>
        <Autosuggest />
      </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    searchInput: state.searchInput
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSearch: (e) => {
      dispatch({type: 'CHANGE_SEARCH_INPUT', payload: e.target.value});
    },
    resetSearch: () => dispatch({type: 'CLEAR_SEARCH_INPUT'}),
    focusSearch: () => dispatch({type: 'FOCUS_SEARCH'}),
    blurSearch: () => dispatch({type: 'BLUR_SEARCH'})
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Searchbar));
