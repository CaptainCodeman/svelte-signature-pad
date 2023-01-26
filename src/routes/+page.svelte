<script lang="ts">
	import { signature } from '$lib'

	let layers: { path: string; width: number; height: number }[] = []

	let width: number
	let height: number
	let preview: string

	const ondraw = (path: string) => (preview = path)
	const oncomplete = (path: string) => {
		preview = ''
		layers = [...layers, { width, height, path }]
	}

	const clear = () => {
		layers = []
	}
</script>

<div class="relative w-full h-[360px] bg-gray-100 border border-dashed border-gray-300">
	<div class="absolute left-4 right-4 bottom-24 border-t border-dotted border-gray-300" />
	<div
		class="w-full h-full"
		use:signature={{ ondraw, oncomplete }}
		bind:clientWidth={width}
		bind:clientHeight={height}
		on:touchmove|preventDefault={() => false}
	>
		{#each layers as layer}
			<svg class="absolute w-full h-full fill-black pointer-events-none" viewBox="0 0 {layer.width} {layer.height}">
				<path d={layer.path} />
			</svg>
		{/each}

		{#if preview}
			<svg class="absolute w-full h-full fill-gray-900 pointer-events-none" viewBox="0 0 {width} {height}">
				<path d={preview} />
			</svg>
		{/if}
	</div>
	<button class="absolute top-2 right-2 px-4 py-2 text-sm text-gray-500 bg-white border border-gray-200" on:click={clear}>Clear</button>
</div>

<p class="mt-2 text-sm">Please sign on the dotted line to indicate that you agree to all the legal terms we all know you didn't read. Thank you!</p>

<div class="relative mt-4">
	{#each layers as layer}
		<svg class="absolute fill-black" viewBox="0 0 {layer.width * 2} {layer.height * 2}">
			<path d={layer.path} />
		</svg>
	{/each}
</div>
