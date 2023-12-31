<svelte:head>
	<title>Musical Blobs</title>
</svelte:head>

<slot />

<style>
	@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

	:global(body) {
		margin: 0;
		padding: 0;
		font-family: "Poppins", sans-serif;
		font-size: 8px;

		--light-color: #82e8a5;
		--light-primary-color: #49e07e;
		--primary-color: #23cf5f;
		--dark-primary-color: #199243;
		--dark-color: #020f07;

		background: #000;
		color: var(--light-color);

		transition: background 3s ease;
	}
</style>
