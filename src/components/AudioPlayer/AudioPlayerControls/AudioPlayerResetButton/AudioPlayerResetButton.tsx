import React, { FC } from "react";

type AudioPlayerResetButtonProps = {
    handleResetTrack: () => void;
}

const AudioPlayerResetButton: FC<AudioPlayerResetButtonProps> = ({ handleResetTrack }) => {
    return (
        <button className="audio-player-play-button" onClick={() => handleResetTrack()}>Reset</button>
    )
}

export default AudioPlayerResetButton;