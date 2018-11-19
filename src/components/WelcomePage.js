
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Grid from "@material-ui/core/es/Grid/Grid";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Typography from "@material-ui/core/es/Typography/Typography";
import React, {Component} from "react";

const styles = {
  card: {
    position: 'relative',
    top: '50px'
  }
};

class WelcomePage extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={3}/>
        <Grid item xs={6}>
          <Card className={this.props.classes.card}>
            <CardContent>
              <Typography align={'center'}>
                {this.props.text}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}/>
      </Grid>
    )
  }
}

export default withStyles(styles)(WelcomePage);