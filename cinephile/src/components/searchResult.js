import React from 'react';
import './searchResult.css';
import { Row, Col } from "react-simple-flex-grid";
import Paper from "@material-ui/core/Paper";
import logo from '../images/logo.png';
import Button from '@material-ui/core/Button';
export default class SearchResult extends React.Component {

  state = {
    mov: "",
    movies: [],
  };

  constructor(props) {
    super(props);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.setState({
    //   movies: this.props.movies
    // });
  }

  addToList = (param1) => {
    if (param1 !== "") {
      var newItem = {
        text: param1,
        key: Date.now()
      };
   
      this.setState((prevState) => {
        return { 
          movies: prevState.movies.concat(newItem) 
        };
      });
    }
    console.log(this.state.movies);
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
      return (
          <>
              <img src={logo} className="App-logo2" alt="logo" />
                <Row gutter={30} span={1} style={this.styles.movieColumn}>
                  {this.props.movies.map((movie) => (
                    //console.log(movie["Title"])
                    <Col span={3} style={this.styles.movieColumn} >
                        <Paper style={this.styles.moviePaper}>
                            <img src={`${movie["Poster"]}`} width="80%" alt="Movie Poster" /> 
                            <br />
                            <h4>{movie["Title"]} ({movie["Year"]})</h4>
                            <Button variant="outlined" color="secondary" class="reset" style={{ marginBottom: '2vh' }} size= "large" onClick={() => this.addToList(movie["Title"])}>Add to List</Button>
                        </Paper>
                    </Col>
                    ))}
                </Row>
          </>
      );
  }
}