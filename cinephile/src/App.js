import logo from './images/logo.png';
import './App.css';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


// height of the TextField
const height = '5vh'
const width = '70vh'


// magic number which must be set appropriately for height
const labelOffset = -6

// get this from your form library, for instance in
// react-final-form it's fieldProps.meta.active
// or provide it yourself - see notes below
const focused = 2

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    searchQuery: "",
    history: [],
    moviePoster: "",
    movieTitle: "",
    movieGenre: "",
    movieRuntime: "",
    moviePlot: "",
    movieYear: "",
    movieImdbRating: "",
    mode: "search"
  };

  updateQuery = () => {
    // read all entities
    fetch(
      `http://www.omdbapi.com/?t=${this.state.searchQuery}&apikey=11a56ba6&`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        console.log(response["Title"]);
        this.setState({
          moviePoster: response["Poster"],
          movieTitle: response["Title"],
          movieGenre: response["Genre"],
          movieRuntime: response["Runtime"],
          moviePlot: response["Plot"],
          movieYear: response["Year"],
          movieImdbRating: response["imdbRating"],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  handleSubmit(event) {
    this.updateQuery();
    this.toggleMode();
    event.preventDefault();
  }

  toggleMode = () => {
    if (this.state.mode == "search") {
      this.setState({ mode: "display" })
    } else {
      this.setState({ mode: "search" })
    }
  }

  render() {

    if (this.state.mode === "search") {
      return (
          <div className="App">
            <header className="App-header">
              <div className="shake">
                <img src={logo} className="App-logo" alt="logo" />
              </div>
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
                  <input type="submit" value="Submit" />
              </form>
            </header>
          </div>
        );
      } else {
        return (
          <div className="App">
          <header className="App-header">
            <img src={`${this.state.moviePoster}`} alt="Movie Poster" />
            <h1>{this.state.movieTitle} ({this.state.movieYear})</h1>
            <p>{this.state.movieGenre}</p>
            <p class="description">{this.state.moviePlot}</p>
            <h3>{this.state.movieImdbRating}</h3>
            <Button variant="outlined" color="secondary" class="reset" style={{ marginBottom: '2vh' }} size= "large" onClick={() => this.toggleMode()}>RESET</Button>
          </header>
        </div>
        );
      }
    }
}
