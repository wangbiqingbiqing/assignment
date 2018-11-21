import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router";
import {
  turnOnPlayer,
  turnOffPlayer,
  getPeekList,
  playNextSongAndUpdatePeekList,
  playPreviousSongAndUpdatePeekList
} from "../actions/actions";
import BottomBar from "../components/BottomBar";

const BottomBarCon = connect(
  state => ({
    isLoggedIn: state.isLoggedIn,
    song: state.currentSong,
    isPreviousEnabled: state.isPreviousEnabled,
    isPlayOn: state.isTurnedOn,
  }),
  dispatch => ({
    playNext: () => dispatch(playNextSongAndUpdatePeekList()),
    playPrevious: () => dispatch(playPreviousSongAndUpdatePeekList()),
    handleSwitchOn: () => dispatch(turnOnPlayer()),
    handleSwitchOff: () => dispatch(turnOffPlayer()),
    getPeekList: () => dispatch(getPeekList()),
  })
)(BottomBar);

export default withRouter(BottomBarCon)