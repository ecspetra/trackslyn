import { useEffect, useState } from "react";

const useAccessToken = () => {

	const [token, setToken] = useState<string>("");

	const handleLogout = () => {
		setToken("");
		window.localStorage.removeItem("token");
	}

	useEffect(() => {
		const hash = window.location.hash;
		let token = window.localStorage.getItem("token");

		if (!token && hash) {
			token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

			window.location.hash = "";
			window.localStorage.setItem("token", token);
		}

		setToken(token);

	}, []);

	return [token, handleLogout];
}

export default useAccessToken;