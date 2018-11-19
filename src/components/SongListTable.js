import Table from "@material-ui/core/es/Table/Table";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import React, {Component} from 'react';

class SongListTable extends Component {

  render() {
    let listdata = [{songId:'1',songName: 'song1', artist: 'andreas', time: '2:30'},
      {songId:'2',songName: 'song2', artist: 'juno', time: '4:30'},
      {songId:'3',songName: 'song2', artist: 'juno', time: '4:30'},
      {songId:'4',songName: 'song2', artist: 'juno', time: '4:30'},
      {songId:'5',songName: 'song2', artist: 'juno', time: '4:30'},
      {songId:'6',songName: 'song2', artist: 'juno', time: '4:30'},
      {songId:'7',songName: 'song2', artist: 'juno', time: '4:30'},
      {songId:'8',songName: 'song2', artist: 'juno', time: '4:30'},
      {songId:'9',songName: 'song2', artist: 'juno', time: '4:30'},
      {songId:'2',songName: 'song2', artist: 'juno', time: '4:30'},];
    let tableBody = [];
    listdata.forEach(song => {
      let tableRow = Object.entries(song).map(([key, value]) => {return <TableCell>{value}</TableCell>});
      tableBody.push(<TableRow>{tableRow}</TableRow>
    )});
    return (
      <Table>
        <TableHead>
        </TableHead>
        <TableBody>
          {tableBody}
        </TableBody>
      </Table>
    );
  }

}

export default SongListTable