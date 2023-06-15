import React from "react";
import './assets/index.scss';
import useAccessToken from "../../hooks/useAccessToken";
import { BrowserRouter } from "react-router-dom";
import {LINK_TO_FETCH_MY_TRACKS} from "../../constants/linksToFetch";
import {TracksContextProvider} from "../Context/TracksContext/TracksContext";
import SignedInContent from "../SignedInContent/SignedInContent";
import { AUTH_LINK } from "../../auth/spotify-auth";
import Logo from "../Logo/Logo";

const App = () => {

	const [token, handleLogout] = useAccessToken();

	const getAppContent = () => {
		if (token) {
			return (
				<TracksContextProvider linkToFetch={LINK_TO_FETCH_MY_TRACKS} token={token} handleLogout={handleLogout}>
					<SignedInContent token={token} handleLogout={handleLogout} />
				</TracksContextProvider>
			)
		} else {
			return (
				<div className="app__auth">
					<Logo />
					<a className="app__auth-link" href={AUTH_LINK}>Please Sign in</a>
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