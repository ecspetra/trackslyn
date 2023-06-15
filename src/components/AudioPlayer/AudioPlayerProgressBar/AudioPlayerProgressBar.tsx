import React, { FC, useContext, useEffect, useRef, useState } from "react";
import AudioPlayerResetButton from "../AudioPlayerControls/AudioPlayerResetButton/AudioPlayerResetButton";
import AudioPlayerPlayButton from "../AudioPlayerControls/AudioPlayerPlayButton/AudioPlayerPlayButton";
import AudioPlayerSwitchButton from "../AudioPlayerControls/AudioPlayerSwitchButton/AudioPlayerSwitchButton";
import {setCurrentTrack} from "../../../actions";
import {TracksContext} from "../../Context/TracksContext/TracksContext";
import AudioPlayerMuteButton from "../AudioPlayerControls/AudioPlayerMuteButton/AudioPlayerMuteButton";
import AudioPlayerLoopButton from "../AudioPlayerControls/AudioPlayerLoopButton/AudioPlayerLoopButton";

import './assets/index.scss';

type Track = {
    track: {
        id: string,
        album: {
            name: string,
            images: [{ [key: string]: any }],
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
    firstTrackFromState: Track;
    prevTrackFromState: Track;
    nextTrackFromState: Track;
}

const AudioPlayerProgressBar: FC<AudioPlayerProgressBarProps> = ({ trackRef, trackSrc, trackIdx, firstTrackFromState, prevTrackFromState, nextTrackFromState }) => {
    const {dispatch} = useContext(TracksContext);
    const volumeDefaultValue = '0.3';
    const progressBarRef = useRef(null);
    const volumeBarRef = useRef(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isLooped, setIsLooped] = useState<boolean>(false);
    const [volume, setVolume] = useState<string>(volumeDefaultValue);

    const isPrevTrackExists = prevTrackFromState !== undefined;
    const isNextTrackExists = nextTrackFromState !== undefined;
    const progressBarPercentage = (currentTime * 100) / duration;
    const volumeBarPercentage = (Number(volume) * 100);

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
        trackRef.current.currentTime = 0;

        if (isPlaying) handlePlayTrack();
    }

    const handleSelectCurrentTime = () => {
        trackRef.current.currentTime = progressBarRef.current.value;
    }

    const handleSetFirstTrack = async () => {
        await dispatch(setCurrentTrack(0, firstTrackFromState.track));
        handlePlayTrack();
    }

    const handleSetPrevTrack = async () => {
        if (prevTrackFromState) {
            if (isPlaying) {
                await dispatch(setCurrentTrack(trackIdx - 1, prevTrackFromState.track));
                handlePlayTrack();
            } else dispatch(setCurrentTrack(trackIdx - 1, prevTrackFromState.track));
        }
    }

    const handleSetNextTrack = async () => {
        if (nextTrackFromState) {
            if (isPlaying) {
                await dispatch(setCurrentTrack(trackIdx + 1, nextTrackFromState.track));
                handlePlayTrack();
            } else dispatch(setCurrentTrack(trackIdx + 1, nextTrackFromState.track));
        }
    }

    const handleSetVolume = (event) => {
        trackRef.current.volume = event.target.value;
        setVolume(event.target.value);

        if (trackRef.current.volume > 0) {
            setIsMuted(false);
        } else setIsMuted(true);
    }

    const handleMuteTrack = () => {
        trackRef.current.volume = 0;
        volumeBarRef.current.value = 0;
        setVolume("0");
        setIsMuted(true);
    }

    const handleUnMuteTrack = () => {
        if (volume === '0') {
            trackRef.current.volume = volumeDefaultValue;
            volumeBarRef.current.value = volumeDefaultValue;
            setVolume(volumeDefaultValue);
        } else {
            trackRef.current.volume = volume;
            volumeBarRef.current.value = volume;
        }

        setIsMuted(false);
    }

    const getMinutesAndSeconds = (value) => {
        const format = val => `0${Math.floor(val)}`.slice(-2);
        const minutes = (value % 3600) / 60;

        return [minutes, value % 60].map(format).join(':');
    }

    const handleLoopTrack = () => {
        setIsLooped(prevState => !prevState);
    }

    useEffect(() => {
        progressBarRef.current.value = currentTime;

        if (trackRef.current.currentTime === trackRef.current.duration) {
            if (isLooped) {
                handleResetTrack();
            } else {
                if (nextTrackFromState) {
                    handleSetNextTrack();
                } else handleSetFirstTrack();
            }
        }
    }, [currentTime]);

    useEffect(() => {
        handlePlayTrack();
    }, [trackSrc]);

    useEffect(() => {
        trackRef.current.volume = volume;
    }, [trackRef]);

    const progressBarStyle = {
        backgroundImage: `linear-gradient(to right, #6369ff 0%, #6369ff ${progressBarPercentage}%, #2f3369 ${progressBarPercentage}%, #2f3369 100%)`,
    }

    const volumeBarStyle = {
        backgroundImage: `linear-gradient(to right, #6369ff 0%, #6369ff ${volumeBarPercentage}%, #2f3369 ${volumeBarPercentage}%, #2f3369 100%)`,
    }

    return (
        <div className="audio-player-progress-bar">
            <audio
                ref={trackRef}
                src={trackSrc}
                onTimeUpdate={handleUpdateCurrentTime}
                onLoadedMetadata={handleSetDuration}
            />
            <div className="audio-player-progress-bar__time-wrap">
                <p className="audio-player-progress-bar__current-time">{getMinutesAndSeconds(currentTime) + ' — ' + getMinutesAndSeconds(duration)}</p>
            </div>
            <div className="audio-player-progress-bar__progress-wrap">
                <input className="audio-player-progress-bar__progress" ref={progressBarRef} style={progressBarStyle} type="range" id="track" min="0" max={duration} step="0.01" onChange={handleSelectCurrentTime} />
                <input className="audio-player-progress-bar__volume" ref={volumeBarRef} style={volumeBarStyle} type="range" id="volume" min="0" max="1" step="0.1" defaultValue={volume} onChange={handleSetVolume} />
                <div className="audio-player-progress-bar__controls-wrap">
                    <AudioPlayerMuteButton isMuted={isMuted} handleMuteTrack={handleMuteTrack} handleUnMuteTrack={handleUnMuteTrack} />
                    <AudioPlayerSwitchButton handleSetPrevTrack={handleSetPrevTrack} isPrevTrackExists={isPrevTrackExists} isPrevButton />
                    <AudioPlayerPlayButton isPlaying={isPlaying} handlePlayTrack={handlePlayTrack} handlePauseTrack={handlePauseTrack} />
                    <AudioPlayerSwitchButton handleSetNextTrack={handleSetNextTrack} isNextTrackExists={isNextTrackExists} />
                    <AudioPlayerResetButton handleResetTrack={handleResetTrack} />
                    <AudioPlayerLoopButton isLooped={isLooped} handleLoopTrack={handleLoopTrack} />
                </div>
            </div>
        </div>
    )
}

export default AudioPlayerProgressBar;