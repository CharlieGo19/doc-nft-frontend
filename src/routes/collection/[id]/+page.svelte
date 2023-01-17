<script type="ts">
    import { page } from "$app/stores";
    import { dummyNft } from "src/stores";
    import NFTCard from "$lib/components/collections/NFTCard.svelte";

    // Do proper traits struct
    let collectionId: string;

    $: {
        collectionId = $page.params.id;
    }
</script>

<div
    class="grid grid-cols-1 md:grid-cols-4 w-full max-w-7xl space-y-6 mx-auto pt-8">
    <!-- Do collection info. -->
    <!-- tokenId: "0.0.12345",
    name: "WenMoon",
    creator: "Studio Ennui",
    src: "/temp_demo/wenMoon.gif",
    serial: 1, -->
    {#each dummyNft as NFT}
        <NFTCard name={NFT.name} src={NFT.src} serial={NFT.serial} />
    {/each}
</div>

<!-- Collection Details:
0.  Blurb, collection details creator/studio, uploaded/descript.
1.  tokenID
2.  Volume? worth based on LAST sale price
3.  Floor Price

// sticky filter dropdown

// the cards
like on landing page - caviat, if ! for sale, then put a not for sale. -->
