import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TextField, Grid } from '@material-ui/core/';

class Edit extends Component {

    state = {
        title: '',
        description: '',
    }

    // Renders the page with selectMovieSaga and id from route url parameters
    componentDidMount(){
        const movieId = this.props.match.params.movieId
        this.props.dispatch({type:`SELECT_MOVIE`, payload: movieId});
    }

    // Handle TextField change
    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            ...this.state,
            [propertyName]: event.target.value
        })
    }

    // Submit TextField change to sagas and updates movie on save
    submitChange = () => {
        let title = this.state.title;
        let description = this.state.description
        if(title === ''){
            title = this.props.movieRedux.title
        }
        if(description === ''){
            description = this.props.movieRedux.description
        }
        this.props.dispatch({
            type: `UPDATE_MOVIE`, 
            payload: {
                title: this.state.title,
                description: this.state.description,
                id: this.props.match.params.movieId
            }
        });
        this.props.history.push(`/details/${this.props.match.params.movieId}`);
    }

    render(){
        return(
            <Grid>
                <TextField placeholder="Title"
                       onChange={this.handleChangeFor('title')} 
                       defaultValue={this.props.movieRedux.title}/>
                <br/>
                <TextField placeholder="Description"
                       onChange={this.handleChangeFor('description')} 
                       defaultValue={this.props.movieRedux.description}/>
                 <br/>
                 <br/>
                <Button size="small" variant="outlined" onClick={() => 
                    this.props.history.push(`/details/${this.props.match.params.movieId}`)}>
                        Cancel
                </Button>
                &nbsp; &nbsp;
                <Button size="small" variant="outlined" onClick={this.submitChange}>Save</Button>
            </Grid>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    movieRedux: reduxState.genres
  });

export default connect(mapReduxStateToProps)(Edit);