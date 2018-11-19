import connect from "react-redux/es/connect/connect";
import {getPeekList, playSonglist} from "../actions/actions";
import PlayListPanel from "../components/PlayListPanel";

const PlayListPanelCon = connect(
  state => ({
    listName: state.listName,
  }),
  dispatch => ({
    playPlaylist:(listName)=>dispatch(playSonglist(listName)),
  })
)(PlayListPanel)
export default PlayListPanelCon