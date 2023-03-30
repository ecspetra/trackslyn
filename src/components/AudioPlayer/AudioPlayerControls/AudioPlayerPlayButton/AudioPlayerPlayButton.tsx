import React, { FC } from "react";

type AudioPlayerPlayButtonProps = {
	isPlaying: boolean;
	handlePlayTrack: () => void;
	handlePauseTrack: () => void;
}

const AudioPlayerPlayButton: FC<AudioPlayerPlayButtonProps> = ({ isPlaying, handlePlayTrack, handlePauseTrack }) => {
	return (
		<button className="audio-player-play-button" onClick={isPlaying ? () => handlePauseTrack() : () => handlePlayTrack()}>{isPlaying ? 'Pause' : 'Play'}</button>
	)
}

export default AudioPlayerPlayButton;