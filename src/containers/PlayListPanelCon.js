import connect from "react-redux/es/connect/connect";
import {playSonglist, playNextSongAndUpdatePeekList, resetSonglist, resetSongListAndPlay} from "../actions/actions";
import PlayListPanel from "../components/PlayListPanel";

const PlayListPanelCon = connect(
  state => ({
    isLoggedIn: state.isLoggedIn,
    playList: state.playList,
  }),
  dispatch => ({

    playPlaylist: () => dispatch(resetSongListAndPlay()),
  })
)(PlayListPanel)
export default PlayListPanelCon