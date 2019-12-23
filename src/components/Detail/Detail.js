import React, { Component } from 'react';
import { connect } from 'react-redux';
// material UI
import { Button, Grid } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});


class Detail extends Component {

  // Renders the page with selectMovieSaga and id from route url parameters on load
  componentDidMount(){
    const movieId = this.props.match.params.movieId
    this.props.dispatch({type:`SELECT_MOVIE`, payload: movieId});
  }

  render() {
    return (
      <Grid container justify='center' alignContent='center'>
        {this.props.movieRedux.map((detailItem,i) => 
        <div key={i}>
          <h2>{detailItem.title}</h2>
          <img src={detailItem.poster} alt={detailItem.title}/>
          <p>{detailItem.description}</p>
          <p>Genre: {detailItem.name}</p>
        </div>
        )}

        <Grid>
        <Button size="small" variant="outlined" 
                onClick={() => this.props.history.push('/')}>Back to List</Button>
        &nbsp; &nbsp;
        <Button size="small" variant="outlined" onClick={() => 
          this.props.history.push(`/edit/${this.props.match.params.movieId}`)}>
            Edit
        </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
  movieRedux: reduxState.genres
});

export default withStyles(styles)(connect(mapReduxStateToProps)(Detail));