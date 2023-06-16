import React, { FC, useContext, useEffect } from "react";
import { TracksContext } from "../Context/TracksContext/TracksContext";
import { clearTracks } from "../../actions";
import Track from "../Track/Track";
import "./assets/index.scss";

type TrackListProps = {
	isResultLoaded?: boolean;
	handleSetNextResult?: () => void;
}

const TrackList: FC<TrackListProps> = ({ isResultLoaded, handleSetNextResult }) => {
	const {state, dispatch} = useContext(TracksContext);

	console.log(state)


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
		<div className="track-list" onScroll={(event) => handleScroll(event)}>
			<div className="track-list__content">
				{state.tracks.map((item, idx) => (
					<Track key={item.track.id} idx={idx} trackInfo={item} />
				))}
				{isResultLoaded === false && <p className="track-list__text">Loading...</p>}
			</div>
		</div>
	);
};

export default TrackList;
