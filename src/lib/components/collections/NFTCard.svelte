<script lang="ts">
    import { page } from "$app/stores";

    export let name = "";
    export let src = "";
    export let serial = 0;

    let collectionId: string;

    $: {
        collectionId = $page.params.id;
    }
</script>

<!-- TODO: conditional to check if user has PFP -> if true, display img, else display accId-->
<div
    class="w-4/5 mx-auto p-4 md:p-2 bg-white dark:bg-deep-dark-mint rounded-2xl border-2 border-mint-edge dark:border-dark-mint dark:text-white">
    <img {src} alt={name} class="object-cover mx-auto rounded-2xl" />

    <div class="flex flex-col px-2 md:px-1">
        <span class="font-semibold">
            {name} #{serial}
        </span>
        <span class="flex flex-col">
            <p class="font-semibold">Owned by 0.0.1234</p>
            <p>Floor Price: $FLOOR_PRICE</p>
        </span>
        <hr
            class="bg-mint-edge dark:bg-dark-mint border-0 h-[1px] w-11/12 mt-1 ml-auto mr-auto" />
        <a
            href="/collection/{collectionId}/{serial}"
            class="inline-block h-9 w-36 leading-8 mx-auto mt-2 border-2 border-mint-edge dark:border-dark-mint rounded-md text-center align-middle
                                    hover:bg-mint-edge dark:hover:bg-white hover:text-white dark:hover:text-deep-dark-mint font-semibold">
            VIEW NFT
        </a>
    </div>
</div>
