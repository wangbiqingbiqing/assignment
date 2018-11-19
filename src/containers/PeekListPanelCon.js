import connect from "react-redux/es/connect/connect";
import {getPeekList} from "../actions/actions";
import PeekListPanel from "../components/PeekListPanel";

const PeekListPanelCon = connect(
  state => ({
    peekNum:state.peekNum,
    peekList: state.peekList,
  }),
  dispatch => ({
    getPeekList:(peekNum)=>dispatch(getPeekList(peekNum)),
  })
)(PeekListPanel)
export default PeekListPanelCon