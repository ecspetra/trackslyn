import React, { FC } from "react";
import Play from "../../../images/icons/Play";
import Button from "../../Button/Button";

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

type TrackPlayButtonProps = {
    trackInfo: Track;
    handleSetCurrentTrack: (trackInfo) => void;
}

const TrackPlayButton: FC<TrackPlayButtonProps> = ({ trackInfo, handleSetCurrentTrack }) => {
    return (
        <Button className="track-play-button" handleButtonOnClick={() => handleSetCurrentTrack(trackInfo)}><Play /></Button>
    )
}

export default TrackPlayButton;