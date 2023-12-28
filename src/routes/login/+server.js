import { redirect } from "@sveltejs/kit";
import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from "$env/static/private";

/** @type {import('./$types').RequestHandler} */
export function GET() {
	const scope = "user-read-currently-playing";

	const url = new URL("https://accounts.spotify.com/authorize");
	url.searchParams.set("response_type", "code");
	url.searchParams.set("scope", scope);
	url.searchParams.set("client_id", SPOTIFY_CLIENT_ID);
	url.searchParams.set("redirect_uri", SPOTIFY_REDIRECT_URI);

	throw redirect(307, url);
}
