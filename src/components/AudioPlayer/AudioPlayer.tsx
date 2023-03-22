import React, { useContext } from "react";
import AudioPlayerPlayButton from "./AudioPlayerControls/AudioPlayerPlayButton/AudioPlayerPlayButton";
import { TracksContext } from "../Context/TracksContext/TracksContext";

const AudioPlayer = () => {

	const {state} = useContext(TracksContext);

	return (
		<div className="audio-player">
			{state.currentTrack && <p>{state.currentTrack.track.id}</p>}
			<AudioPlayerPlayButton />
		</div>
	)
}

export default AudioPlayer;