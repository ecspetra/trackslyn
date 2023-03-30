import React, { FC, useContext } from "react";
import { setCurrentTrack } from "../../actions";
import { TracksContext } from "../Context/TracksContext/TracksContext";

type Track = {
	track: {
		id: string,
		album: {
			name: string
		},
		name: string,
		artists: [],
		preview_url: string,
	}
}

type TrackProps = {
	idx: number;
	trackInfo: Track;
}

const Track: FC<TrackProps> = ({ idx, trackInfo }) => {
	const {dispatch} = useContext(TracksContext);

	const handleSetCurrentTrack = (trackInfo) => {
		dispatch(setCurrentTrack(idx, trackInfo.track));
	}

	return (
		<div>
			<p>{trackInfo.track.name}</p>
			<p>{trackInfo.track.album.name}</p>
			<p>{trackInfo.track.preview_url}</p>
			<button onClick={() => handleSetCurrentTrack(trackInfo)}>SetCurrentTrack</button>
			{trackInfo.track.artists.map((artist: Track['track']) => <p key={artist.name}>{artist.name}</p>)}
		</div>
	);
};

export default Track;