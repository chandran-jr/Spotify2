import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "streaming",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
].join(",");

const params = {
  scope: scopes,
};

const queryParamsString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamsString.toString()}`;
/*
const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" + queryParamsString.toString();
  */
//console.log("**********8" + LOGIN_URL);

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };