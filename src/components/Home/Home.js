import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieList from '../MovieList/MovieList';

class Home extends Component {

    // Mounts movies to Home Component from DB
    componentDidMount(){
        this.props.dispatch({type:`GET_MOVIE`});
    }

  render() {
    return (
      <div>
           <MovieList />
      </div>
    );
  }
}

export default connect()(Home);