import Table from "@material-ui/core/es/Table/Table";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import Typography from "@material-ui/core/Typography/Typography";
import React, {Component} from 'react';

class SidePanel extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, listName) {
    this.props.openPlayList(listName);
  }

  render() {

    let tableData = [];
    if (typeof(this.props.data) === 'object') {
      this.props.data.forEach(listName =>
        tableData.push(
          <TableRow key={listName} onClick={event => this.handleClick(event, listName)}>
            <TableCell>
              {listName}
            </TableCell>
          </TableRow>))
    }

    return (
      <React.Fragment>
        <div style={{height: '700px', borderRight: 'grey solid'}}>
          <Typography align="center">
            PlayList
          </Typography>
          {typeof(this.props.data) === 'string' ? this.props.data : null}
          {tableData.length !== 0 && <Table>
            <TableBody>
              {tableData}
            </TableBody>
          </Table>}
        </div>
      </React.Fragment>
    )
  }
}

export default (SidePanel)