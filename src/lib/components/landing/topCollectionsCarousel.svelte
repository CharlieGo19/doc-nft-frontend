<script lang="ts">
	import type { TopCollectionsCell } from "src/stores";

	export let topNftCollections: TopCollectionsCell[];

	// TODO: Add more locale for number formatting.
	const fmtr = new Intl.NumberFormat("en-GB");
</script>

<div class="flex flex-row pt-9 dark:text-white font-Poppins">
	<div class="flex flex-row md:w-1/2 w-full font-bold">
		<div class="w-3/6 pl-1">Collection</div>
		<div class="w-1/6 text-center">Floor Price</div>
		<div class="w-2/6 pr-[18px] text-right">Volume</div>
	</div>
	<div class="invisible md:visible flex flex-row md:w-1/2 w-0 font-bold">
		<div class="w-3/6 pl-1">Collection</div>
		<div class="w-1/6 text-center">Floor Price</div>
		<div class="w-2/6 pr-3 text-right">Volume</div>
	</div>
</div>
<!--dark:hover:bg-deep-dark-mint dark:text-white-->
<div class="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-[3px]">
	{#each topNftCollections as { name, verified, src, size, fp, volume, volumeIncrease }}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<a href="/collection/0.0.1234">
			<div
				class="flex flex-row min-w-[300px] rounded-2xl bg-black/10 dark:bg-deep-dark-mint/40 hover:bg-black/30 dark:hover:bg-white dark:text-white dark:hover:text-deep-dark-mint cursor-pointer">
				<div class="flex flex-row w-3/6">
					<img
						{src}
						alt="Collection: {name}"
						class="w-16 h-16 border-2 border-light-mint dark:border-dark-mint mt-auto mb-auto object-cover rounded-2xl" />
					<div class="flex flex-col pl-2">
						<p class="pt-[10px] font-bold">{name}</p>
						<p class="text-sm">{fmtr.format(size)} NFTs</p>
					</div>
				</div>
				<div class="flex w-1/6">
					<!-- TODO: ADd symbol. -->
					<div class="h-6 text-center m-auto">
						{fmtr.format(fp)} H
					</div>
				</div>
				<div class="flex flex-col w-2/6 pr-3">
					<p class="h-6 mt-auto text-right font-bold">
						{fmtr.format(volume)}
					</p>
					<!-- TODO: Conditional class property green -->
					<p class="h-6 mb-auto text-right">
						+{fmtr.format(volumeIncrease)}
					</p>
				</div>
			</div>
		</a>
	{/each}
</div>
