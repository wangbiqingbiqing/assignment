import Grid from "@material-ui/core/Grid/Grid";
import React, {Component} from 'react';
import './App.css';
import history from './history'
import {Switch, Route, BrowserRouter} from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import BottomBarCon from "./containers/BottomBarCon";
import HeaderBarCon from "./containers/HeaderBarCon";
import PeekListPanelCon from "./containers/PeekListPanelCon";
import PlayListPanelCon from "./containers/PlayListPanelCon";
import SidePanelCon from "./containers/SidePanelCon";


class App extends Component {

  constructor(props){
    super(props);
    this.state={midGridHeight:window.innerHeight-128}
  }
  resetMidGridHeight = ()=>{
    this.setState({midGridHeight: window.innerHeight-128});
  }

  componentDidMount() {
    this.resetMidGridHeight();
    window.addEventListener("resize", this.resetMidGridHeight.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resetMidGridHeight.bind(this));
  }

  render() {
    let gridStyle = {
      height: this.state.midGridHeight + 'px',
    };

    return (

      <Grid container>
        <Grid item xs={12}>
          <HeaderBarCon/>
        </Grid>
        <Grid container style = {gridStyle}>
          <Grid item xs={2}>
            <SidePanelCon />
          </Grid>
          <Grid item xs={10}>

            <Switch>
              <Route exact path={'/playlist'} component={PlayListPanelCon}/>
              <Route exact path={'/peeklist'} component={PeekListPanelCon}/>
              <Route exact path={'/'}
                     render={() => <WelcomePage text={'Log in to shuffle your playlist!'}/>}
              />
            </Switch>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <BottomBarCon/>
        </Grid>
      </Grid>
    );
  }
}

export default App;
