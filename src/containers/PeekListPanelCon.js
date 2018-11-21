import connect from "react-redux/es/connect/connect";
import {getPeekList, skipSong} from "../actions/actions";
import PeekListPanel from "../components/PeekListPanel";

const PeekListPanelCon = connect(
  state => ({
    currentSong:state.currentSong,
    peekList: state.peekList,
  }),
  dispatch => ({
    getPeekList:()=>dispatch(getPeekList()),
    skipSong:(songId)=>dispatch(skipSong(songId)),
  })
)(PeekListPanel)
export default PeekListPanelCon