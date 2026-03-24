import { useEffect, useState } from "react";

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
					client_id: "311bcf78c360405099597286478222fd",
					grant_type: "authorization_code",
					code,
					redirect_uri: "https://trackslyn.yuliia-tkachenko.dev/",
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