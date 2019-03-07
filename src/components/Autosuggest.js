import React, {Component} from 'react';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Autosuggest extends Component {
  constructor() {
    super();


    this.onSelect = (e) => {
      e.preventDefault();
      this.props.resetSearch();
      this.props.history.push(`/search/${e.target.textContent}`);
    }

  }


  render() {
    if (this.props.searchInput === '' || !this.props.searchFocus) {
      return null;
    } else {
      return (
        <ul id="auto-suggest">
          {this.props.breedList.filter((current) => {
            if (current.startsWith(this.props.searchInput) || (current.split(' ').length > 1 && current.split(' ')[1].startsWith(this.props.searchInput))) {
              return current;
            } else {
              return null;
            }
          }).slice(0, 10).map((current) => {
            return <li className="search-suggestion" data-value={current} key={current} onMouseDown={this.onSelect}>{current}</li>;
          })}
        </ul>
      )
    }
  }

}


const mapStateToProps = (state) => {
  return {
    searchInput: state.searchInput,
    searchFocus: state.searchFocus,
    breedList: state.breedList
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    updateSearch: (e) => dispatch({type: 'CHANGE_SEARCH_INPUT', payload: e.target.textContent}),
    resetSearch: () => dispatch({type: 'CLEAR_SEARCH_INPUT'}),
    focusSearch: () => dispatch({type: 'FOCUS_SEARCH'})
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Autosuggest));
