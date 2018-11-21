import axios from "axios";

let [hostname, port] = window.location.host.split(':');
port = port === undefined || port === '3000' || port === '3001' ? '8080' : port;
axios.defaults.baseURL = 'http://' + hostname + ':' + port;
axios.defaults.withCredentials = true;

export function apiGetNextSong(songId) {
  return axios.get('/nextsong',
    {
      params: {
        songId: songId
      }
    })
}

export function apiGetPreviousSong(songId) {
  return axios.get('/previousong',
    {
      params: {
        songId: songId
      }
    })
}

export function apiGetPlayLists() {
  return axios.get('/playlists')
}

export function apiGetPlayList() {
  return axios.get('/playlist')
}

export function apiGetPeekList(songId) {
  return axios.get('/peeklist',
    {
      params: {
        songId: songId,
      }
    })
}

export function apiGetPeekListAfterSkip(skippedSongId, currentSongId) {
  return axios.get('/skippedPeeklist',
    {
      params: {
        skipSongId: skippedSongId,
        currentSongId: currentSongId
      }
    })
}