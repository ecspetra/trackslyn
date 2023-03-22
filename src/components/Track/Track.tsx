import React, { FC, useContext } from "react";
import { setCurrentTrack } from "../../actions/actions";
import { TracksContext } from "../Context/TracksContext/TracksContext";

type Track = {
	track: {
		id: string,
		album: {
			name: string
		},
		name: string,
		artists: [],
	}
}

type TrackProps = {
	trackInfo: Track;
}

const Track: FC<TrackProps> = ({ trackInfo }) => {
	const {dispatch} = useContext(TracksContext);

	const handleSetCurrentTrack = (trackInfo) => {
		dispatch(setCurrentTrack(trackInfo.track));
	}

	return (
		<div>
			<p>{trackInfo.track.name}</p>
			<p>{trackInfo.track.album.name}</p>
			<button onClick={() => handleSetCurrentTrack(trackInfo)}>SetCurrentTrack</button>
			{trackInfo.track.artists.map((artist: Track['track']) => <p key={artist.name}>{artist.name}</p>)}
		</div>
	);
};

export default Track;