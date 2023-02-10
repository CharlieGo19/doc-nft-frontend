<script lang="ts">
	const catagories: {
		image: string;
		urlText: string;
	}[] = [
		{
			image: "temp_demo/doc1.png",
			urlText: "Art",
		},
		{
			image: "temp_demo/docCrab.png",
			urlText: "Trading Cards",
		},
		{
			image: "temp_demo/docDbz.png",
			urlText: "Collectables",
		},
		{
			image: "temp_demo/docDragon.png",
			urlText: "Music",
		},
		{
			image: "temp_demo/ape1.png",
			urlText: "Utility",
		},
		{
			image: "temp_demo/ape2.png",
			urlText: "Virtual Worlds",
		},
		{
			image: "temp_demo/bobs.png",
			urlText: "Domain Names",
		},
		{
			image: "temp_demo/monke.png",
			urlText: "Photography",
		},
	];
</script>

<!-- TODO: Fix Links i.e. add filters -->
<div class="flex flex-row w-full h-[340px] md:h-[730px] mt-11 md:mt-0 z-0">
	<ul
		class="md:hidden flex w-full no-scrollbar overflow-x-auto gap-7 snap-x snap-mandatory scroll-smooth pl-6 before:shrink-0 before:w-[30vw] after:shrink-0 after:w-[30vw] no-scrollbar-x">
		{#each catagories as catagorie}
			<li class="relative w-72 max-h-[300px] h-[300px] shrink-0 snap-center">
				<img
					src={catagorie.image}
					alt={catagorie.urlText}
					class="absolute w-full h-full border-2 rounded-xl shadow-lg object-cover" />
				<span
					class="absolute w-[286px] h-1/5 bottom-0 ml-[1px] rounded-b-xl bg-black/70 backdrop-blur-sm font-bold text-white text-center">
					<p class="mt-[15px]">
						{catagorie.urlText}
					</p>
				</span>
			</li>
		{/each}
	</ul>
	<div class="hidden lg:w-full w-2/3 md:grid lg:grid-cols-4 md:grid-cols-2 gap-4 m-auto">
		{#each catagories as catagorie}
			<div
				class="relative aspect-square  border-2 border-light-mint dark:border-dark-mint rounded-xl shadow-2xl">
				<img
					src={catagorie.image}
					alt={catagorie.urlText}
					class="absolute w-full h-full rounded-xl object-cover" />
				<span
					class="absolute w-full h-1/5 bottom-0 rounded-b-xl bg-black/70 backdrop-blur-sm font-bold text-white text-center">
					<p class="mt-[15px]">
						{catagorie.urlText}
					</p>
				</span>
			</div>
		{/each}
	</div>
</div>
