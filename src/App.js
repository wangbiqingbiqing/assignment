import Grid from "@material-ui/core/Grid/Grid";
import React, {Component} from 'react';
import './App.css';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Router from "react-router/es/Router";
import WelcomePage from "./components/WelcomePage";
import BottomBarCon from "./containers/BottomBarCon";
import HeaderBarCon from "./containers/HeaderBarCon";
import PeekListPanelCon from "./containers/PeekListPanelCon";
import PlayListPanelCon from "./containers/PlayListPanelCon";
import SidePanelCon from "./containers/SidePanelCon";

class App extends Component {

  render() {
    return (
      <BrowserRouter >
      <Grid container>
        <Grid item xs={12}>
          <HeaderBarCon/>
        </Grid>
        <Grid container>
          <Grid item xs={2}>
            <SidePanelCon />
          </Grid>
          <Grid item xs={10}>

            <Switch>
              <Route path={'/playlist'} component={PlayListPanelCon}/>
              <Route exact path={'/peeklist'} component={PeekListPanelCon}/>
              <Route exact path={'/'}
                     render={() => <WelcomePage text={'Log in to shuffle your playlist!'}/>}
              />
              <Route render={() => <WelcomePage text={'Welcome to Shuffle Player! Enjoy shuffling :-)'}/>}
              />
            </Switch>

          </Grid>
        </Grid>
        <Grid item xs={12}>
          <BottomBarCon/>
        </Grid>
      </Grid>
      </BrowserRouter>
    );
  }
}

export default App;
