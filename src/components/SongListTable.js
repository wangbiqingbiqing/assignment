import Button from "@material-ui/core/es/Button/Button";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Table from "@material-ui/core/es/Table/Table";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import React, {Component} from 'react';
import {SONG_KEY} from "../constants/keys";
import Clear from '@material-ui/icons/Clear';

class SongListTable extends Component {
  constructor(props){
    super(props)
  }

  render() {
    let listData = this.props.data;
    let tableBody = [];
    let i =1;
    listData.forEach(song => {
      let tableRow = Object.entries(song).map(([key, value]) => {
        if(key!==SONG_KEY.SONG_ID&&key!==SONG_KEY.LYRICS){
        return (<TableCell key={value}>{value}</TableCell>)}
      });
      tableBody.push(<TableRow key={song.songId}>
        <TableCell key={i}>{i}</TableCell>
        {tableRow}{this.props.isPeekList?<TableCell>
        <Button variant="outlined" size="small"  color="inherit" onClick={() => this.props.skipSong(song.songId)}>
          skip
        </Button>
      </TableCell>:null}
      </TableRow>
    )
      i=i+1;
    });
    return (
      <Table>
        <TableHead>
          <TableRow>
          <TableCell>No.</TableCell>
          <TableCell>{SONG_KEY.SONG_NAME}</TableCell>
          <TableCell>{SONG_KEY.ARTIST}</TableCell>
          <TableCell>{SONG_KEY.ALBUM}</TableCell>
          <TableCell>{SONG_KEY.TIME}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableBody}
        </TableBody>
      </Table>
    );
  }

}

export default SongListTable