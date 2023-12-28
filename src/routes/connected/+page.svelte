<script>
	import { onMount } from "svelte";

	/** @type {import('./$types').PageData} */
	export let data;

	onMount(async () => {
		if (!data.error && data.code) {
			const response = await fetch("https://accounts.spotify.com/api/token", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization:
						"Basic " + btoa(data.client_id + ":" + data.client_secret),
				},
				body: new URLSearchParams({
					grant_type: "authorization_code",
					code: data.code,
					redirect_uri: data.redirect_uri,
				}),
			});

			const { access_token, refresh_token, expires_in } = await response.json();

			localStorage.setItem("access_token", access_token);
			localStorage.setItem("refresh_token", refresh_token);
			localStorage.setItem(
				"expires_at",
				String(Date.now() + expires_in * 1000)
			);
		}
	});
</script>

<div class="page">
	<div class="welcome-card">
		<div class="title">Welcome to Musical Blobs !</div>
		<div class="subtitle">
			Now every time you come to this page, the blobs will have the color of the
			music currently playing on Spotify.
		</div>
		<a href="/" class="button">Go home</a>
	</div>
</div>

<style>
	.page {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--dark-color);
	}

	.welcome-card {
		width: 48%;
		padding: 2rem;
		background: var(--light-color);
		color: var(--dark-color);
		border-radius: 2rem;
	}

	.title {
		margin: 0;
		font-size: 3rem;
		font-weight: 700;
	}

	.subtitle {
		font-size: 1.2rem;
		font-weight: 500;
	}

	.button {
		display: block;
		width: max-content;
		margin-top: 2rem;
		padding: 1rem 2rem;
		border-radius: 2rem;
		font-size: 1.5rem;
		font-weight: 600;
		text-decoration: none;
		background: var(--primary-color);
		color: var(--dark-color);
		transition: all 0.4s ease;
	}

	.button:hover {
		background: var(--dark-primary-color);
		color: var(--light-color);
	}
</style>
