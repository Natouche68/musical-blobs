import {
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REDIRECT_URI,
} from "$env/static/private";

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	return {
		code: url.searchParams.get("code") || null,
		error: url.searchParams.get("error") || null,
		client_id: SPOTIFY_CLIENT_ID,
		client_secret: SPOTIFY_CLIENT_SECRET,
		redirect_uri: SPOTIFY_REDIRECT_URI,
	};
}
