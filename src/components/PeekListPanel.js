import Grid from "@material-ui/core/es/Grid/Grid";
import Input from "@material-ui/core/es/Input/Input";
import Paper from "@material-ui/core/es/Paper/Paper";
import {withStyles} from "@material-ui/core/styles/index";
import React, {Component} from 'react';
import SongListTable from "./SongListTable";

const styles = theme => ({
  inputPadding: {
    padding: 5
  },
  inputSpacing: {
    marginLeft: 20
  }
})

class PeekListPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {changeFlag: false};
    this.handleFocusOut = this.handleFocusOut.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleFocusOut(event) {
    const value = event.target.value;
    this.props.getPeeklist(value);
    this.setState({changeFlag: false});

  };

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      const value = event.target.value;
      this.props.getPeekList(value);
      this.setState({changeFlag: false});
    }

  };

  handleKeyDown(event) {
    if (event.keyCode !== 13) {
      this.setState({changeFlag: true});
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>

        This is the information pannel<br/>
        <Grid spacing={8}>
          <div>
            Now Playing
          </div>
        </Grid >
        <Grid container alignItems='center' spacing={8}>
          <div>
            Next Up
          </div>
          <div>
            Peek Number
            <Input classes={{input: classes.inputPadding, root: classes.inputSpacing}}
                   type="number"
                   value={this.state.changeFlag ? undefined : this.props.peekNum}
                   onBlur={this.handleFocusOut}
                   onKeyUp={this.handleKeyUp}
                   onKeyDown={this.handleKeyDown}
            />
          </div>


          <Grid item xs={10} style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <Paper>
              <SongListTable/>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );

  }
}

export default withStyles(styles)(PeekListPanel)