import React, { Component } from 'react';
import { connect } from 'react-redux';

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

    // Handle input change
    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            ...this.state,
            [propertyName]: event.target.value
        })
    }

    // Submit input change to sagas
    submitChange = () => {
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
            <div>
                <input placeholder="Title"
                       onChange={this.handleChangeFor('title')} 
                       defaultValue={this.props.movieRedux.title}/>
                <input placeholder="Description"
                       onChange={this.handleChangeFor('description')} 
                       defaultValue={this.props.movieRedux.description}/>

                <button onClick={() => 
                    this.props.history.push(`/details/${this.props.match.params.movieId}`)}>
                        Cancel
                </button>
                <button onClick={this.submitChange}>Save</button>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    movieRedux: reduxState.genres
  });

export default connect(mapReduxStateToProps)(Edit);