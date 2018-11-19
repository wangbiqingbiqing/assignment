import connect from "react-redux/es/connect/connect";
import {
  playNextSong,
  playPreviousSong,
  turnOnPlayer,
  turnOffPlayer,
  getPlayLists,
  getPlaylist, login,logout
} from "../actions/actions";
import HeaderBar from "../components/HeaderBar";

const HeaderBarCon = connect(
  state => ({
    isLoggedIn: state.isLoggedIn
  }),
  dispatch => ({
    login: () => dispatch(login()),
    logout:() => dispatch(logout())
  })
)(HeaderBar);

export default HeaderBarCon