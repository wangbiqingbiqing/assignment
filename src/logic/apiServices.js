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

export function apiGetPlayList(listName){
  return axios.get('/playlist',
    {params:{
        listName:listName,
      }})
}

export function apiGetPeekList(songId,playList,playMode){
  return axios.get('/peeklist',
    {params:{
        listName:songId,
      }})
}

export function apiGetPeekListAfterSkip(skippedSongId, currentSongId){
  return axios.get('/skippedPeeklist',
    {params:{
        skipSongId:skippedSongId,
        currentSongId:currentSongId
      }})
}