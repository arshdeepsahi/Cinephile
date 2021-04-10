import logo from '../images/logo.png';
import React from 'react';
import { Row, Col } from "react-simple-flex-grid";
import Paper from "@material-ui/core/Paper";import Button from '@material-ui/core/Button';

export default class RecommendMovie extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    mylist: this.props.mylist,
  };

  analyzeTopGenre = () => {
      // needs to be implemented
      
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
        return (
            <>
            <img src={logo} className="App-logo2" alt="logo" />
            <h3>Recommended Movies</h3>
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
            </>
        );
    }
}
