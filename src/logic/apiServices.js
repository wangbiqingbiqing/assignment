import axios from "axios";


let [hostname, port] = window.location.host.split(':');
port = port === undefined || port === '3000' || port === '3001'? '8080' : port;
axios.defaults.baseURL = 'http://' + hostname + ':' + port;
axios.defaults.withCredentials = true;

export function apiGetNextSong(playMode, songId, isModeChange){
  return axios.get('/nextsong',
    {params:{
        playMode:playMode,
        songId:songId,
        isModeChange:false
      }})
}

export function apiGetPreviousSong(playMode,songId, isModeChange){
  return axios.get('/previousong',
    {params:{
        playMode:playMode,
        songId:songId,
        isModeChange:false
      }})
}

export function apiGetPlayLists(){
  return axios.get('/playlists')
}

export function apiGetPlayList(){
  return axios.get('/playlist')
}

export function apiGetPeekList(songId){
  return axios.get('/peeklist',
    {params:{
        songId:songId,
      }})
}

export function apiGetPeekListAfterSkip(skippedSongId, currentSongId){
  return axios.get('/skippedPeeklist',
    {params:{
        skipSongId:skippedSongId,
        currentSongId:currentSongId
      }})
}