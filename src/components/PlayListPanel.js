import Grid from "@material-ui/core/es/Grid/Grid";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Input from "@material-ui/core/es/Input/Input";
import Paper from "@material-ui/core/es/Paper/Paper";
import {withStyles} from "@material-ui/core/styles/index";
import React, {Component} from 'react';
import SongListTable from "./SongListTable";
import PlaylistPlay from '@material-ui/icons/PlaylistPlay';

const styles = theme => ({
  inputPadding: {
    padding: 5
  },
  inputSpacing: {
    marginLeft: 20
  }
})

class PlayListPanel extends Component {

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>

        This is the playList pannel<br/>
        <Grid spacing={8}>
          <div>
            {this.props.listName}
          </div>
        </Grid >
        <IconButton color="inherit">
          <PlaylistPlay onClick={this.props.playPlaylist}/>
        </IconButton>
          <Grid item xs={10} style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <Paper>
              <SongListTable/>
            </Paper>
          </Grid>

      </React.Fragment>
    );

  }
}

export default withStyles(styles)(PlayListPanel)