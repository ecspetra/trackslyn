import React, { FC } from "react";
import Pause from "../../../../images/icons/Pause";
import Play from "../../../../images/icons/Play";
import Button from "../../../Button/Button";

type AudioPlayerPlayButtonProps = {
	isPlaying: boolean;
	handlePlayTrack: () => void;
	handlePauseTrack: () => void;
}

const AudioPlayerPlayButton: FC<AudioPlayerPlayButtonProps> = ({ isPlaying, handlePlayTrack, handlePauseTrack }) => {
	return (
		<Button className="audio-player-play-button" handleButtonOnClick={isPlaying ? handlePauseTrack : handlePlayTrack}>{isPlaying ? <Pause /> : <Play />}</Button>
	)
}

export default AudioPlayerPlayButton;