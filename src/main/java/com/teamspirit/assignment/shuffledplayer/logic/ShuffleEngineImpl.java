package com.teamspirit.assignment.shuffledplayer.logic;

import com.teamspirit.assignment.shuffledplayer.pojo.Song;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;
import java.util.Queue;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class ShuffleEngineImpl implements ShuffleEngine {

    static final Song defaultSong = Song.builder().songId("demoSong").songName("TeamSpirit Song").artist("Staff")
            .album("Demo album").lyrics("Lyrics").time("4:03")
            .build();
    static final Song[] fixedPlayList = getSongs();
    static Song[] dynamicPlayList = fixedPlayList.clone();
    static Queue<Song> queue = new ArrayDeque<Song>();
    static Deque<Song> stack = new ArrayDeque<Song>();
    static String playMode = "shuffle";
    static int peekMax = 5;
    static int index = 0;
    static String[] playLists = {"playList1","playList2","playList3"};

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

    private void setQueue(Queue<Song> queue, Song[] playList) {
        for (int i = 0; i < playList.length; i++) {
            queue.offer(playList[i]);
        }
    }

    @Override
    public Song getNextSong(String currentPlayMode, String songId) {
        //TODO improve id here
        if(songId.equals("demoSong")){
            stack.add(defaultSong);
        }else{
            Song currentSong = fixedPlayList[Integer.valueOf(songId)];
            stack.add(currentSong);
        }

        if (!ShuffleEngineImpl.playMode.equals(currentPlayMode)) {
            queue.clear();
            Song[] playList = setSongs(dynamicPlayList, currentPlayMode);
            setQueue(queue, playList);
        }
        if (queue.isEmpty()) {
            Song[] playList = setSongs(dynamicPlayList, currentPlayMode);
            setQueue(queue, playList);
        }

        return queue.remove();
    }

    @Override
    public Song getPreviousSong(String playMode) {
        if (stack.isEmpty()) {
            return null;
        }
        //TODO add to queue first element
        return stack.pop();
    }

    @Override
    public Song[] peekQueue(Integer peekNumber) {
        return null;
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
