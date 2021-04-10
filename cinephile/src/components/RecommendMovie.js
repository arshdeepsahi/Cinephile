import logo from '../images/logo.png';
import './RecommendMovie.css';
import React from 'react';
import { Row, Col } from "react-simple-flex-grid";
import Paper from "@material-ui/core/Paper";import Button from '@material-ui/core/Button';

export default class RecommendMovie extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    mylist: this.props.mylist,
    topGenre: "",
    movieSuggestions: []
  };

  mostOccurrences = (arr) => {
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
}

  analyzeTopGenre = () => {
      // needs to be implemented
      var genres = []
      var arr = []
      this.state.mylist.forEach((movie) => {
          arr = movie.data[4].split(",");
          for (var i = 0; i < arr.length; i++) {
            genres.push(arr[i]);
          }
      });
      var mostCommonGenre = this.mostOccurrences(genres);
      this.getSuggestion(mostCommonGenre);
  }

  getSuggestion = (topGenre) => {
    // read all entities
    var suggestedMovie = "";
    if (topGenre === "Comedy") {
        suggestedMovie = "Superbad";
    } else if (topGenre === "Romance") {
        suggestedMovie = "The Notebook";
    } else {
        suggestedMovie = "Avengers";
    } 

    fetch(
      `http://www.omdbapi.com/?t=${suggestedMovie}&apikey=11a56ba6&`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.setState({
          movieSuggestions: [response["Title"], response["Year"], response["Poster"], response["Plot"], response["imdbRating"]]
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  styles = {
    header: {
      boxShadow: "1px 2px 4px 2px grey",
    },
    moviePaper: {
      backgroundColor: "transparent", 
      verticalAlign: "middle",
      textAlign: "center",
      margin: 1,
      width: "15vw",
      border: "solid 3px",
      borderColor: "black",
      borderImageSlice: 1,
      boxShadow: "1px 3px 1px grey"
    },
    movieColumn: {
      display: "flex",
    },
  }

  render() {
      this.analyzeTopGenre();
        return (
            <>
            <img src={logo} className="App-logo2" alt="logo" />
            <h3>Recommended Movie</h3>
                <center>
                    <Paper style={this.styles.moviePaper}>
                        <img src={`${this.state.movieSuggestions[2]}`} width="80%" alt="Movie Poster" /> 
                        <br />
                        <h4>{this.state.movieSuggestions[0]} ({this.state.movieSuggestions[1]})</h4>
                        <p>{this.state.movieSuggestions[3]}</p>
                        <h5>{this.state.movieSuggestions[4]}</h5>
                    </Paper>     
                </center>
            </>
        );
    }
}
