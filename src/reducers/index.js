import {
  DISABLE_PREVIOUS,
  ENABLE_PREVIOUS,
  TURN_ON_PLAYER,
  TURN_OFF_PLAYER,
  SET_PLAYLISTS,
  SET_PLAYLIST,
  SET_LIST_NAME,
  SET_LOG_IN,
  SET_LOG_OUT,
  SET_PEEK_LIST,
  SET_CURRENT_SONG
} from "../actions/actions";
import {DEMO_SONG, DEFAULT_PLAYLISTS} from "../constants/states";

const defaultState = {
  playList: [DEMO_SONG],
  peekList: [],
  isTurnedOn: false,
  isPreviousEnabled: false,
  currentSong: DEMO_SONG,
  isLoggedIn: false,
  playLists: DEFAULT_PLAYLISTS,
};

export default function appData(state = defaultState, action) {
  switch (action.type) {
    case SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.song,
      };
    case DISABLE_PREVIOUS:
      return {
        ...state,
        isPreviousEnabled: false,
      };
    case ENABLE_PREVIOUS:
      return {
        ...state,
        isPreviousEnabled: true,
      };
    case TURN_ON_PLAYER:
      return {
        ...state,
        isTurnedOn: true,
      };
    case TURN_OFF_PLAYER:
      return {
        ...state,
        isTurnedOn: false,
      };
    case SET_PLAYLISTS:
      return {
        ...state,
        playLists: action.playlists,
      };
    case SET_PLAYLIST:
      return {
        ...state,
        playList: action.playlist,
      };
    case SET_LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case SET_LOG_OUT:
      return {
        ...state,
        currentSong: DEMO_SONG,
        playList: [DEMO_SONG],
        isLoggedIn: false,
        peekList: [DEMO_SONG],
        playLists: DEFAULT_PLAYLISTS,
      };
    case SET_PEEK_LIST:
      return {
        ...state,
        peekList: action.peekList
      };
    default:
      return state
  }
}
