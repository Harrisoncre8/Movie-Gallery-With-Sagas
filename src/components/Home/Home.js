import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {

    componentDidMount(){
        this.props.dispatch({type:`GET_MOVIE`});
    }

    handleClick = () => {
        this.props.history.push('/details');
    }

  render() {
    return (
      <div>
           {this.props.movieList.map((item,i) => 
                    <div key={i}>
                        <br/>
                        {item.title}
                        <br/>
                        <img src={item.poster} alt='Popular movie' onClick={this.handleClick}/>
                        <br/>
                        {item.description}</div>
                )}
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
    movieList: reduxState.movies
});

export default connect(mapReduxStateToProps)(Home);