import {
  apiGetNextSong,
  apiGetPreviousSong,
  apiGetPlayLists,
  apiGetPlayList,
  apiGetPeekList
} from "../logic/apiServices";

export const SET_CURRENT_SONG = 'SET_CURRENT_SONG';

export function setCurrent(song) {
  return {
    type: SET_CURRENT_SONG,
    song
  }
}

export const TURN_ON_PLAYER = "TURN_ON_PLAYER";

export function turnOnPlayer() {
  return {type: TURN_ON_PLAYER}
}

export const TURN_OFF_PLAYER = "TURN_OFF_PLAYER";

export function turnOffPlayer() {
  return {type: TURN_OFF_PLAYER}
}

export const DISABLE_PREVIOUS = 'DISABLE_PREVIOUS';

export function disableGetPrevious() {
  return {
    type: DISABLE_PREVIOUS
  }
}

export const ENABLE_PREVIOUS = 'ENABLE_PREVIOUS';

export function enableGetPrevious() {
  return {
    type: ENABLE_PREVIOUS
  }
}

export const SET_PLAYLIST = 'SET_PLAYLIST';

export function setPlaylist(playlist) {
  return {
    type: SET_PLAYLIST,
    playlist
  }
}

export const SET_PLAYLISTS = 'SET_PLAYLISTS';

export function setPlaylists(playlists) {
  return {
    type: SET_PLAYLISTS,
    playlists
  }
}

export const SET_LIST_NAME = 'SET_LIST_NAME';

export function setListName(listName) {
  return {
    type: SET_LIST_NAME,
    listName,
  }
}

export const SET_PLAY_MODE = "SET_PLAY_MODE";

export function setPlayMode(playMode){
  return {
    type:SET_PLAY_MODE,
    playMode,
  }
}

export const SET_PEEK_LIST = 'SET_PEEK_LIST';

export function setPeekList(peekList){
return {
  type:SET_PEEK_LIST,
  peekList,
}
}

export function playNextSongAndUpdatePeekList(){
  return (dispatch,getStete)=>{
    Promise.all([playNextSong,getPeekList]).then(([nextSong,peekList])=>{
      console.log(nextSong,peekList);
      dispatch(setCurrent(nextSong));
      dispatch(setPeekList(peekList));
    })
  }
}


export function playNextSong() {
  return (dispatch, getState) => {
    const data = getState();
    const playMode = data.playMode;
    const songId = data.currentSong.songId;
    return apiGetNextSong(playMode, songId, false)
      .then(response => {
        dispatch(setCurrent(response.data));
        if (!data.isPreviousEnabled) {
          dispatch(enableGetPrevious())
        };
        if (!data.isTurnedOn) {
          dispatch(turnOnPlayer());
        };
      })
      .catch(error =>
        console.log(error)
      );
  }
}

export function playPreviousSong() {
  return (dispatch, getState) => {
    const data = getState();
    const playMode = data.playMode;
    const songId = data.currentSong.songId;
    return apiGetPreviousSong(playMode,songId, false)
      .then(response => {
        if (response.data) {
          dispatch(setCurrent(response.data));
          if (!data.isTurnedOn) {
            dispatch(turnOnPlayer());
          }
        } else {
          dispatch(disableGetPrevious())
        }
      })
      .catch(error =>
        console.log(error)
      );
  }
}

export function getPlayLists() {
  return (dispatch) => {
    return apiGetPlayLists()
      .then(response => {
        dispatch(setPlaylists(response.data))
      })
      .catch(error =>
        console.log(error)
      );
  }
}

export function getPlaylist(listName) {
  return (dispatch) => {

    return apiGetPlayList(listName)
      .then(response => {
        dispatch(setPlaylist(response.data));
        dispatch(setListName(listName))
      })
      .catch(error =>
        console.log(error)
      );
  }

}

export function getPeekList() {
  return (dispatch, getState) => {
    const data = getState();
    const songId = data.currentSong.songId;
    return apiGetPeekList(songId)
      .then(response => {
          dispatch(setPeekList(response.data));
      })
      .catch(error =>
        console.log(error)
      );
  }
}

export function playSonglist(listName){
  return (dispatch, getState) => {
    const data = getState();
    const playMode = data.playMode;
    // return apiGetPlayList(playMode,songId, false)
    //   .then(response => {
    //     if (response.data) {
    //       dispatch(setCurrent(response.data));
    //       if (!data.isTurnedOn) {
    //         dispatch(turnOnPlayer());
    //       }
    //     } else {
    //       dispatch(disableGetPrevious())
    //     }
    //   })
    //   .catch(error =>
    //     console.log(error)
    //   );
  }
}


export const SET_LOG_IN = 'SET_LOG_IN';

export function setLogin() {
  return {
    type: SET_LOG_IN
  }
}

export const SET_LOG_OUT = 'SET_LOG_OUT';

export function setLogout() {
  return {
    type: SET_LOG_OUT
  }
}

export function login(){
  return (dispatch) => {
        dispatch(setLogin());
        dispatch(getPlayLists());
  }
}

export function logout(){
  return (dispatch) => {
    dispatch(setLogout());
  }
}
