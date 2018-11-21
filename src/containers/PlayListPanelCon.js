import connect from "react-redux/es/connect/connect";
import {getPeekList, playSonglist, playNextSongAndUpdatePeekList} from "../actions/actions";
import PlayListPanel from "../components/PlayListPanel";

const PlayListPanelCon = connect(
  state => ({
    listName: state.listName,
    playList: state.playList,
  }),
  dispatch => ({
    playPlaylist:(listName)=>dispatch(playNextSongAndUpdatePeekList(listName)),
  })
)(PlayListPanel)
export default PlayListPanelCon