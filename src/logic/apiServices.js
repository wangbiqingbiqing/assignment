import axios from "axios";


let [hostname, port] = window.location.host.split(':');
port = port === undefined || port === '3000' || port === '3001'? '8080' : port;
axios.defaults.baseURL = 'http://' + hostname + ':' + port;
axios.defaults.withCredentials = true;

export function apiGetNextSong(playMode, songId){
  return axios.get('/nextsong',
    {params:{
        playMode:playMode,
        songId:songId,
      }})
}

export function apiGetPreviousSong(playMode){
  return axios.get('/previousong',
    {params:{
        playMode:playMode,
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