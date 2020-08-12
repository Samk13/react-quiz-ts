import { FormControlLabel, FormGroup, Grid, Paper, Switch, Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React, { Fragment, useState } from 'react';
import NavBar from './components/NavBar';

type Props = React.InputHTMLAttributes<HTMLInputElement>& {
  handleChange: (event: string) => string
}
function App() {
  const [ darkMode, setDarkMode] = useState(true)
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light'
    }
  })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked);
  };
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Paper style={{ height: '100vh'}}>
          <Grid container direction="column">
            <Typography variant="subtitle1" align="center">
             This is my App using React TypeScript and material UI
            </Typography>
            <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={handleChange}
                  aria-label="login switch"
                />
              }
              label={darkMode ? "Dark" : "Light"}
            />
          </FormGroup>
          </Grid>
        </Paper>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
