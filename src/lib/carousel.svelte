<script lang="ts">
    // @ts-ignore
    import type { NFTcard } from "src/stores";
    import { scrollLeft, scrollRight } from "./common/functions";

    // TODO: Add more locale for number formatting.
    const fmtr = new Intl.NumberFormat('en-GB');
    let carousel: HTMLUListElement;
    export let nfts: NFTcard[];

</script>

<div class="relative flex w-full h-[300px] md:max-w-7xl z-0">
    <button class="relative flex w-8 h-8 justify-center items-center select-none mt-auto mb-auto ml-2 sm:visible invisible rounded-md bg-white z-20 border-2 border-black" on:click={() => {scrollLeft(900, carousel);}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <!-- TODO: Add description. -->
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
    </button>
    <ul bind:this={carousel} class="absolute flex w-full z-10 no-scrollbar overflow-x-auto gap-7 snap-x snap-mandatory scroll-smooth 
                            sm:before:content-none sm:pl-6 before:shrink-0 before:w-[30vw] after:shrink-0 after:w-[30vw] md:rounded-2xl">
        {#each nfts as {name, creator, src, fp}}
            <li class="relative w-72 max-h-[300px] h-[300px] shrink-0 snap-center rounded-2xl">
                <img src="{src}" alt="{name}" class="relative object-cover h-[300px] w-72 rounded-xl z-20"/>
                <div class="absolute w-full bottom-0 p-2 text-white bg-black/30 z-30 backdrop-blur-sm rounded-b-xl">
                    <p class="text-base font-bold"> {creator} </p>
                    <p class="text-sm font-light pb-1"> Floor Price: {fmtr.format(fp)} </p>
                </div>
            </li>
        {/each}
    </ul>
    <button class="absolute flex w-8 h-8 justify-center items-center select-none right-0 mt-[134px] mr-2 sm:visible invisible bg-white z-20 rounded-md border-2 border-black" on:click={() => {scrollRight(900, carousel);}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    </button>
</div>