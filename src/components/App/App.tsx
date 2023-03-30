import React from "react";
import './assets/index.css';
import useAccessToken from "../../hooks/useAccessToken";
import { AUTH_LINK } from "../../auth/spotify-auth";
import { LINK_TO_FETCH_MY_PROFILE, LINK_TO_FETCH_MY_TRACKS } from "../../linksToFetch/linksToFetch";
import TrackList from "../TrackList/TrackList";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import { TracksContextProvider } from "../Context/TracksContext/TracksContext";
import FetchSource from "../FetchSource/FetchSource";
import UserInfo from "../UserInfo/UserInfo";

const App = () => {

	const [token, handleLogout] = useAccessToken();

	return (
		<div className="App">
			<header className="App-header">
				{!token ? <a href={AUTH_LINK}>Login to Spotify</a> : <button onClick={handleLogout}>Logout</button>}
			</header>
			<TracksContextProvider linkToFetch={LINK_TO_FETCH_MY_TRACKS} token={token}>
				<AudioPlayer />
				<TrackList />
			</TracksContextProvider>
			<FetchSource linkToFetch={LINK_TO_FETCH_MY_PROFILE}>
				<UserInfo />
			</FetchSource>
		</div>
	);
}

export default App;