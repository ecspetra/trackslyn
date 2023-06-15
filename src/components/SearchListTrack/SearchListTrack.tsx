import React, {FC, useContext} from "react";
import TrackPlayButton from "../Track/TrackPlayButton/TrackPlayButton";
import {TracksContext} from "../Context/TracksContext/TracksContext";
import {setCurrentTrack} from "../../actions";
import Disk from "../../images/icons/Disk";
import "./assets/index.scss";

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

type SearchListTrackProps = {
    trackInfo: Track;
}

const SearchListTrack: FC<SearchListTrackProps> = ({ trackInfo }) => {
    const {dispatch} = useContext(TracksContext);

    const trackName = trackInfo.track.name;
    const trackAlbumName = trackInfo.track.album.name;

    const handleSetCurrentTrack = (trackInfo) => {
        dispatch(setCurrentTrack(0, trackInfo.track));
    }

    return (
        <div className="search-list-track">
            <div className="search-list-track__name-wrap">
                <p className="search-list-track__name">{trackName}</p>
                <div className="search-list-track__artist-wrap">
                    {trackInfo.track.artists.map((artist: Track['track'], idx) => <p className="search-list-track__artist-name" key={artist.name}>{idx === trackInfo.track.artists.length - 1 ? artist.name : (artist.name + ',')}</p>)}
                </div>
                <div className="search-list-track__album-wrap">
                    <Disk />
                    <p className="search-list-track__album">{trackAlbumName}</p>
                </div>
            </div>
            <TrackPlayButton handleSetCurrentTrack={handleSetCurrentTrack} trackInfo={trackInfo} />
        </div>
    );
};

export default SearchListTrack;