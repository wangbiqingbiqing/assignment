import Grid from "@material-ui/core/es/Grid/Grid";
import Paper from "@material-ui/core/es/Paper/Paper";
import Typography from "@material-ui/core/es/Typography/Typography";
import {withStyles} from "@material-ui/core/styles/index";
import React, {Component} from 'react';
import SongListTable from "./SongListTable";

const styles = theme => ({
  margin: {
    marginTop: '64px',
    height:'100%',

  }
})

class PeekListPanel extends Component {
  render() {
    const {classes} = this.props;
    return (
      <React.Fragment >
        <div className={classes.margin}>
        <Grid container spacing={8} justify="center"
              alignItems="center"  >
          <Grid item xs={10} >
          <Typography variant="h5" gutterBottom>
            Play Queue
          </Typography>
        </Grid>
          <Grid item xs={10} >
            <div>
              {/*{this.props.listName}*/}
              Now Playing

            </div>
          </Grid>
          <Grid item xs={10} >
            <div>
              Next Up
            </div>
            <Grid item xs={10}>
              <Paper>
                <SongListTable/>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        </div>
      </React.Fragment>
    );

  }
}

export default withStyles(styles)(PeekListPanel)