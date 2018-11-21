import connect from "react-redux/es/connect/connect";
import {getPeekList, playSonglist, playNextSongAndUpdatePeekList} from "../actions/actions";
import PlayListPanel from "../components/PlayListPanel";

const PlayListPanelCon = connect(
  state => ({
    playList: state.playList,
  }),
  dispatch => ({
    playPlaylist:()=>dispatch(playNextSongAndUpdatePeekList()),
  })
)(PlayListPanel)
export default PlayListPanelCon