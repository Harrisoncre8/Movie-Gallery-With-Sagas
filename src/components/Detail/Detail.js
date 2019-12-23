import React, { Component } from 'react';
import { connect } from 'react-redux';

class Detail extends Component {

  // Renders the page with selectMovieSaga and id from route url parameters on load
  componentDidMount(){
    const movieId = this.props.match.params.movieId
    this.props.dispatch({type:`SELECT_MOVIE`, payload: movieId});
  }

  render() {
    return (
      <div>
        {this.props.movieRedux.map((detailItem,i) => 
        <div key={i}>
          <h2>{detailItem.title}</h2>
          <img src={detailItem.poster} alt={detailItem.title}/>
          <p>{detailItem.description}</p>
          <p>Genre: {detailItem.name}</p>
        </div>
        )}
        <button onClick={() => this.props.history.push('/')}>Back to List</button>
        <button onClick={() => 
          this.props.history.push(`/edit/${this.props.match.params.movieId}`)}>
            Edit
        </button>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  movieRedux: reduxState.genres
});

export default connect(mapReduxStateToProps)(Detail);