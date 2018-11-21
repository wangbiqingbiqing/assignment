package com.teamspirit.assignment.shuffledplayer.logic;

import com.teamspirit.assignment.shuffledplayer.pojo.Song;

public interface ShuffleEngine {
    Song[] setSongs(Song[] songs);

    Song getNextSong(String songId);

    Song getPreviousSong(String songId);

    Song[] getPeekQueue(String songId);

    Song[] getPlayList();

    String[] getPlayLists();

    Song[] getPeekListAfterSkip(String skipSongId, String currentSongId);
}
