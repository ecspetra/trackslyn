import React, { useEffect, useState } from "react";
import './assets/index.scss';
import { BrowserRouter } from "react-router-dom";
import {LINK_TO_FETCH_MY_TRACKS} from "../../constants/linksToFetch";
import {TracksContextProvider} from "../Context/TracksContext/TracksContext";
import SignedInContent from "../SignedInContent/SignedInContent";
import Logo from "../Logo/Logo";
import useAccessToken from "../../hooks/useAccessToken";
import { getAuthLink } from "../../auth/spotify-auth";

const App = () => {
	const [token, handleLogout] = useAccessToken();
	const [authUrl, setAuthUrl] = useState("");

	useEffect(() => {
		getAuthLink().then(setAuthUrl);
	}, []);

	const getAppContent = () => {
		if (token) {
			return (
				<TracksContextProvider linkToFetch={LINK_TO_FETCH_MY_TRACKS} token={token as string} handleLogout={handleLogout as (() => void)}>
					<SignedInContent token={token as string} handleLogout={handleLogout as (() => void)} />
				</TracksContextProvider>
			)
		} else {
			return (
				<div className="app__auth">
					<Logo />
					<a className="app__auth-link" href={authUrl}><span className="app__auth-link-content">Please Sign in</span></a>
				</div>
			)
		}
	}

	return (
		<BrowserRouter>
			<div className="app">
				{getAppContent()}
			</div>
		</BrowserRouter>
	);
}

export default App;