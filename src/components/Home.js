import React, {Component} from 'react';

import {connect} from 'react-redux';

import {getDog} from '../store/actions/dogActions';

class Home extends Component {

  componentDidMount() {
    this.props.getDog();
  }

  render() {
    return (
      <div id="home-content">
        <img className="random-image" src={this.props.dogImage} alt={this.props.dogName} />
        <p>{this.props.dogName}</p>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    dogImage: state.dogImage,
    dogName: state.dogName
  };
}


const mapDispatchToProps = (dispatch) => {
  return {
    getDog: () => dispatch(getDog())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
