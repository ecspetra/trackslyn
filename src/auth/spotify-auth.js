export const CLIENT_ID = "311bcf78c360405099597286478222fd";
export const REDIRECT_URI = "https://ecspetra.github.io/tracks-list/";
export const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
export const RESPONSE_TYPE = "token";
export const SCOPE = "user-library-read%20user-read-private%20user-read-email%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played%20user-top-read%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-private%20playlist-modify-public";
export const AUTH_LINK = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}`;