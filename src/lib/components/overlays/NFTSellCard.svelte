<script lang="ts">
	export let name = "";
	export let src = "";
	export let collection = "";
	export let serial = "";
	export let forSale = false;
</script>

<div class="w-4/5 mx-auto dark:text-white">
	<div
		class="flex flex-col mx-auto mt-4 p-2 md:p-2 bg-white dark:bg-deep-dark-mint rounded-2xl border-2 border-light-mint dark:border-dark-mint dark:text-white">
		<img {src} alt={name} class="relative object-cover h-[300px] w-72 mx-auto rounded-2xl" />
		<div class="flex flex-row pt-1 justify-between font-semibold">
			<span class="text-left">0.0.{collection}</span>
			<span class="text-right">#{serial}</span>
		</div>
		<span class="font-semibold">
			{name}
		</span>
		<hr class="w-11/12 h-[1px] mt-2 ml-auto mr-auto bg-light-mint dark:bg-dark-mint border-0" />
		{#if forSale}
			Cancel Sale
		{:else}
			<!-- TODO: When getting users NFTs, append the ones we hold for sale.
			-->
			<button
				class="w-28 h-8 mx-auto mt-2 border-2 border-light-mint dark:border-dark-mint bg-white hover:bg-light-mint dark:bg-transparent dark:hover:bg-white font-semibold text-sm rounded-md hover:text-white dark:text-white dark:hover:text-dark-mint">
				Sell NFT
			</button>
		{/if}
	</div>
</div>
