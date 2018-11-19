import AppBar from "@material-ui/core/AppBar/AppBar";
import Grid from "@material-ui/core/es/Grid/Grid";
import IconButton from "@material-ui/core/IconButton/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import QueueMusic from '@material-ui/icons/QueueMusic'
import Repeat from '@material-ui/icons/Repeat';
import RepeatOne from '@material-ui/icons/RepeatOne';
import Shuffle from '@material-ui/icons/Shuffle';
import SkipNext from '@material-ui/icons/SkipNext';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import VolumeOff from '@material-ui/icons/VolumeOff';
import VolumeUp from '@material-ui/icons/VolumeUp';
import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {PLAY_MODE} from "../constants/states";
import logo from '../pictures/teamSpiritLogo.PNG';

const styles = theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  playActions: {
    width: '15%',
  },
  songInfo: {
    width: '50%',
  },
  playStatus: {
    width: '35%',
  },
  image: {
    width: 30,
    height: 30,
  }
})

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mute: false,
      volume: 50,
      playMode: PLAY_MODE.SHUFFLE,
    };

    this.muteVolume = this.muteVolume.bind(this);
    this.resetVolume = this.resetVolume.bind(this);
    this.switchPlayMode = this.switchPlayMode.bind(this);
    this.handleQueuePeeking = this.handleQueuePeeking(this);
  }

  muteVolume() {
    this.setState({
      mute: true,
    });
  }

  resetVolume() {
    this.setState({
      mute: false,
    })
  }

  switchPlayMode() {
    let nextMode;
    switch (this.state.playMode) {
      case PLAY_MODE.SHUFFLE:
        nextMode = PLAY_MODE.REPEAT;
        break;
      case PLAY_MODE.REPEAT:
        nextMode = PLAY_MODE.REPEAT_ONE;
        break;
      case PLAY_MODE.REPEAT_ONE:
        nextMode = PLAY_MODE.SHUFFLE;
        break;
      default:
        nextMode = PLAY_MODE.SHUFFLE;
    }
    this.setState({
      playMode: nextMode,
    })
  }

  handleQueuePeeking() {
    //console.log(this.props.history);
    console.log('coming');
    //this.props.history.replaceState(null,'/peeklist');
  }

  render() {
    //console.log(this.props.history);
    const {classes} = this.props;
    let currentPlayMode;
    if (this.state.playMode === PLAY_MODE.REPEAT) {
      currentPlayMode = <Repeat/>;
    } else if (this.state.playMode === PLAY_MODE.REPEAT_ONE) {
      currentPlayMode = <RepeatOne/>;
    } else {
      currentPlayMode = <Shuffle/>;
    }

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid container>
            <Grid item xs={2} className={classes.playActions}>
              <IconButton aria-label="Previous" color="inherit" disabled={!this.props.isPreviousEnabled} >
                <SkipPrevious onClick={this.props.playPrevious}/>
              </IconButton>
              <IconButton color="inherit">
                {!this.props.isPlayOn ?
                  <PlayArrow onClick={this.props.handleSwitchOn}/> :
                  <Pause onClick={this.props.handleSwitchOff}/>}
              </IconButton>
              <IconButton aria-label="Next" color="inherit">
                <SkipNext onClick={this.props.playNext}/></IconButton>
            </Grid>
            <Grid item xs={6} className={classes.songInfo}>
              <img className={classes.image} src={logo} alt="TeamSpirit"/>
              {this.props.song.songName}
            </Grid>
            <Grid item xs={4} className={classes.playStatus}>
              <IconButton color="inherit">
                {!this.state.mute ?
                  (<VolumeUp onClick={this.muteVolume}/>) :
                  (<VolumeOff onClick={this.resetVolume}/>)}
              </IconButton>
              <IconButton color="inherit" onClick={this.switchPlayMode}>
                {currentPlayMode}
              </IconButton>
              <IconButton color="inherit" onClick={this.handleQueuePeeking}>
                <QueueMusic/>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(BottomBar);