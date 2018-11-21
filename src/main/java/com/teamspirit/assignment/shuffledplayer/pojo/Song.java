package com.teamspirit.assignment.shuffledplayer.pojo;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
@JsonDeserialize(builder = Song.SongBuilder.class)
public class Song {
    private String songId;
    private String songName;
    private String artist;
    private String album;
    private String lyrics;
    private String time;

    @JsonPOJOBuilder(withPrefix = "")
    public static final class SongBuilder {
    }
}
