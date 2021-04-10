import React from 'react';
import './searchResult.css';
import { Row, Col } from "react-simple-flex-grid";
import Paper from "@material-ui/core/Paper";
import logo from '../images/logo.png';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import App from '../App.js';

// height of the TextField
const height = '5vh'
const width = '70vh'


// magic number which must be set appropriately for height
const labelOffset = -6

// get this from your form library, for instance in
// react-final-form it's fieldProps.meta.active
// or provide it yourself - see notes below
const focused = 2
export default class SearchResult extends React.Component {

  state = {
    mov: "",
    mylist: [],
    mode: "results",
    movies: [],
    searchQuery: ""
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleMode = (selectedMode) => {
    if (selectedMode === "results") {
      this.setState({ mode: "results" });
    } else if (selectedMode === "mylist") {
      this.setState({ mode: "mylist" });
    } else if (selectedMode === "search") {
      this.setState({ mode: "search" });
    } else {
      this.setState({ mode: "reset" });
    }
  }

  handleChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  handleSubmit(event) {
    this.updateQuery();
    this.toggleMode("search");
    event.preventDefault();
  }

  updateQuery = () => {
    // read all entities
    fetch(
      `http://www.omdbapi.com/?s=${this.state.searchQuery}&apikey=11a56ba6&`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          movies: response["Search"]
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
              <h3>Search Results ({this.props.movies.length})</h3>
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
            <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <div>
                  <TextField
                    // label="Search"
                    variant="outlined"
                    /* styles the wrapper */
                    style={{ height, 
                      width, 
                      paddingTop: '10vh',
                    }}
                    /* styles the label component */
                    InputLabelProps={{
                      style: {
                        height,
                        ...(!focused && { top: `${labelOffset}px` }),
                      },
                    }}
                    /* styles the input component */
                    inputProps={{
                      onChange: this.handleChange,
                        style: {
                          height,
                          padding: '0 14px',
                        },
                    }}
                />
                </div>
                  <input type="submit" value="Search" />
              </form>
              <h2>My List</h2>
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
    } else if (this.state.mode === "search") {
      return (
        <>
            <img src={logo} className="App-logo2" alt="logo" />
              <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <div>
                  <TextField
                    // label="Search"
                    variant="outlined"
                    /* styles the wrapper */
                    style={{ height, 
                      width, 
                      paddingTop: '2vh',
                    }}
                    /* styles the label component */
                    InputLabelProps={{
                      style: {
                        height,
                        ...(!focused && { top: `${labelOffset}px` }),
                      },
                    }}
                    /* styles the input component */
                    inputProps={{
                      onChange: this.handleChange,
                        style: {
                          height,
                          padding: '0 14px',
                        },
                    }}
                />
                </div>
                  <input type="submit" value="Search" />
              </form>
          <h3>Search Results ({this.state.movies.length})</h3>
          <Row gutter={30} span={1} style={this.styles.movieColumn}>
            {this.state.movies.map((movie) => (
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
          <hr />
          <h3>My List</h3>
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