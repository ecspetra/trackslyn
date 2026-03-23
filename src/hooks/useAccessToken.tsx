import { useEffect, useState } from "react";

const useAccessToken = () => {
	const [token, setToken] = useState<string>("");

	const handleLogout = () => {
		setToken("");
		window.localStorage.removeItem("token");
	};

	useEffect(() => {
		let tokenFromStorage = window.localStorage.getItem("token");
		const hash = window.location.hash;

		if (!tokenFromStorage && hash) {
			const params = new URLSearchParams(hash.substring(1));
			const accessToken = params.get("access_token");

			if (accessToken) {
				tokenFromStorage = accessToken;
				window.localStorage.setItem("token", accessToken);
			}

			window.location.hash = "";
		}

		setToken(tokenFromStorage || "");
	}, []);

	return [token, handleLogout] as const;
};

export default useAccessToken;