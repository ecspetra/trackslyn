import React, { FC, useContext } from "react";
import { setCurrentTrack } from "../../actions";
import { TracksContext } from "../Context/TracksContext/TracksContext";
import "./assets/index.scss";
import TrackPlayButton from "./TrackPlayButton/TrackPlayButton";
import Disk from "../../images/icons/Disk";

type TrackType = {
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

type TrackProps = {
	idx: number;
	trackInfo: TrackType;
}

const Track: FC<TrackProps> = ({ idx, trackInfo }) => {

	const {dispatch} = useContext(TracksContext);

	const isTrackAlbumImageExists = trackInfo.track.album.images.length;
	const trackName = trackInfo.track.name;
	const trackAlbumName = trackInfo.track.album.name;
	const trackAlbumImage = trackInfo.track.album.images[0].url;

	const handleSetCurrentTrack = (trackInfo) => {
		dispatch(setCurrentTrack(idx, trackInfo.track));
	}

	return (
		<div className="track">
			<div className="track__bg-wrap">
				<img className="track__bg" src={trackAlbumImage} alt=""/>
			</div>
			<div className="track__info-wrap">
				{isTrackAlbumImageExists && <img className="track__image" src={trackAlbumImage} alt=""/>}
				<div className="track__name-wrap">
					<p className="track__name">{trackName}</p>
					<div className="track__artist-wrap">
						{trackInfo.track.artists.map((artist: TrackType['track'], idx) => <p className="track__artist-name" key={artist.name}>{idx === trackInfo.track.artists.length - 1 ? artist.name : (artist.name + ',')}</p>)}
					</div>
					<div className="track__album-wrap">
						<Disk />
						<p className="track__album">{trackAlbumName}</p>
					</div>
				</div>
			</div>
			<TrackPlayButton handleSetCurrentTrack={handleSetCurrentTrack} trackInfo={trackInfo} />
		</div>
	);
};

export default Track;