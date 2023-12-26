<div class="page">
	<div class="login-card">
		<h1 class="title">Musical Blobs</h1>
		<div class="subtitle">
			Beautiful blobs that change color with the music playing on Spotify.
		</div>
		<a href="/login" class="button">Login with Spotify</a>
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

	.login-card {
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
