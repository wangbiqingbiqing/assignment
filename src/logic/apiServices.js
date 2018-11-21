import axios from "axios";

let [hostname, port] = window.location.host.split(':');
port = port === undefined || port === '3000' || port === '3001' ? '8080' : port;
axios.defaults.baseURL = 'http://' + hostname + ':' + port;
axios.defaults.withCredentials = true;

export function apiGetNextSong(songId, shuffledList) {
  const params = new URLSearchParams();
  params.append('songId', songId);
  const options = {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    params: params,
    url: '/nextsong',
    data: shuffledList,
  };
  return axios(options);
}

export function apiGetPreviousSong(songId, shuffledList) {
  const params = new URLSearchParams();
  params.append('songId', songId);
  const options = {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    params: params,
    url: '/previousong',
    data: shuffledList,
  };
  return axios(options);

}

export function apiResetPlaylist(songList,currentSongId){
  const params = new URLSearchParams();
  params.append('currentSongId', currentSongId);
  const options = {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    params: params,
    url: '/resetlist',
    data: songList,
  };
  return axios(options);
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