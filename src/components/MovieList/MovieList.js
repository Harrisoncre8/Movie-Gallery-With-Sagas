import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieItem from '../MovieItem/MovieItem';

class MovieList extends Component {

  render() {
    return (
      <div>
           {this.props.movieRedux.map((item) => { 
               return(
                   <MovieItem key={item.id} item={item}/>
               );
           })}
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
    movieRedux: reduxState.movies
});


export default connect(mapReduxStateToProps)(MovieList);