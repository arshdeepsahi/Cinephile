import logo from './images/logo.png';
import './App.css';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

// height of the TextField
const height = '5vh'

// magic number which must be set appropriately for height
const labelOffset = -6

// get this from your form library, for instance in
// react-final-form it's fieldProps.meta.active
// or provide it yourself - see notes below
const focused = 2

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="shake">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <form noValidate autoComplete="off">
          <div>
            <TextField
              label="Search"
              variant="outlined"
              
              /* styles the wrapper */
              style={{ height }}

              /* styles the label component */
              InputLabelProps={{
                style: {
                  height,
                  ...(!focused && { top: `${labelOffset}px` }),
                },
              }}

              /* styles the input component */
              inputProps={{
                  style: {
                    height,
                    padding: '0 14px',
                  },
              }}
          />
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;
