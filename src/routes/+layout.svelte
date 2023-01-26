<script>
	import '../app.postcss'
</script>

<main class="m-4 select-none touch-none overscroll-none">
	<h1 class="text-gray-700 tracking-tighter font-bold text-2xl">Svelte Signature Pad</h1>
	<p class="mt-2 mb-4 text-sm text-gray-600">
		Svelte Action to capture smoothed signatures as SVG paths using the excellent <a
			class="text-blue-700 hover:underline"
			href="https://github.com/steveruizok/perfect-freehand">perfect-freehand</a
		>
		library.
		<slot />
	</p>
</main>
