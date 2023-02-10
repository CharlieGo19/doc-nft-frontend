<script lang="ts">
	import type { MostFireCard } from "src/stores";
	import { scrollLeft, scrollRight } from "$lib/common/functions";

	let carousel: HTMLUListElement;
	export let nftsFire: MostFireCard[];

	// TODO: Add more locale for number formatting.
	const fmtr = new Intl.NumberFormat("en-GB");
</script>

<div class="relative flex flex-row w-full h-[424px] md:max-w-7xl z-0">
	<button
		class="invisible md:visible relative flex w-8 h-8 mt-[204px] mb-auto ml-2 justify-center items-center select-none bg-white rounded-md border-2 border-black z-20"
		on:click={() => {
			scrollLeft(804, carousel);
		}}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6">
			<!-- TODO: Add description. -->
			<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
		</svg>
	</button>
	<!-- TODO: Do mobile gap-[x]-->
	<ul
		bind:this={carousel}
		class="absolute flex w-full h-full pt-10 sm:pl-6 overflow-x-auto no-scrollbar-x gap-[54px] snap-x snap-mandatory scroll-smooth 
        sm:before:content-none before:shrink-0 before:w-[30vw] after:shrink-0 after:w-[30vw] md:rounded-2xl z-10-">
		{#each nftsFire as { name, src, fireStrength, owner, ownerImg, price, serial }}
			<li
				class="relative w-[268px] h-[363px] shrink-0 snap-center font-Poppins dark:text-white bg-white dark:bg-deep-dark-mint rounded-2xl border-2 border-light-mint dark:border-dark-mint shadow-lg">
				<a href="/collection/0.0.12345/{serial}">
					<img
						{src}
						alt={name}
						class="relative object-cover ml-auto mr-auto p-2 rounded-2xl" />
				</a>
				<div class="flex flex-col pl-2 pr-2">
					<span class="flex flex-row">
						<p class="float-left w-1/2 font-semibold">{name}</p>
						<p class="float-right w-1/2 text-right">
							{fireStrength} 🔥
						</p>
					</span>
				</div>
				<div class="flex flex-row mt-1 text-xs">
					<img src={ownerImg} alt="{name}'s PFP" class="w-8 h-8 ml-2 rounded-full" />
					<div class="felx flex-col pl-2">
						<p>Owned By</p>
						<p class="font-semibold">{owner}</p>
					</div>
				</div>
				<hr class="bg-light-mint border-0 h-[1px] w-[252px] mt-1 ml-auto mr-auto" />
				<div class="flex flex-row text-xs">
					<div class="w-1/2 float-left pl-2">
						<p class="h-[24px] mt-[10px] font-semibold">
							{fmtr.format(price)} H
						</p>
					</div>
					<div class="w-1/2 float-right pr-2">
						<button
							type="submit"
							class="h-[24px] w-24 border-[1px] mt-[6px] border-light-mint dark:border-dark-mint rounded-md float-right
                                                    hover:bg-light-mint dark:hover:bg-white hover:text-white dark:hover:text-deep-dark-mint font-semibold">
							BUY NOW
						</button>
					</div>
				</div>
			</li>
		{/each}
	</ul>
	<button
		class="invisible md:visible absolute flex w-8 h-8 right-0 mt-[204px] mr-2 justify-center items-center select-none bg-white rounded-md border-2 border-black z-20"
		on:click={() => {
			scrollRight(804, carousel);
		}}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
		</svg>
	</button>
</div>
