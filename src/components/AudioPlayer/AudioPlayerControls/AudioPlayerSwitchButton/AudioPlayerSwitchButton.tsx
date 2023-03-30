import React, { FC, ReactNode } from "react";

type AudioPlayerNextButtonProps = {
    handleSwitchTrack: () => void;
    children: ReactNode;
}

const AudioPlayerSwitchButton: FC<AudioPlayerNextButtonProps> = ({ handleSwitchTrack, children }) => {
    return (
        <button className="audio-player-play-button" onClick={() => handleSwitchTrack()}>{children}</button>
    )
}

export default AudioPlayerSwitchButton;