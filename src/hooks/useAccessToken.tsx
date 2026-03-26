import { useEffect, useState } from "react";
import { REDIRECT_URI, CLIENT_ID } from "../auth/spotify-auth";

const useAccessToken = () => {
	const [token, setToken] = useState<string>("");

	const handleLogout = () => {
		setToken("");
		localStorage.removeItem("token");
	};

	useEffect(() => {
		const code = new URLSearchParams(window.location.search).get("code");
		const storedToken = localStorage.getItem("token");

		if (storedToken) {
			setToken(storedToken);
			return;
		}

		if (code) {
			const codeVerifier = localStorage.getItem("code_verifier");

			fetch("https://accounts.spotify.com/api/token", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					client_id: CLIENT_ID,
					grant_type: "authorization_code",
					code,
					redirect_uri: REDIRECT_URI,
					code_verifier: codeVerifier || "",
				}),
			})
				.then(res => res.json())
				.then(data => {
					
					if (data.access_token) {
						localStorage.setItem("token", data.access_token);
						setToken(data.access_token);
						window.history.replaceState({}, document.title, "/");
					}
				});
		}
	}, []);

	return [token, handleLogout] as const;
};

export default useAccessToken;