import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import fetchBreeds from '../store/actions/dogActions';

import Home from './Home.js';
import Header from './Header.js';
import Searchbar from './Searchbar.js';
import Footer from './Footer.js';
import Results from './Results.js';
import NotFound from './NotFound.js';


class App extends Component {


  componentDidMount() {
    this.props.fetchBreeds();
  }


  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header></Header>
          <Searchbar />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/?" exact render={() => <Redirect to="/" exact /> } />
            <Route path="/search/:breed" render={(props) => <Results {...props} />} />
            <Route component={NotFound} />
          </Switch>

          <Footer></Footer>
        </div>
      </BrowserRouter>
    );
  }
}


const mapStateToProps = (state) => {
  return {};
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchBreeds: () => dispatch(fetchBreeds())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
