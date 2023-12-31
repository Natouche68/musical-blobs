<script>
	import { onMount, onDestroy } from "svelte";

	/** @type {string} */
	export let color;

	/** @type {{
	 * 	size: number;
	 * 	x: number;
	 * 	y: number;
	 *	duration: number;
	 * }[]} */
	let circles = [];

	/** @type {number[]} */
	const intervals = [];

	onMount(() => {
		for (let i = 0; i < 4; i++) {
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

			intervals.push(
				setInterval(() => {
					circle.x = Math.random() * 100 + 72;
					circle.y = Math.random() * 100 + 72;
					circles = circles;
				}, duration)
			);
		}

		circles = circles;
	});

	onDestroy(() => {
		intervals.forEach((interval) => clearInterval(interval));
	});
</script>

<svg
	viewBox="0 0 256 256"
	xmlns="http://www.w3.org/2000/svg"
	class="blob"
	style="--color: {color};"
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
		filter: drop-shadow(0 0 2rem var(--color));
		transition: transform 3s ease;
	}

	.circle {
		transform: translate(var(--x), var(--y));
		transition: all var(--duration) cubic-bezier(0.25, 0, 0.75, 1);
	}
</style>
