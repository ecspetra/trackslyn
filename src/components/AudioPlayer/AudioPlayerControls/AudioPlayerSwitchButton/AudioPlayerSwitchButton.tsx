import React, { FC } from "react";
import Button from "../../../Button/Button";
import Switch from "../../../../images/icons/Switch";
import classNames from "classnames";

type AudioPlayerNextButtonProps = {
    handleSetPrevTrack?: () => void;
    handleSetNextTrack?: () => void;
    isPrevTrackExists?: boolean,
    isNextTrackExists?: boolean,
    isPrevButton?: boolean;
}
const AudioPlayerSwitchButton: FC<AudioPlayerNextButtonProps> = ({ handleSetPrevTrack, handleSetNextTrack, isPrevTrackExists, isNextTrackExists, isPrevButton }) => {
    return (
        <>
            {
                isPrevButton ? (
                    <Button className={classNames('audio-player-switch-button', 'audio-player-switch-button--prev', isPrevTrackExists === false && 'disabled')} handleButtonOnClick={handleSetPrevTrack}><Switch /></Button>
                    ) : (
                    <Button className={classNames('audio-player-switch-button', isNextTrackExists === false && 'disabled')} handleButtonOnClick={handleSetNextTrack}><Switch /></Button>
                )
            }
        </>
    )
}

export default AudioPlayerSwitchButton;