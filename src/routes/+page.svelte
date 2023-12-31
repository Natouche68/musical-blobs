<script>
	import { onMount, onDestroy } from "svelte";
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
	let songName = "";
	let songArtist = "";

	/** @type {number} */
	let interval;

	onMount(() => {
		getColors();
		interval = setInterval(getColors, 10000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	async function getColors() {
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

			songName = json.item.name;

			if (json.currently_playing_type === "track") {
				imgSrc = json.item.album.images[0].url;
				songArtist = json.item.artists[0].name;
			} else if (json.currently_playing_type === "episode") {
				imgSrc = json.item.images[0].url;
				songArtist = json.item.show.publisher;
			}

			const extractedColors = await analyze(imgSrc, { scale: 0.5 });

			colors = [];
			colors.push(
				extractedColors[0].color,
				extractedColors[Math.floor(extractedColors.length * (1 / 10))].color,
				extractedColors[Math.floor(extractedColors.length * (2 / 10))].color,
				extractedColors[Math.floor(extractedColors.length * (3 / 10))].color,
				extractedColors[Math.floor(extractedColors.length * (4 / 10))].color
			);

			colors = colors.sort(() => {
				return Math.random() - 0.5;
			});

			document.body.style.backgroundColor =
				extractedColors[Math.floor(extractedColors.length * (7 / 10))].color;
		}
	}
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
		<div class="current-song">
			<img src={imgSrc} alt="Song Cover" class="song-cover" />
			<div class="song-infos">
				<div class="name">{songName}</div>
				<div class="artist">{songArtist}</div>
			</div>
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
		margin-top: -5rem;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.current-song {
		position: absolute;
		bottom: 0;
		width: 100vw;
		padding: 1rem 2rem;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		gap: 2rem;
		background: linear-gradient(transparent, #000000b0);
	}

	.song-cover {
		width: 7rem;
		border-radius: 1rem;
	}

	.song-infos {
		color: #fff;
	}

	.name {
		font-size: 1.8rem;
		font-weight: 500;
	}

	.artist {
		font-size: 1.5rem;
	}
</style>
