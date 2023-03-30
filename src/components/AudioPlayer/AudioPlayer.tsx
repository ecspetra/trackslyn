import React, { useContext, useEffect, useState, useRef } from "react";
import { TracksContext } from "../Context/TracksContext/TracksContext";
import AudioPlayerProgressBar from "./AudioPlayerProgressBar/AudioPlayerProgressBar";

const AudioPlayer = () => {

	const {state} = useContext(TracksContext);
	const trackRef = useRef(null);
	const [prevTrackFromState, setPrevTrackFromState] = useState(null);
	const [nextTrackFromState, setNextTrackFromState] = useState(null);

	const currentTrack = state.currentTrack;

	const handleReceivePrevAndNextTrack = () => {
		setPrevTrackFromState(state.tracks.find((track, trackIndex) => trackIndex === currentTrack.idx - 1));
		setNextTrackFromState(state.tracks.find((track, trackIndex) => trackIndex === currentTrack.idx + 1));
	}

	useEffect(() => {
		if (currentTrack) handleReceivePrevAndNextTrack();
	}, [state]);

	if (!state.currentTrack) return;

	return (
		<div className="audio-player">
			<div>
				<p>{currentTrack.track.name}</p>
				<p>{currentTrack.track.album.name}</p>
				{currentTrack.track.artists.map((artist) => {
					return <p key={artist.name}>{artist.name}</p>
				})}
			</div>
			<AudioPlayerProgressBar
				trackRef={trackRef}
				trackIdx={currentTrack.idx}
				trackSrc={currentTrack.track.preview_url}
				prevTrackFromState={prevTrackFromState}
				nextTrackFromState={nextTrackFromState}
			/>
		</div>
	)
}

export default AudioPlayer;