<script lang="ts">
	import { page } from "$app/stores";
	import { dummyNft } from "src/stores";
	import NFTCard from "$lib/components/collections/NFTCard.svelte";
	import { AGORAH_API_BASE_URI } from "src/stores/constants";

	let nfts: any[] = [];

	async function GetNftPreview(retrieved: any[]) {
		const rangeFrom: number = retrieved.length + 1;
		const rangeTo: number = rangeFrom + 20; // TODO: Move this out to a constant and keep in sync with api limits

		let res = await fetch(
			`${AGORAH_API_BASE_URI}/nfts?collectionId=${$page.params.id}&nftSerialRangeFrom=${rangeFrom}&nftSerialRangeTo=${rangeTo}`
		);
		if (res.status !== 200) {
			const err = await res.json();
			throw new Error("Couldn't get Collection data, error returned: ", err.error);
		} else {
			const data = await res.json();
			return data;
		}
	}
	let collectionId: string;
	$: {
		collectionId = $page.params.id;
	}
</script>

<div class="grid grid-cols-1 md:grid-cols-4 w-full max-w-7xl mx-auto py-10 text-white">
	{#await GetNftPreview(nfts)}
		Loading...
	{:then x}
		{#each x as NFT}
			<NFTCard
				name={NFT.nft_name}
				src={NFT.nft_file}
				collection={$page.params.id}
				serial={NFT.serial_id} />
		{/each}
	{:catch error}
		<h1>Broke {error}</h1>
	{/await}
	<!-- Do collection info. -->
	<!-- {#each dummyNft as NFT}
		<NFTCard name={NFT.name} src={NFT.src} collection={collectionId} serial={NFT.serial} />
	{/each} -->
</div>
