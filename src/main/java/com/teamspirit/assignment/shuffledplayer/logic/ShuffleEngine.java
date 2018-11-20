package com.teamspirit.assignment.shuffledplayer.logic;

import com.teamspirit.assignment.shuffledplayer.pojo.Song;

public interface ShuffleEngine {
    Song[] setSongs(Song[] songs , String playMode);

    Song getNextSong(String playMode, String songId, Boolean isModeChange);

    Song getPreviousSong(String playMode, String songId, Boolean isModeChange);

    Song[] getPeekQueue(String songId);

    Song[] getPlayList(String listName);

    String[] getPlayLists();
}
