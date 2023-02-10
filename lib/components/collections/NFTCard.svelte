<script lang="ts">
	export let name = "";
	export let src = "";
	export let collection = "";
	export let serial = 0;
</script>

<!-- TODO: conditional to check if user has PFP -> if true, display img, else display accId-->
<div
	class="w-4/5 mx-auto mt-4 p-4 md:p-2 bg-white dark:bg-deep-dark-mint rounded-2xl border-2 border-light-mint dark:border-dark-mint dark:text-white">
	<img {src} alt={name} class="object-cover mx-auto rounded-2xl" />

	<div class="flex flex-col px-2 md:px-1">
		<span class="font-semibold">
			{name} #{serial}
		</span>
		<span class="flex flex-col">
			<p class="font-semibold">Owned by 0.0.1234</p>
			<p>Floor Price: $FLOOR_PRICE</p>
		</span>
		<hr class="w-11/12 h-[1px] mt-1 ml-auto mr-auto bg-light-mint dark:bg-dark-mint border-0" />
		<a
			href="/collection/{collection}/{serial}"
			class="inline-block h-9 w-36 leading-8 mx-auto mt-2 border-2 border-light-mint dark:border-dark-mint rounded-md text-center align-middle
                                    hover:bg-light-mint dark:hover:bg-white hover:text-white dark:hover:text-deep-dark-mint font-semibold">
			VIEW NFT
		</a>
	</div>
</div>
