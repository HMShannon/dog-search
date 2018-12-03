import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Home from './Home.js';
import Header from './Header.js';
import Searchbar from './Searchbar.js';
import Footer from './Footer.js';
import Results from './Results.js';
import NotFound from './NotFound.js';


class App extends Component {

  constructor() {
    super();

    this.state = {
      searchInput: '',
      breedList: [],
      searchFocus: false
    }


    this.updateSearch = (e) => {
      if (e.target.tagName == 'LI') {
        this.setState({searchInput: e.target.textContent});
      } else {
        this.setState({
          searchInput: e.target.value
        });
      }
    }


    this.resetSearch = () => {
      this.setState({
        searchInput: ''
      });
    }


    this.focusSearch = () => {
      this.setState({searchFocus: true});
    }


    this.blurSearch = () => {
      this.setState({searchFocus: false});
    }

  }

  componentWillMount() {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((res) => res.json())
      .then((data) => {
        let dogArray = [];
        for (let key in data.message) {
          if (data.message[key].length === 0) {
            dogArray.push(key);
          } else {
            for (let i = 0; i < data.message[key].length; i++) {
              dogArray.push(`${data.message[key][i]} ${key}`);
            }
          }
        }
        this.setState({breedList: dogArray});
    })
  }


  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header></Header>
          <Searchbar
            updateSearch={this.updateSearch}
            searchInput={this.state.searchInput}
            onSubmit={this.onSubmit}
            resetSearch={this.resetSearch}
            getResults={this.getResults}
            breedList={this.state.breedList}
            searchFocus={this.state.searchFocus}
            focusSearch={this.focusSearch}
            blurSearch={this.blurSearch}
           />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/?" exact render={() => <Redirect to="/" exact /> } />
            <Route path="/search/:breed" render={(props) => <Results breed={this.state.searchInput} openImage={this.openImage} closeImage={this.closeImage} {...props} />} />
            <Route component={NotFound} />
          </Switch>

          <Footer></Footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
