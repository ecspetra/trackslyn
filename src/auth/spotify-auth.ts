export const CLIENT_ID = "311bcf78c360405099597286478222fd";
export const REDIRECT_URI = "https://trackslyn.yuliia-tkachenko.dev/";
export const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
export const SCOPE = "user-library-read%20user-read-private%20user-read-email%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played%20user-top-read%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-private%20playlist-modify-public";

export const sha256 = async (plain: string) => {
	const encoder = new TextEncoder();
	const data = encoder.encode(plain);
	const hash = await crypto.subtle.digest("SHA-256", data);
	return btoa(String.fromCharCode(...new Uint8Array(hash)))
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
}

export const generateRandomString = (length: number) => {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	const array = new Uint8Array(length);
	crypto.getRandomValues(array);
	for (let i = 0; i < length; i++) {
		result += chars[array[i] % chars.length];
	}
	return result;
}

export async function getAuthLink() {
	const codeVerifier = generateRandomString(64);
	const codeChallenge = await sha256(codeVerifier);

	localStorage.setItem("code_verifier", codeVerifier);

	const scope = [
		"user-library-read",
		"user-read-private",
		"user-read-email",
		"user-read-playback-state",
		"user-modify-playback-state",
		"user-read-recently-played",
		"user-top-read",
		"playlist-read-private",
		"playlist-read-collaborative",
		"playlist-modify-private",
		"playlist-modify-public"
	].join(" ");

	return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
		REDIRECT_URI
	)}&scope=${encodeURIComponent(scope)}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
}