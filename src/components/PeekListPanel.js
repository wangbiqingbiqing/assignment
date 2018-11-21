import Grid from "@material-ui/core/es/Grid/Grid";
import Input from "@material-ui/core/es/Input/Input";
import Paper from "@material-ui/core/es/Paper/Paper";
import Table from "@material-ui/core/es/Table/Table";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import Typography from "@material-ui/core/es/Typography/Typography";
import {withStyles} from "@material-ui/core/styles/index";
import React, {Component} from 'react';
import {SONG_KEY} from "../constants/keys";
import SongListTable from "./SongListTable";

const styles = theme => ({
  margin: {
    marginTop: '64px',
    height: '100%',

  }
})

class PeekListPanel extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <div className={classes.margin}>
          <Grid container spacing={8} justify="center"
                alignItems="center">
            <Grid item xs={10}>
              <Typography variant="h5" gutterBottom>
                Play Queue
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <div>
                Now Playing
                <Paper>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>{SONG_KEY.SONG_NAME}</TableCell>
                        <TableCell>{SONG_KEY.ARTIST}</TableCell>
                        <TableCell>{SONG_KEY.ALBUM}</TableCell>
                        <TableCell>{SONG_KEY.TIME}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>{this.props.currentSong.songName}</TableCell>
                        <TableCell>{this.props.currentSong.artist}</TableCell>
                        <TableCell>{this.props.currentSong.album}</TableCell>
                        <TableCell>{this.props.currentSong.time}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </div>
            </Grid>
            {this.props.peekList.length !== 0 && <Grid item xs={10}>
              <Grid container>
                <Grid item xs={10}>
                  <div>
                    Next Up
                  </div>
                  <div style={{float: 'right'}}>
                    Peek Number
                    <Input
                      type="number"
                      defaultValue={5}
                      onClick={this.changePeekNumber}
                      inputProps={{
                        'aria-label': 'peek number',
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={10}>
                  <Paper>
                    <SongListTable data={this.props.peekList} isPeekList={true}
                                   skipSong={(songId) => this.props.skipSong(songId)}/>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>}
          </Grid>
        </div>
      </React.Fragment>
    );

  }
}

export default withStyles(styles)(PeekListPanel)