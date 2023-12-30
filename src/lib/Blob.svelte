<script>
	import { onMount } from "svelte";

	/** @type {string} */
	export let color;

	/** @type {{
	 * 	size: number;
	 * 	x: number;
	 * 	y: number;
	 *	duration: number;
	 * }[]} */
	let circles = [];

	let scale = 1;

	onMount(() => {
		for (let i = 0; i < 5; i++) {
			const size = (Math.random() * 64 + 64) / 2;
			const x = Math.random() * 100 + 72;
			const y = Math.random() * 100 + 72;
			const duration = Math.random() * 3000 + 2000;

			let circle = {
				size,
				x,
				y,
				duration,
			};

			circles.push(circle);

			setInterval(() => {
				circle.x = Math.random() * 100 + 72;
				circle.y = Math.random() * 100 + 72;
				circles = circles;
			}, duration);
		}

		circles = circles;

		setInterval(() => {
			scale = Math.random() * 0.5 + 0.8;
		}, 3000);
	});
</script>

<svg
	viewBox="0 0 256 256"
	xmlns="http://www.w3.org/2000/svg"
	class="blob"
	style="--color: {color}; --scale: {scale};"
>
	{#each circles as circle}
		<circle
			cx="0"
			cy="0"
			r={circle.size}
			fill={color}
			style="--x: {circle.x}px; --y: {circle.y}px; --duration: {circle.duration}ms;"
			class="circle"
		></circle>
	{/each}
</svg>

<style>
	.blob {
		width: 30vw;
		overflow: visible;
		filter: drop-shadow(0 0 1rem var(--color))
			drop-shadow(0 0 3rem var(--color));
		transform: scale(var(--scale));
		transition: transform 3s ease;
	}

	.circle {
		transform: translate(var(--x), var(--y));
		transition: transform var(--duration) cubic-bezier(0.25, 0, 0.75, 1);
	}
</style>
