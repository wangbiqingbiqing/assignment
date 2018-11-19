import Grid from "@material-ui/core/es/Grid/Grid";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Paper from "@material-ui/core/es/Paper/Paper";
import Typography from "@material-ui/core/es/Typography/Typography";
import {withStyles} from "@material-ui/core/styles/index";
import PlaylistPlay from '@material-ui/icons/PlaylistPlay';
import React, {Component} from 'react';
import SongListTable from "./SongListTable";

const styles = theme => ({
  margin: {
    marginTop: '5%'
  }
})

class PlayListPanel extends Component {

  render() {
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
            <div>
              {/*{this.props.listName}*/}
              PlayList 1
              <IconButton color="inherit">
                <PlaylistPlay onClick={this.props.playPlaylist}/>
              </IconButton>
            </div>
          </Grid>

          <Grid item xs={10} >
            <Paper>
              <SongListTable/>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );

  }
}

export default withStyles(styles)(PlayListPanel)