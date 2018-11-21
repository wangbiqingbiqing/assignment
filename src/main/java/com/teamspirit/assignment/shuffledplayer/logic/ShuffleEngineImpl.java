package com.teamspirit.assignment.shuffledplayer.logic;

import com.teamspirit.assignment.shuffledplayer.pojo.Song;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class ShuffleEngineImpl implements ShuffleEngine {

    static final Song[] fixedPlayList = generateSongs();
    static final int peekNum = 5;
    static Song[] dynamicPlayList = fixedPlayList.clone();
    static String[] playLists = { "playlist" };

    public static Song[] generateSongs() {
        Song[] mock = new Song[5];
        for (int i = 0; i < mock.length; i++) {
            mock[i] = com.teamspirit.assignment.shuffledplayer.pojo.Song.builder()
                    .songId(String.valueOf((i + 1)))
                    .songName("Song" + (i + 1))
                    .artist("Artist" + (i + 1))
                    .album("Album" + (i + 1))
                    .lyrics("lyrics" + (i + 1))
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

    @Override
    /**
     invalid shuffle case
     1.two sequences are same
     2.the end of current loop is same as the first of next loop when gonext
     3.the first of current loop is same as the first of next loop when goprevious
     */
    public Song[] setSongs(Song[] playList, String checkId) {
        Song[] nextList = playList.clone();
        do {
            shuffleArray(nextList);
        } while (Arrays.equals(playList, nextList) || nextList[0].getSongId() == checkId);
        dynamicPlayList = nextList;
        return dynamicPlayList;
    }

    @Override
    public Song getNextSong(String songId ,Song[] shuffledList) {
        int index = getCurrentSongIndex(songId, dynamicPlayList);
        if (index == -1) {
            index = 0;
        } else if (index == dynamicPlayList.length - 1) {
            dynamicPlayList = shuffledList;
            dynamicPlayList = setSongs(dynamicPlayList,songId);
            index = 0;
        } else {
            index++;
        }
        return dynamicPlayList[index];
    }

    @Override
    public Song getPreviousSong(String songId,Song[] shuffledList) {
        int index = getCurrentSongIndex(songId, dynamicPlayList);
        if (index == -1) {
            index = 0;
        } else if (index == 0) {
            dynamicPlayList = shuffledList;
            dynamicPlayList = setSongs(dynamicPlayList,dynamicPlayList[index].getSongId());
            index = 0;
        } else {
            index--;
        }
        return dynamicPlayList[index];
    }

    private Song[] generatePeekQueue(String songId) {
        int index = getCurrentSongIndex(songId, dynamicPlayList);
        Song[] peekList;
        //when current song is not in the list, start from the index 0
        if (index == -1) {
            peekList = Arrays.copyOfRange(dynamicPlayList, 0, dynamicPlayList.length);
        }
        //when current song is in the list, show the rest songs from current
        else {
            index = index % dynamicPlayList.length;
            peekList = Arrays.copyOfRange(dynamicPlayList, index + 1, dynamicPlayList.length);
        }
        return peekList;
    }

    @Override
    public Song[] getPeekQueue(String songId) {
        Song[] peekQueue = generatePeekQueue(songId);
        peekQueue = Arrays.copyOfRange(peekQueue, 0, Math.min(peekNum, peekQueue.length));
        return peekQueue;
    }

    @Override
    public Song[] getPlayList() {
        return fixedPlayList;
    }

    @Override
    public String[] getPlayLists() {

        return playLists;
    }

    @Override
    public Song[] getPeekListAfterSkip(String skipSongId, String currentSongId) {
        Song[] peekList = generatePeekQueue(currentSongId);
        int skipedIndex = getCurrentSongIndex(skipSongId, peekList);
        dynamicPlayList = (Song[])ArrayUtils.removeElement(peekList, peekList[skipedIndex]);
        int currentIndex = getCurrentSongIndex(currentSongId, fixedPlayList);
        if (currentIndex != -1) {
            dynamicPlayList = (Song[])ArrayUtils.add(dynamicPlayList, 0, fixedPlayList[currentIndex]);
        }
        Song[] skippedQueue = getPeekQueue(currentSongId);
        skippedQueue = Arrays.copyOfRange(skippedQueue, 0, Math.min(peekNum, skippedQueue.length));

        return skippedQueue;
    }

    private int getCurrentSongIndex(String songId, Song[] playList) {
        for (int i = 0; i < playList.length; i++) {
            if (playList[i].getSongId().equals(songId)) {
                return i;
            }
        }
        return -1;
    }
}
