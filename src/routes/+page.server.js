import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "$env/static/private";

/** @type {import('./$types').PageServerLoad} */
export function load() {
	return {
		client_id: SPOTIFY_CLIENT_ID,
		client_secret: SPOTIFY_CLIENT_SECRET,
	};
}
