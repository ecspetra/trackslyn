import React, { FC } from "react";
import Reset from "../../../../images/icons/Reset";
import Button from "../../../Button/Button";

type AudioPlayerResetButtonProps = {
    handleResetTrack: () => void;
}

const AudioPlayerResetButton: FC<AudioPlayerResetButtonProps> = ({ handleResetTrack }) => {
    return (
        <Button className="audio-player-reset-button" handleButtonOnClick={handleResetTrack}><Reset /></Button>
    )
}

export default AudioPlayerResetButton;