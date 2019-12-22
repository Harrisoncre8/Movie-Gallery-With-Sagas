import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'

class MovieItem extends Component { 
       
 // Click sends selected movie_id to saga and goes to Detail component
 handleClick = () => {
    this.props.dispatch({type:`SELECT_MOVIE`, payload: this.props.item.id});
    this.props.history.push('/details/' + this.props.item.id);
}

  render() {
    const movieTitle = this.props.item.title;
    const moviePoster = this.props.item.poster;
    const movieDescription = this.props.item.description;
    return (
      <div>
          <h2>{movieTitle}</h2>
          <div>
          <img src={moviePoster} alt='Popular movie' onClick={this.handleClick} />
          <p>{movieDescription}</p>
          </div>
      </div>
    );
  }
}


export default connect()(withRouter(MovieItem));