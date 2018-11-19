import connect from "react-redux/es/connect/connect";
import {getPeekList, playPlaylist} from "../actions/actions";
import PlayListPanel from "../components/PlayListPanel";

const PlayListPanelCon = connect(
  state => ({
    listName: state.listName,
  }),
  dispatch => ({
    playPlaylist:(listName)=>dispatch(playPlaylist(listName)),
  })
)(PlayListPanel)
export default PlayListPanelCon