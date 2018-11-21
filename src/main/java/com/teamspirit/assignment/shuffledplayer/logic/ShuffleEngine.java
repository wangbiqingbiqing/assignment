package com.teamspirit.assignment.shuffledplayer.logic;

import com.teamspirit.assignment.shuffledplayer.pojo.Song;

public interface ShuffleEngine {
    Song[] setSongs(Song[] songs, String songId);

    Song getNextSong(String songId, Song[] shuffledList);

    Song getPreviousSong(String songId, Song[] shuffledList);

    Song[] getPeekQueue(String songId);

    Song[] getPlayList();

    String[] getPlayLists();

    Song[] getPeekListAfterSkip(String skipSongId, String currentSongId);
}
