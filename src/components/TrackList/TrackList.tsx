import React, { FC, useContext, useEffect, useState } from "react";
import { addTrack } from "../../actions/actions";
import { TracksContext } from "../Context/TracksContext/TracksContext";
import Track from "../Track/Track";

type TrackListProps = {
	handleSetNextResult?: () => void;
}

const TrackList: FC<TrackListProps> = ({ handleSetNextResult }) => {

	const {state, dispatch} = useContext(TracksContext);
	const [isResultLoaded, setIsResultLoaded] = useState(false);

	const handleScroll = (event) => {
		const isBottomOfList = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
		if (isBottomOfList) handleSetNextResult();
	}

	useEffect(() => {
		if (state.tracks) {
			state.tracks.map((item) => dispatch(addTrack(item)));
			setIsResultLoaded(true);
		}
	}, [state]);

	return (
		<div className="track-list" style={{height: '300px', overflow: 'scroll'}} onScroll={(event) => handleScroll(event)}>
			{isResultLoaded && state.tracks.map((item) => (
				<Track key={item.track.id} trackInfo={item} />
			))}
		</div>
	);
};

export default TrackList;
