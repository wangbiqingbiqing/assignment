import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router";
import {playNextSong, playPreviousSong, turnOnPlayer, turnOffPlayer, setPlayMode} from "../actions/actions";
import BottomBar from "../components/BottomBar";

const BottomBarCon = connect(
  state => ({
    song: state.currentSong,
    isPreviousEnabled: state.isPreviousEnabled,
    isPlayOn:state.isTurnedOn,
  }),
  dispatch => ({
    playNext: () => dispatch(playNextSong()),
    playPrevious: () => dispatch(playPreviousSong()),
    handleSwitchOn:()=>dispatch(turnOnPlayer()),
    handleSwitchOff:()=>dispatch(turnOffPlayer()),
    handleSwitchPlayMode:(playMode)=>dispatch(setPlayMode(playMode)),
  })
)(BottomBar);

export default withRouter(BottomBarCon)