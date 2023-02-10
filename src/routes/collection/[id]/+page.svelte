<script lang="ts">
	import { page } from "$app/stores";
	import { dummyNft } from "src/stores";
	import NFTCard from "$lib/components/collections/NFTCard.svelte";

	let collectionId: string;
	$: {
		collectionId = $page.params.id;
	}
</script>

<div class="grid grid-cols-1 md:grid-cols-4 w-full max-w-7xl mx-auto pt-8">
	<!-- Do collection info. -->
	{#each dummyNft as NFT}
		<NFTCard name={NFT.name} src={NFT.src} collection={collectionId} serial={NFT.serial} />
	{/each}
</div>
