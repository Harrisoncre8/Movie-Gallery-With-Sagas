import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
// Material UI
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, Typography } from '@material-ui/core/';

// Material UI theme
const styles = theme => ({
    card: {
      maxWidth: 300,
      padding: theme.spacing.unit * 5,
      marginLeft: theme.spacing.unit * 3.5,
      margin: theme.spacing.unit * 1.5
    },
    media: {
      height: 0,
      paddingTop: '120%', // 16:9
    },
  });

class MovieItem extends Component { 
       
 // Click sends selected movie_id to saga and goes to Detail component
 handleClick = () => {
    this.props.dispatch({type:`SELECT_MOVIE`, payload: this.props.item.id});
    this.props.history.push('/details/' + this.props.item.id);
}

  render() {
    const { classes } = this.props;

    const movieTitle = this.props.item.title;
    const moviePoster = this.props.item.poster;
    const movieDescription = this.props.item.description;
    return (
      <Card className={classes.card} >
        <CardHeader title={movieTitle}/>
          <CardMedia className={classes.media} image={moviePoster} onClick={this.handleClick} />
          <br/>
          <div>
          <Typography>{movieDescription}</Typography>
          </div>
      </Card>
    );
  }
}


export default withStyles(styles)(connect()(withRouter(MovieItem)));