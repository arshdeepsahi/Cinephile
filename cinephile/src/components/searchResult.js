import React from 'react';
import './searchResult.css';
import { Row, Col } from "react-simple-flex-grid";
import Paper from "@material-ui/core/Paper";
import logo from '../images/logo.png';
import Button from '@material-ui/core/Button';
import App from '../App.js';
export default class SearchResult extends React.Component {

  state = {
    mov: "",
    mylist: [],
    mode: "results"
  };

  constructor(props) {
    super(props);
  }

  toggleMode = (selectedMode) => {
    if (selectedMode === "results") {
      this.setState({ mode: "results" });
    } else if (selectedMode === "mylist") {
      this.setState({ mode: "mylist" });
    } else {
      this.setState({ mode: "reset" });
    }
  }


  addToList = (selectedMovie) => {
    if (selectedMovie !== "") {
      fetch(
        `http://www.omdbapi.com/?i=${selectedMovie[0]}&apikey=11a56ba6&`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((response) => {
          selectedMovie.push(response["Genre"]);
          selectedMovie.push(response["Plot"]);
        })
        .catch((err) => {
          console.log(err);
        });
        var movieData = {
          data: selectedMovie,
          key: Date.now()
        };
      this.setState({
          mylist: [...this.state.mylist, movieData]
      });
    }
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
    // const { movies } = this.state;
    if (this.state.mode === "results") {
      return (
          <>
              <img src={logo} className="App-logo2" alt="logo" />
                <Row gutter={30} span={1} style={this.styles.movieColumn}>
                  {this.props.movies.map((movie) => (
                    <Col span={3} style={this.styles.movieColumn} >
                        <Paper style={this.styles.moviePaper}>
                            <img src={`${movie["Poster"]}`} width="80%" alt="Movie Poster" /> 
                            <br />
                            <h4>{movie["Title"]} ({movie["Year"]})</h4>
                            <Button variant="outlined" color="secondary" class="reset" style={{ marginBottom: '2vh' }} size= "large" onClick={() => this.addToList([movie["imdbID"], movie["Title"], movie["Year"], movie["Poster"]])}>Add to List</Button>
                        </Paper>
                    </Col>
                    ))}
                </Row>
                <Button variant="outlined" color="secondary" class="reset" style={{ marginBottom: '2vh' }} size= "large" onClick={() => this.toggleMode("mylist")}>MY LIST</Button>
                <Button variant="outlined" color="secondary" class="reset" style={{ marginBottom: '2vh' }} size= "large" onClick={() => this.toggleMode("reset")}>RESET</Button>
          </>
      );
    } else if (this.state.mode === "mylist"){
      return (
        <>
            <img src={logo} className="App-logo2" alt="logo" />
              <Row gutter={30} span={1} style={this.styles.movieColumn}>
                {this.state.mylist.map((movie) => (
                  <Col span={3} style={this.styles.movieColumn} >
                      <Paper style={this.styles.moviePaper}>
                          <img src={`${movie.data[3]}`} width="80%" alt="Movie Poster" /> 
                          <br />
                          <h4>{movie.data[1]} ({movie.data[2]})</h4>
                          <Button variant="outlined" color="secondary" class="reset" style={{ marginBottom: '2vh' }} size= "large" >Remove from List</Button>
                      </Paper>
                  </Col>
                  ))}
              </Row>
              <Button variant="outlined" color="secondary" class="reset" style={{ marginBottom: '2vh' }} size= "large" onClick={() => this.toggleMode("reset")}>RESET</Button>
        </>
      );
    } else {
      return (
        <App />
      );
    }
  }
}