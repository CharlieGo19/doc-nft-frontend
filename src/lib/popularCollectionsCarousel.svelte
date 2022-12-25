<script type="ts">
    import type { PopularCollection } from "src/stores";
    import { scrollLeft, scrollRight } from "./common/functions";

    const fmtr = new Intl.NumberFormat("en-GB");
    export let popularCollections: PopularCollection[];
    let carousel: HTMLUListElement;
</script>

<div class="relative flex flex-row w-full h-[360px] md:max-w-7xl z-0">
    <button
        class="relative flex justify-center items-center select-none mt-[190px] mb-auto ml-2 sm:visible invisible bg-white z-20 rounded-md border-2 border-black"
        on:click={() => {
            scrollLeft(804, carousel);
        }}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
        >
            <!-- TODO: Add description. -->
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
            />
        </svg>
    </button>
    <ul
        bind:this={carousel}
        class="absolute flex w-full z-10 pt-10 no-scrollbar overflow-x-auto gap-7 snap-x snap-mandatory scroll-smooth 
                                sm:before:content-none sm:pl-6 before:shrink-0 before:w-[30vw] after:shrink-0 after:w-[30vw] md:rounded-2xl"
    >
        {#each popularCollections as { name, verified, itemOneSrc, itemTwoSrc, itemThreeSrc, size }}
            <li
                class="relative h-80 w-72 shrink-0 snap-center rounded-2xl border-2 border-mint-edge shadow-xl font-Poppins  bg-white"
            >
                <div class="flex flex-row h-5/6 w-full p-2">
                    <div class="w-1/2">
                        <img
                            src={itemOneSrc}
                            alt="Collection: {name}"
                            class="h-full rounded-xl object-cover"
                        />
                    </div>
                    <div class="flex flex-col w-1/2 pl-1">
                        <img
                            src={itemTwoSrc}
                            alt="Collection: {name}"
                            class="relative h-[122px] rounded-xl object-cover"
                        />
                        <img
                            src={itemThreeSrc}
                            alt="Collection: {name}"
                            class="relative h-[122px] mt-[4px] rounded-xl object-cover"
                        />
                    </div>
                </div>
                <div class="flex flex-row h-1/6 w-full pl-2 pb-2 font-Poppins">
                    <div class="flex flex-col w-1/2">
                        <p class="h-1/2 font-bold">
                            {name}
                        </p>
                        <p class="h-1/2 text-sm">
                            {fmtr.format(size)} NFTs
                        </p>
                    </div>
                    <div class="w-1/2 pr-2">
                        <button
                            type="submit"
                            class="h-[24px] w-24 border-[1px] mt-[11px] border-mint-edge rounded-md float-right hover:bg-mint-edge hover:text-white text-sm font-semibold"
                            >EXPLORE</button
                        >
                    </div>
                </div>
            </li>
        {/each}
    </ul>
    <button
        class="absolute flex justify-center items-center select-none right-0 mt-[190px] mr-2 sm:visible invisible bg-white z-20 rounded-md border-2 border-black"
        on:click={() => {
            scrollRight(804, carousel);
        }}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
        </svg>
    </button>
</div>
