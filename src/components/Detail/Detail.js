import React, { Component } from 'react';
import { connect } from 'react-redux';

class Detail extends Component {

  // renders the page with selectMovieSaga and id from route url parameters
  componentDidMount(){
    const movieId = this.props.match.params.movieId
    this.props.dispatch({type:`SELECT_MOVIE`, payload: movieId});
  }

  render() {
    return (
      <div>
        {this.props.movieRedux.map((detailItem,i) => 
        <div key={i}>
          <h2>Title: {detailItem.title}</h2>
          <img src={detailItem.poster} alt="Popular movie"/>
          <p>{detailItem.description}</p>
          <p>Genre: {detailItem.name}</p>
        </div>
        )}
        <button onClick={() => this.props.history.push('/')}>Back to List</button>
        <button>Edit</button>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  movieRedux: reduxState.genres
});

export default connect(mapReduxStateToProps)(Detail);