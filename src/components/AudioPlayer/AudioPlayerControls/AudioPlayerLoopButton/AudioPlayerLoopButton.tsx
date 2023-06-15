import React, { FC } from "react";
import Loop from "../../../../images/icons/Loop";
import Button from "../../../Button/Button";
import classNames from "classnames";

type AudioPlayerLoopButtonProps = {
	isLooped: boolean;
	handleLoopTrack: () => void;
}

const AudioPlayerLoopButton: FC<AudioPlayerLoopButtonProps> = ({ isLooped, handleLoopTrack }) => {
	return (
		<Button className={classNames('audio-player-mute-button', isLooped && 'audio-player-mute-button--looped')} handleButtonOnClick={handleLoopTrack}>{<Loop />}</Button>
	)
}

export default AudioPlayerLoopButton;