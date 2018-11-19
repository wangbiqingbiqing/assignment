package com.teamspirit.assignment.shuffledplayer.logic;

import com.teamspirit.assignment.shuffledplayer.pojo.Song;

public interface ShuffleEngine {
    Song[] setSongs(Song[] songs , String playMode);

    Song getNextSong(String playMode, String songId);

    //TODO refine response here with state whether can get
    Song getPreviousSong(String playMode);

    Song[] peekQueue(Integer peekNumber);

    Song[] getPlayList(String listName);

    String[] getPlayLists();
}
