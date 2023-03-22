import React from "react";
import '../../App.css';
import useAccessToken from "../../hooks/useAccessToken";
import { AUTH_LINK } from "../../auth/spotify-auth";
import { LINK_TO_FETCH_MY_TRACKS } from "../../linksToFetch/linksToFetch";
import TrackList from "../TrackList/TrackList";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import { TracksContextProvider } from "../Context/TracksContext/TracksContext";

const App = () => {

	const [token, handleLogout] = useAccessToken();

	return (
		<div className="App">
			<header className="App-header">
				{!token ? <a href={AUTH_LINK}>Login to Spotify</a> : <button onClick={handleLogout}>Logout</button>}
			</header>
			{/*<FetchSource linkToFetch={LINK_TO_FETCH_MY_TRACKS}>*/}
			{/*	<TracksContextProvider>*/}
			{/*		<AudioPlayer />*/}
			{/*		<TrackList />*/}
			{/*	</TracksContextProvider>*/}
			{/*</FetchSource>*/}

			<TracksContextProvider linkToFetch={LINK_TO_FETCH_MY_TRACKS}>
				<AudioPlayer />
				<TrackList />
			</TracksContextProvider>
		</div>
	);
}

export default App;