import React, { FC, useContext, useEffect } from "react";
import { TracksContext } from "../Context/TracksContext/TracksContext";
import { clearTracks } from "../../actions";
import Track from "../Track/Track";

type TrackListProps = {
	isResultLoaded?: boolean;
	handleSetNextResult?: () => void;
}

const TrackList: FC<TrackListProps> = ({ isResultLoaded, handleSetNextResult }) => {

	const {state, dispatch} = useContext(TracksContext);

	const handleScroll = (event) => {
		const isBottomOfList = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
		if (isBottomOfList) handleSetNextResult();
	}

	useEffect(() => {
		return () => {
			dispatch(clearTracks());
		}
	}, []);

	return (
		<div className="track-list" style={{height: '300px', overflow: 'scroll'}} onScroll={(event) => handleScroll(event)}>
			{state.tracks.map((item, idx) => (
				<Track key={item.track.id} idx={idx} trackInfo={item} />
			))}
			{isResultLoaded === false && <p>Loading</p>}
		</div>
	);
};

export default TrackList;
