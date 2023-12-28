<script>
	import { onMount } from "svelte";
	import Login from "$lib/Login.svelte";

	/** @type {import('./$types').PageData} */
	export let data;

	let is_connected = false;

	onMount(async () => {
		let access_token = localStorage.getItem("access_token");
		let refresh_token = localStorage.getItem("refresh_token");
		let expires_at = localStorage.getItem("expires_at");

		if (access_token && refresh_token && expires_at) {
			is_connected = true;

			if (Date.now() > Number(expires_at)) {
				const response = await fetch("https://accounts.spotify.com/api/token", {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
						Authorization:
							"Basic " + btoa(data.client_id + ":" + data.client_secret),
					},
					body: new URLSearchParams({
						grant_type: "refresh_token",
						refresh_token: refresh_token,
					}),
				});

				const json = await response.json();

				access_token = json.access_token;
				refresh_token = json.refresh_token;
				expires_at = String(Date.now() + json.expires_in * 1000);

				localStorage.setItem("access_token", access_token || "");
				localStorage.setItem("refresh_token", refresh_token || "");
				localStorage.setItem("expires_at", expires_at);
			}

			const response = await fetch(
				"https://api.spotify.com/v1/me/player/currently-playing",
				{
					method: "GET",
					headers: {
						Authorization: "Bearer " + access_token,
					},
				}
			);

			const json = await response.json();

			if (json.currently_playing_type === "track") {
				console.log(json.item.album.images[0].url);
			} else if (json.currently_playing_type === "episode") {
				console.log(json.item.images[0].url);
			}
		}
	});
</script>

{#if is_connected}
	<h1>Musical Blobs</h1>
{:else}
	<Login />
{/if}
