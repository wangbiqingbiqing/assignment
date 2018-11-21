import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router";
import {
  playNextSong,
  playPreviousSong,
  turnOnPlayer,
  turnOffPlayer,
  setPlayMode,
  getPeekList, playNextSongAndUpdatePeekList, playPreviousSongAndUpdatePeekList
} from "../actions/actions";
import BottomBar from "../components/BottomBar";

const BottomBarCon = connect(
  state => ({
    song: state.currentSong,
    isPreviousEnabled: state.isPreviousEnabled,
    isPlayOn:state.isTurnedOn,
  }),
  dispatch => ({
    playNext: () => dispatch(playNextSongAndUpdatePeekList()),
    playPrevious: () => dispatch(playPreviousSongAndUpdatePeekList()),
    handleSwitchOn:()=>dispatch(turnOnPlayer()),
    handleSwitchOff:()=>dispatch(turnOffPlayer()),
    handleSwitchPlayMode:(playMode)=>dispatch(setPlayMode(playMode)),
    getPeekList:()=>dispatch(getPeekList()),
  })
)(BottomBar);

export default withRouter(BottomBarCon)