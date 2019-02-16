import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import Autosuggest from './Autosuggest.js';

class Searchbar extends Component {

  constructor() {
    super();



    this.onSubmit = (e) => {
      e.preventDefault();
      if (this.props.searchInput === '') {
        this.props.history.push(this.props.history[this.props.history.length-1]);
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
            value={this.props.searchInput}
            onChange={(e) => {
              this.props.updateSearch(e);
              this.props.focusSearch();
            }}
            onBlur={this.props.blurSearch}
          />
          <button type="submit" id="search-button"></button>
        </form>
        <Autosuggest searchInput={this.props.searchInput} breedList={this.props.breedList} searchFocus={this.props.searchFocus} updateSearch={this.props.updateSearch} />
      </div>
    )
  }

}

export default withRouter(Searchbar);
