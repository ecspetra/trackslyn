import React, { FC } from "react";
import Sound from "../../../../images/icons/Sound";
import Mute from "../../../../images/icons/Mute";
import Button from "../../../Button/Button";

type AudioPlayerMuteButtonProps = {
	isMuted: boolean;
	handleMuteTrack: () => void;
	handleUnMuteTrack: () => void;
}

const AudioPlayerMuteButton: FC<AudioPlayerMuteButtonProps> = ({ isMuted, handleMuteTrack, handleUnMuteTrack }) => {
	return (
		<Button className="generic-button--secondary audio-player-button" handleButtonOnClick={isMuted ? handleUnMuteTrack : handleMuteTrack}>{isMuted ? <Sound /> : <Mute />}</Button>
	)
}

export default AudioPlayerMuteButton;