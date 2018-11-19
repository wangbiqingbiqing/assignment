package com.teamspirit.assignment.shuffledplayer.logic;

import com.teamspirit.assignment.shuffledplayer.pojo.Song;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Arrays;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class ShuffleEngineImpl implements ShuffleEngine {

    static final Song[] fixedPlayList = getSongs();
    static Song[] dynamicPlayList = fixedPlayList.clone();
    static String playMode = "shuffle";
    static int peekNum = dynamicPlayList.length;
    static String[] playLists = { "play1ist1", "play1ist2", "play1ist3" };

    public static Song[] getSongs() {
        Song[] mock = new Song[10];
        for (int i = 0; i < mock.length; i++) {
            mock[i] = com.teamspirit.assignment.shuffledplayer.pojo.Song.builder()
                    .songId(String.valueOf(i))
                    .songName("Song" + i)
                    .artist("Artist" + i)
                    .album("Album" + i)
                    .albumPicture("pic" + i)
                    .lyrics("lyrics" + i)
                    .time("4:30")
                    .build();
        }
        return mock;
    }

    public static Song[] shuffleArray(Song[] list) {
        int n = list.length;
        for (int i = 0; i < n; i++) {
            int change = i + (int)(Math.random() * (n - i));
            Song temp = list[change];
            list[change] = list[i];
            list[i] = temp;
        }
        return list;
    }

    //TODO is mode changed? check cannot same as current song
    @Override
    public Song[] setSongs(Song[] playList, String currentPlayMode) {
        int num = playList.length;
        Song[] nextList = playList.clone();
        if (currentPlayMode.equals("shuffle")) {
            do {
                shuffleArray(nextList);
            } while (Arrays.equals(playList, nextList) || playList[num - 1] == nextList[0]);
            return nextList;
        } else {
            return fixedPlayList;
        }
    }

    private int getCurrentSongIndex(String songId, Song[] playList) {
        for (int i = 0; i < playList.length; i++) {
            if (playList[i].getSongId().equals(songId)) {
                return i;
            }
        }
        return -1;
    }

    @Override
    public Song getNextSong(String playMode, String songId, Boolean isModeChange) {
        int index = getCurrentSongIndex(songId, dynamicPlayList);
        if(index == -1){
            dynamicPlayList = fixedPlayList.clone();
            dynamicPlayList = setSongs(dynamicPlayList, playMode);
            index =0;
        }
        if (index == dynamicPlayList.length-1 ||isModeChange) {
            dynamicPlayList=setSongs(dynamicPlayList, playMode);
            index =0;
        }
        index++;
        return dynamicPlayList[index];
    }

    @Override
    public Song getPreviousSong(String playMode, String songId, Boolean isModeChange) {
        int index = getCurrentSongIndex(songId, dynamicPlayList);
        if(index == -1){
            dynamicPlayList= fixedPlayList.clone();
            dynamicPlayList= setSongs(dynamicPlayList, playMode);
            index =dynamicPlayList.length-1;
        }
        if (index == 0 || isModeChange) {
            dynamicPlayList = setSongs(dynamicPlayList, playMode);
            index = dynamicPlayList.length-1;
        }
        index--;
        return dynamicPlayList[index];
    }

    @Override
    public Song[] peekQueue(String songId) {

        return dynamicPlayList;
    }

    @Override
    public Song[] getPlayList(String listName) {

        return fixedPlayList;
    }

    @Override
    public String[] getPlayLists() {

        return playLists;
    }
}
