import AppBar from "@material-ui/core/AppBar/AppBar";
import Grid from "@material-ui/core/es/Grid/Grid";
import IconButton from "@material-ui/core/IconButton/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import LensIcon from '@material-ui/icons/LensOutlined';
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
import Slider from "@material-ui/lab/es/Slider/Slider";
import React, {Component} from 'react'
import Link from "react-router-dom/es/Link";
import {PLAY_MODE} from "../constants/states";
import logo from '../pictures/teamSpiritLogo.PNG';

const styles = theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  playActions: {
    width: '15%',
    display: 'flex',
  },
  songInfo: {
    width: '50%',
    display: 'flex',
  },
  playStatus: {
    width: '35%',
    display: 'flex',
  },
  image: {
    width: 30,
    height: 30,
  },
  slider: {
    padding: '22px 0px',
  },
  thumbIcon: {
    borderRadius: '50%',
  },
  thumbIconWrapper: {
    backgroundColor: '#fff',
  },
  trackBefore: {
    backgroundColor: '#fff',
  },
  trackAfter: {
    backgroundColor: '#fff',
  },
  root: {
    width: '50%',
  }
})

class BottomBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mute: false,
      playingTime: 0,
      volume: 50,
      playMode: PLAY_MODE.SHUFFLE,
    };

    this.muteVolume = this.muteVolume.bind(this);
    this.resetVolume = this.resetVolume.bind(this);
    this.switchPlayMode = this.switchPlayMode.bind(this);
    this.volumeChange = this.volumeChange.bind(this);
    this.playingTimeChange = this.playingTimeChange.bind(this);
  }

  muteVolume() {
    this.setState({
      mute: true,
      volume: 0,
    });
  }

  resetVolume() {
    this.setState({
      mute: false,
      volume: 50,
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
    this.props.handleSwitchPlayMode(nextMode);
  }

  volumeChange(event, value) {
    this.setState({
      volume: value
    });
    if (value === 0) {
      this.setState({
        mute: true
      });
    } else {
      this.setState({
        mute: false
      });
    }
  }

  playingTimeChange(event, value) {
    this.setState({
      playingTime: value
    });
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
              <IconButton aria-label="Previous" color="inherit" disabled={!this.props.isPreviousEnabled}>
                <Link to="/peeklist" style={{textDecoration: 'none', color: 'white'}}>
                  <SkipPrevious onClick={this.props.playPrevious}/>
                </Link>
              </IconButton>
              <IconButton color="inherit">
                {!this.props.isPlayOn ?
                  <PlayArrow onClick={this.props.handleSwitchOn}/> :
                  <Pause onClick={this.props.handleSwitchOff}/>}
              </IconButton>
              <IconButton aria-label="Next" color="inherit">
                <Link to="/peeklist" style={{textDecoration: 'none', color: 'white'}}>
                  <SkipNext onClick={this.props.playNext}/>
                </Link>
              </IconButton>
            </Grid>
            <Grid item xs={6} className={classes.songInfo}>
              <div><img className={classes.image} src={logo} alt="TeamSpirit"/></div>
              <div>{this.props.song.songName}</div>
              <Slider value={this.state.playingTime} onChange={this.playingTimeChange}
                      classes={{
                        container: classes.slider,
                        thumbIconWrapper: classes.thumbIconWrapper,
                        trackBefore: classes.trackBefore,
                        trackAfter: classes.trackAfter,
                        root: classes.root,
                      }}
                      thumb={<LensIcon style={{color: '#2196f3'}}
                      />}
              />
            </Grid>

            <Grid item xs={4} className={classes.playStatus}>
              <div>
                <IconButton color="inherit">
                  {!this.state.mute ?
                    (<VolumeUp onClick={this.muteVolume}/>) :
                    (<VolumeOff onClick={this.resetVolume}/>)}
                </IconButton>
              </div>
              <Slider value={this.state.volume} onChange={this.volumeChange}
                      classes={{
                        container: classes.slider,
                        thumbIconWrapper: classes.thumbIconWrapper,
                        trackBefore: classes.trackBefore,
                        trackAfter: classes.trackAfter,
                        root: classes.root,
                      }}
                      thumb={<LensIcon style={{color: '#2196f3'}}/>}

              />
              <div>
                <IconButton color="inherit" onClick={this.switchPlayMode}>
                  {currentPlayMode}
                </IconButton>
              </div>
              <div>

                <IconButton color="inherit" onClick={this.props.getPeekList}>
                  <Link to="/peeklist" style={{textDecoration: 'none', color: 'white'}}>
                    <QueueMusic/>
                  </Link>
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(BottomBar);