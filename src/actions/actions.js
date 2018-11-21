import {SONG_KEY} from "../constants/keys";
import {
  apiGetNextSong,
  apiGetPreviousSong,
  apiGetPlayLists,
  apiGetPlayList,
  apiGetPeekList,
  apiGetPeekListAfterSkip, apiResetPlaylist
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

export const SET_PEEK_LIST = 'SET_PEEK_LIST';

export function setPeekList(peekList) {
  return {
    type: SET_PEEK_LIST,
    peekList,
  }
}

export const SET_SHUFFLE_LIST = 'SET_SHUFFLE_LIST';
export function setShuffleList(shuffleList){
  return {
    type:SET_SHUFFLE_LIST,
    shuffleList,
  }
}

export function playNextSongAndUpdatePeekList() {
  return (dispatch, getStete) => {
    Promise.all([dispatch(playNextSong())]).then(result => {
      return dispatch(getPeekList());
    });
  }
}

export function playPreviousSongAndUpdatePeekList() {
  return (dispatch, getStete) => {
    Promise.all([dispatch(playPreviousSong())]).then(result => {
      return dispatch(getPeekList());
    });
  }
}

export function resetSongListAndPlay(){
  return (dispatch, getStete) => {
    Promise.all([dispatch(resetSonglist())]).then(result => {
      return dispatch(getPeekList());
    });
  }
}

export function resetSonglist(){
  return (dispatch, getState) => {
    const data = getState();
    const songList = data.shuffleList.length===0?data.playList:data.shuffleList;
    console.log(songList);
    let currentSongId = data.currentSong[SONG_KEY.SONG_ID];
    let songInList = false;
    for(let i =0;i<songList.length;i++){
      console.log(songList[i]);
      let song = songList[i];
      Object.entries(song).map(([key, value]) =>{if(song[SONG_KEY.SONG_ID]===currentSongId){return songInList=true}})
    }
    currentSongId=songInList?currentSongId:songList[1][SONG_KEY.SONG_ID];
    return apiResetPlaylist(songList,currentSongId)
      .then(response => {
        let currentSong = response.data[0];
        dispatch(setCurrent(currentSong));
        dispatch(setShuffleList(response.data))
      })
      .catch(error =>
        console.log(error)
      );
  }
}

export function playNextSong() {
  return (dispatch, getState) => {
    const data = getState();
    const songId = data.currentSong.songId;
    const shuffledList = data.shuffleList;
    return apiGetNextSong(songId,shuffledList)
      .then(response => {
        dispatch(setCurrent(response.data));
        if (!data.isPreviousEnabled) {
          dispatch(enableGetPrevious())
        }
        if (!data.isTurnedOn) {
          dispatch(turnOnPlayer());
        }
      })
      .catch(error =>
        console.log(error)
      );
  }
}

export function playPreviousSong() {
  return (dispatch, getState) => {
    const data = getState();
    const songId = data.currentSong.songId;
    const shuffledList = data.shuffleList;
    return apiGetPreviousSong(songId,shuffledList)
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

export function getPlaylist() {
  return (dispatch) => {
    return apiGetPlayList()
      .then(response => {
        dispatch(setPlaylist(response.data));
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

export function login() {
  return (dispatch) => {
    dispatch(setLogin());
    Promise.all([dispatch(getPlayLists())]).then(result => {
      return dispatch(getPlaylist());
    });

  }
}

export function logout() {
  return (dispatch) => {
    dispatch(setLogout());
  }
}

export function skipSong(skippedSongId) {
  return (dispatch, getState) => {
    const currentSongId = getState().currentSong.songId;
    return apiGetPeekListAfterSkip(skippedSongId, currentSongId)
      .then(response => {
        dispatch(setPeekList(response.data));
      })
      .catch(error =>
        console.log(error)
      );
  }
}
