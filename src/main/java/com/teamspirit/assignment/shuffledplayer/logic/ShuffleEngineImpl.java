package com.teamspirit.assignment.shuffledplayer.logic;

import com.teamspirit.assignment.shuffledplayer.pojo.Song;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class ShuffleEngineImpl implements ShuffleEngine {

    static final Song[] fixedPlayList = getSongs();
    static Song[] dynamicPlayList = fixedPlayList.clone();
    static String playMode = "shuffle";
    static final int peekNum = 5;
    static String[] playLists = { "play1ist1", "play1ist2", "play1ist3" };
    //static Map<String, Song[] > mock = new HashMap<>();


    public static Song[] getSongs() {
        Song[] mock = new Song[10];
        for (int i = 0; i < mock.length; i++) {
            mock[i] = com.teamspirit.assignment.shuffledplayer.pojo.Song.builder()
                    .songId(String.valueOf(i))
                    .songName("Song" + i)
                    .artist("Artist" + i)
                    .album("Album" + i)
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
        else if (index == dynamicPlayList.length-1 ||isModeChange) {
            dynamicPlayList = fixedPlayList.clone();
            dynamicPlayList=setSongs(dynamicPlayList, playMode);
            index =0;
        }else{
        index++;}
        return dynamicPlayList[index];
    }

    @Override
    public Song getPreviousSong(String playMode, String songId, Boolean isModeChange) {
        int index = getCurrentSongIndex(songId, dynamicPlayList);
        if(index == -1){
            dynamicPlayList= fixedPlayList.clone();
            dynamicPlayList= setSongs(dynamicPlayList, playMode);
            index = 0;
        }
        else if (index == 0 || isModeChange) {
            dynamicPlayList = fixedPlayList.clone();
            dynamicPlayList = setSongs(dynamicPlayList, playMode);
            index = 0;
        }else{
        index--;
        }
        return dynamicPlayList[index];
    }

    private Song[] generatePeekQueue(String songId) {
        int index = getCurrentSongIndex(songId, dynamicPlayList);
        index = index==-1?0:(index%dynamicPlayList.length);
        Song[] peekList = Arrays.copyOfRange(dynamicPlayList, index+1, dynamicPlayList.length);

        return peekList;
    }

    @Override
    public Song[] getPeekQueue(String songId) {
        Song[] peekQueue = generatePeekQueue(songId);
        if(peekQueue.length>5){
            peekQueue = Arrays.copyOfRange(peekQueue, 0, peekNum);
        }
        return peekQueue;
    }

    @Override
    public Song[] getPlayList(String listName) {

        return fixedPlayList;
    }

    @Override
    public String[] getPlayLists() {

        return playLists;
    }

    @Override
    public Song[] getPeekListAfterSkip(String skipSongId, String currentSongId){
        Song[] peekList = generatePeekQueue(currentSongId);
        int skipedIndex = getCurrentSongIndex(skipSongId,peekList);
        dynamicPlayList= (Song[])ArrayUtils.removeElement(peekList,peekList[skipedIndex]);
        int currentIndex = getCurrentSongIndex(currentSongId,fixedPlayList);
        dynamicPlayList = (Song[]) ArrayUtils.add(dynamicPlayList,0 , fixedPlayList[currentIndex]);
        Song[] skippedQueue = getPeekQueue(currentSongId);
        if(skippedQueue.length>5){
            skippedQueue = Arrays.copyOfRange(skippedQueue, 0, peekNum);
        }
        return skippedQueue;
    }
}
