package com.teamspirit.assignment.shuffledplayer.controller;

import com.teamspirit.assignment.shuffledplayer.constant.EndPoint;
import com.teamspirit.assignment.shuffledplayer.logic.ShuffleEngine;
import com.teamspirit.assignment.shuffledplayer.logic.ShuffleEngineImpl;
import com.teamspirit.assignment.shuffledplayer.pojo.Song;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(EndPoint.API_V1)
@CrossOrigin(origins = "http://localhost:3001")
public class PlayerController {

    private final ShuffleEngine shuffleEngine = new ShuffleEngineImpl();

    @RequestMapping(value = EndPoint.NEXT_SONG, method = RequestMethod.GET)
    public Song getNextSong(@RequestParam  String songId) {
        return shuffleEngine.getNextSong(songId);
    }

    @RequestMapping(value = EndPoint.PREVIOUS_SONG, method = RequestMethod.GET)
    public Song getPreviousSong(@RequestParam String songId) {
        return shuffleEngine.getPreviousSong(songId);
    }

    @RequestMapping(value = EndPoint.PLAYLISTS, method = RequestMethod.GET)
    public String[] getPlayLists() {
        return shuffleEngine.getPlayLists();
    }

    @RequestMapping(value = EndPoint.PLAYLIST, method = RequestMethod.GET)
    public Song[] getPlayList() {
        return shuffleEngine.getPlayList();
    }

    @RequestMapping(value = EndPoint.PEEKLIST, method = RequestMethod.GET)
    public Song[] getPeekList(@RequestParam String songId) {
        return shuffleEngine.getPeekQueue(songId);
    }

    @RequestMapping(value = EndPoint.SKIPPEDPEEKLIST, method = RequestMethod.GET)
    public Song[] getSkippedPeekList(@RequestParam String skipSongId, String currentSongId) {
        return shuffleEngine.getPeekListAfterSkip( skipSongId, currentSongId);
    }

}
