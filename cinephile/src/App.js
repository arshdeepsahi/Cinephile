import logo from './images/logo.png';
import './App.css';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchResult from './components/searchResult.js';


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
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
  }

  state = {
    searchQuery: "",
    movies: [],
    user: "",
    password: "",
    mode: "login"
  };

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

  handleChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  handleSubmit(event) {
    this.updateQuery();
    this.toggleMode("display");
    event.preventDefault();
  }

  handleUserChange(event) {
    this.setState({ user: event.target.value });
  }

  handlePassChange(event) {
    this.setState({ password: event.target.value });
  }

  handleLoginSubmit(event) {
    this.toggleMode("search");
    // event.preventDefault();
  }

  toggleMode = (selectedMode) => {
    if (selectedMode === "search") {
      this.setState({ mode: "search" });
    } else if (selectedMode === "display") {
      this.setState({ mode: "display" });
    } else if (selectedMode === "login") {
      this.setState({ mode: "login" });
    }
  }

  render() {
    console.log(this.props.mylist);
    if (this.state.mode === "search") {
      return (
          <div className="App">
            <header className="App-header">
              <div className="shake">
                <img src={logo} className="App-logo" alt="logo" />
              </div>
              <h3>Hi, {this.state.user}!</h3>
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
            </header>
          </div>
        );
      } else if (this.state.mode === "login") {
        return (
          <div className="App">
              <div className="shake">
                <img src={logo} className="App-logo" alt="logo" />
              </div>
            <div className="movie-results">
            <form noValidate autoComplete="off" onSubmit={this.handleLoginSubmit}>
                <div>
                  <TextField
                    label="Username"
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
                      onChange: this.handleUserChange,
                        style: {
                          height,
                          padding: '0 14px',
                        },
                    }}
                /> 
                <br />
                  <TextField
                    label="Password"
                    type="password"
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
                      onChange: this.handlePassChange,
                        style: {
                          height,
                          padding: '0 14px',
                        },
                    }}
                />
                </div>
                  {/* <input type="submit" value="Search" /> */}
              </form>
              <Button variant="outlined" color="secondary" class="reset" style={{ marginBottom: '2vh' }} size= "large" onClick={() => this.handleLoginSubmit()}>LOGIN</Button>
            </div>
          </div>
        );
      } else {
        return (
          <div className="App">
            <div className="movie-results">
              <SearchResult movies={this.state.movies} />
              {/* <Button variant="outlined" color="secondary" class="reset" style={{ marginBottom: '2vh' }} size= "large" onClick={() => this.toggleMode()}>RESET</Button> */}
            </div>
          </div>
        );
      }
    }
}
