<script>
	import { onMount } from "svelte";
	import Login from "$lib/Login.svelte";
	import Blob from "$lib/Blob.svelte";
	import analyze from "rgbaster";

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {string[]} */
	let colors = [];

	let loading = true;
	let is_connected = false;
	let imgSrc = "";

	onMount(async () => {
		let access_token = localStorage.getItem("access_token");
		let refresh_token = localStorage.getItem("refresh_token");
		let expires_at = localStorage.getItem("expires_at");

		loading = false;

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
				imgSrc = json.item.album.images[0].url;
			} else if (json.currently_playing_type === "episode") {
				imgSrc = json.item.images[0].url;
			}

			const extractedColors = await analyze(imgSrc, { scale: 0.5 });

			colors.push(
				extractedColors[0].color,
				extractedColors[Math.floor(extractedColors.length * (1 / 5))].color,
				extractedColors[Math.floor(extractedColors.length * (2 / 5))].color,
				extractedColors[Math.floor(extractedColors.length * (3 / 5))].color,
				extractedColors[Math.floor(extractedColors.length * (4 / 5))].color
			);
			colors = colors;
		}
	});
</script>

{#if !loading}
	{#if is_connected}
		<div class="blobs">
			<Blob color={colors[0]} />
			<Blob color={colors[1]} />
			<Blob color={colors[2]} />
			<Blob color={colors[3]} />
			<Blob color={colors[4]} />
		</div>
	{:else}
		<Login />
	{/if}
{/if}

<style>
	:global(body) {
		overflow: hidden;
	}

	.blobs {
		margin-top: -2rem;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
</style>
