import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieItem from '../MovieItem/MovieItem';
import { Grid } from '@material-ui/core';

class MovieList extends Component {

  render() {
    return (
      <Grid container style={{backgroundColor: '#eceff1'}}>
           {this.props.movieRedux.map((item) => { 
               return(
                   <MovieItem key={item.id} item={item}/>
               );
           })}
      </Grid>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
    movieRedux: reduxState.movies
});


export default connect(mapReduxStateToProps)(MovieList);