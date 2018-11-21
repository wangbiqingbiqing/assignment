import Grid from "@material-ui/core/es/Grid/Grid";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Paper from "@material-ui/core/es/Paper/Paper";
import Typography from "@material-ui/core/es/Typography/Typography";
import {withStyles} from "@material-ui/core/styles/index";
import PlaylistPlay from '@material-ui/icons/PlaylistPlay';
import React, {Component} from 'react';
import Link from "react-router-dom/es/Link";
import SongListTable from "./SongListTable";

const styles = theme => ({
  margin: {
    marginTop: '5%'
  }
})

class PlayListPanel extends Component {

  state = {
    redirect : false
  };

  constructor(props){
    super(props);
    this.playPlaylist=this.playPlaylist.bind(this);
  }

  playPlaylist(){

    this.props.playPlaylist();
    // return    <Redirect push to="/peeklist" />;
    this.setState({redirect:true});
  }

  render() {
    console.log()
    const {classes} = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={8} justify="center"
              alignItems="center" className={classes.margin}>
          <Grid item xs={10} >
            <Typography variant="h5" gutterBottom>
              Playlist
            </Typography>
          </Grid>
          <Grid item xs={10} >

            <div style={{float:'right'}}>
              <IconButton color="inherit">
                <Link to="/peeklist" style={{textDecoration: 'none'}}>
                <PlaylistPlay onClick={this.playPlaylist}/>
                </Link>
              </IconButton>
            </div>
          </Grid>

          <Grid item xs={10} >
            <Paper>
              <SongListTable  data ={this.props.playList} isPeekList={false}/>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );

  }
}

export default withStyles(styles)(PlayListPanel)