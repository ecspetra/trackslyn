import React, { useContext, useEffect, useState, useRef } from "react";
import { TracksContext } from "../Context/TracksContext/TracksContext";
import AudioPlayerProgressBar from "./AudioPlayerProgressBar/AudioPlayerProgressBar";

import './assets/index.scss';
import Disk from "../../images/icons/Disk";
import Close from "../../images/icons/Close";
import Button from "../Button/Button";
import {clearCurrentTrack, clearTracks} from "../../actions";

const AudioPlayer = () => {

	const {state, dispatch} = useContext(TracksContext);
	const trackRef = useRef(null);
	const [firstTrackFromState, setFirstTrackFromState] = useState(null);
	const [prevTrackFromState, setPrevTrackFromState] = useState(null);
	const [nextTrackFromState, setNextTrackFromState] = useState(null);

	const currentTrack = state.currentTrack;

	const isTrackAlbumImageExists = currentTrack && currentTrack.track.album.images.length;
	const trackAlbumImage = currentTrack && currentTrack.track.album.images[0].url;

	const handleReceiveFirstAndPrevAndNextTrack = () => {
		setFirstTrackFromState(state.tracks.find((track, trackIndex) => trackIndex === 0));
		setPrevTrackFromState(state.tracks.find((track, trackIndex) => trackIndex === currentTrack.idx - 1));
		setNextTrackFromState(state.tracks.find((track, trackIndex) => trackIndex === currentTrack.idx + 1));
	}

	const handleClosePlayer = () => {
		dispatch(clearCurrentTrack());
	}

	useEffect(() => {
		if (currentTrack) handleReceiveFirstAndPrevAndNextTrack();
	}, [state]);

	if (!state.currentTrack) return;

	return (
		<div className="audio-player">
			<div className="audio-player__content">
				<div className="audio-player__track-info-wrap">
					<div className="audio-player__track-info">
						{isTrackAlbumImageExists && <img className="audio-player__image" src={trackAlbumImage} alt=""/>}
						<div className="audio-player__info-wrap">
							<p className="audio-player__track-name">{currentTrack.track.name}</p>
							<div className="audio-player__album-info">
								{currentTrack.track.artists.map((artist) => {
									return <p key={artist.name} className="audio-player__artist-name">{artist.name}</p>
								})}
								<Disk />
								<p className="audio-player__album-name">{currentTrack.track.album.name}</p>
							</div>
						</div>
					</div>
					<Button className="audio-player__close-button" handleButtonOnClick={handleClosePlayer}><Close /></Button>

				</div>
				<AudioPlayerProgressBar
					trackRef={trackRef}
					trackIdx={currentTrack.idx}
					trackSrc={currentTrack.track.preview_url}
					firstTrackFromState={firstTrackFromState}
					prevTrackFromState={prevTrackFromState}
					nextTrackFromState={nextTrackFromState}
				/>
			</div>
		</div>
	)
}

export default AudioPlayer;