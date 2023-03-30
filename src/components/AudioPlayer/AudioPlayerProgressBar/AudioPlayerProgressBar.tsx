import React, { FC, useContext, useEffect, useRef, useState } from "react";
import AudioPlayerResetButton from "../AudioPlayerControls/AudioPlayerResetButton/AudioPlayerResetButton";
import AudioPlayerPlayButton from "../AudioPlayerControls/AudioPlayerPlayButton/AudioPlayerPlayButton";
import AudioPlayerSwitchButton from "../AudioPlayerControls/AudioPlayerSwitchButton/AudioPlayerSwitchButton";
import {setCurrentTrack} from "../../../actions";
import {TracksContext} from "../../Context/TracksContext/TracksContext";

type Track = {
    track: {
        id: string,
        album: {
            name: string
        },
        name: string,
        artists: [],
        preview_url: string,
    }
}

type AudioPlayerProgressBarProps = {
    trackRef: React.RefObject<any>;
    trackSrc: string;
    trackIdx: number;
    prevTrackFromState: Track;
    nextTrackFromState: Track;
}

const AudioPlayerProgressBar: FC<AudioPlayerProgressBarProps> = ({ trackRef, trackSrc, trackIdx, prevTrackFromState, nextTrackFromState }) => {
    const {dispatch} = useContext(TracksContext);
    const progressBarRef = useRef(null);
    const volumeBarRef = useRef(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const handleUpdateCurrentTime = () => {
        setCurrentTime(trackRef.current.currentTime);
    }

    const handleSetDuration = () => {
        setDuration(Math.round(trackRef.current.duration));
    }

    const handlePlayTrack = () => {
        trackRef.current.play();
        setIsPlaying(true);
    }

    const handlePauseTrack = () => {
        trackRef.current.pause();
        setIsPlaying(false);
    }

    const handleResetTrack = () => {
        handlePauseTrack();
        trackRef.current.currentTime = 0;
    }

    const handleSelectCurrentTime = () => {
        trackRef.current.currentTime = progressBarRef.current.value;
    }

    const handleSetPrevTrack = () => {
        if (prevTrackFromState) {
            handlePauseTrack();
            dispatch(setCurrentTrack(trackIdx - 1, prevTrackFromState.track));
        }
    }

    const handleSetNextTrack = () => {
        if (nextTrackFromState) {
            handlePauseTrack();
            dispatch(setCurrentTrack(trackIdx + 1, nextTrackFromState.track));
        }
    }

    const handleSetVolume = (event) => {
        trackRef.current.volume = event.target.value;
    }

    useEffect(() => {
        progressBarRef.current.value = currentTime;
    }, [currentTime]);

    const getMinutesAndSeconds = (value) => {
        const format = val => `0${Math.floor(val)}`.slice(-2);
        const minutes = (value % 3600) / 60;

        return [minutes, value % 60].map(format).join(':');
    }

    return (
        <>
            <audio
                ref={trackRef}
                src={trackSrc}
                onTimeUpdate={handleUpdateCurrentTime}
                onLoadedMetadata={handleSetDuration}
            />
            <p>{getMinutesAndSeconds(currentTime)} / {getMinutesAndSeconds(duration)}</p>
            <input ref={progressBarRef} type="range" id="track" min="0" max={duration} step="0.01" onChange={handleSelectCurrentTime} />
            <input ref={volumeBarRef} type="range" id="volume" min="0" max="1" step="0.1" onChange={handleSetVolume} />
            <AudioPlayerResetButton handleResetTrack={handleResetTrack} />
            <AudioPlayerPlayButton isPlaying={isPlaying} handlePlayTrack={handlePlayTrack} handlePauseTrack={handlePauseTrack} />
            {prevTrackFromState && <AudioPlayerSwitchButton handleSwitchTrack={handleSetPrevTrack}>Prev</AudioPlayerSwitchButton>}
            {nextTrackFromState && <AudioPlayerSwitchButton handleSwitchTrack={handleSetNextTrack}>Next</AudioPlayerSwitchButton>}
        </>
    )
}

export default AudioPlayerProgressBar;