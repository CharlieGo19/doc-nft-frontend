<script lang="ts">
	import {
		homepageLaunchPadFeed,
		homepagePopularCollections,
		homepageTopCollectionFeed,
		mostFireNfts,
		type MostFireCard,
		type NFTcard,
		type PopularCollection,
		type TopCollectionsCell,
	} from "src/stores";
	import HeadlineCarousel from "src/lib/components/landing/headlineCarousel.svelte";
	import MostfireCarousel from "src/lib/components/landing/mostfireCarousel.svelte";
	import TopCollectionsCarousel from "src/lib/components/landing/topCollectionsCarousel.svelte";
	import PopularCollectionsCarousel from "src/lib/components/landing/popularCollectionsCarousel.svelte";
	import {
		MAIN_PAGE_HEADLINE_AD,
		MAIN_PAGE_HEADLINE_AD_ALT,
		NFT_MARKET_PLACE,
	} from "src/stores/constants";
	import Catagories from "src/lib/components/landing/catagories.svelte";

	let nfts: NFTcard[] = homepageLaunchPadFeed;
	let nftsFire: MostFireCard[] = mostFireNfts;
	let topNftCollections: TopCollectionsCell[] = homepageTopCollectionFeed;
	let popularCollections: PopularCollection[] = homepagePopularCollections;
</script>

<!-- TODO: Price Transparency, i.e. show a breakdown of fees, fallback/royalty/service charge (us) -->
<!-- TODO: Stop snap-x center if list exhausted. -->
<!-- TODO: Add on:hover show full image -->
<div class="flex flex-col w-full items-center mt-14 space-y-14 z-0">
	<div class="flex md:max-w-7xl w-4/5 md:mt-14 items-center justify-center text-center">
		<h1
			class="mt-14 md:mt-0 font-orbitron font-bold md:text-4xl text-lg text-stone-700 dark:text-white">
			DISCOVER, COLLECT AND SELL <span class="text-light-mint">NFTS</span>.
		</h1>
	</div>
	<HeadlineCarousel {nfts} />
	<div class="w-4/5 h-36 md:max-w-7xl">
		<div id="ad-1" class="relative w-full h-full object-cover rounded-xl" />
	</div>
	<div class="flex flex-col md:max-w-7xl w-full">
		<div class="flex flex-row text-stone-700 dark:text-white">
			<div class="w-full font-orbitron font-bold text-center text-3xl md:w-1/2 md:text-left">
				Most 🔥
			</div>
			<div class="hidden float-right w-1/2 md:block">
				<button
					type="button"
					class="flex flex-row align-middle h-8 w-32 mt-[2px] float-right border-2 border-light-mint dark:border-dark-mint bg-white hover:bg-light-mint dark:bg-transparent dark:hover:bg-white
					font-Poppins font-semibold text-sm rounded-md hover:text-white dark:text-white dark:hover:text-dark-mint">
					<p class="w-5/6 leading-7 align-middle">EXPLORE ALL</p>
					<p class="text-xl">></p>
				</button>
			</div>
		</div>
		<MostfireCarousel {nftsFire} />
		<div class="w-full pt-10 md:hidden">
			<button
				type="button"
				class="flex flex-row w-32 h-8 mt-[2px] mx-auto align-middle border-2 rounded-md border-light-mint dark:border-dark-mint font-Poppins dark:hover:bg-white
				bg-white hover:bg-light-mint dark:bg-transparent font-semibold text-sm dark:text-white hover:text-white dark:hover:text-black">
				<p class="w-5/6 leading-7 align-middle">EXPLORE ALL</p>
				<p class="text-xl">></p>
			</button>
		</div>
	</div>
	<div class="flex flex-col w-full md:max-w-7xl">
		<div class="flex flex-row text-stone-700">
			<div
				class="w-full md:w-1/2 text-center font-orbitron font-bold text-3xl md:text-left dark:text-white">
				TOP COLLECTIONS
			</div>
			<div class="hidden float-right w-1/2 md:block">
				<button
					type="button"
					class="flex flex-row align-middle h-8 w-32 mt-[2px] float-right border-2 border-light-mint dark:border-dark-mint bg-white hover:bg-light-mint dark:bg-transparent dark:hover:bg-white
					font-Poppins font-semibold text-sm rounded-md hover:text-white dark:text-white dark:hover:text-dark-mint">
					<p class="w-5/6 leading-7 align-middle">EXPLORE ALL</p>
					<p class="text-xl">></p>
				</button>
			</div>
		</div>
		<TopCollectionsCarousel {topNftCollections} />
		<div class="md:hidden w-full pt-10">
			<button
				type="button"
				class="flex flex-row w-32 h-8 align-middle mt-[2px] mx-auto border-2 border-light-mint bg-white font-Poppins font-semibold text-sm rounded-md hover:bg-light-mint hover:text-white">
				<p class="w-5/6 leading-7 align-middle">EXPLORE ALL</p>
				<p class="text-xl">></p>
			</button>
		</div>
	</div>
	<div class="flex flex-col md:max-w-7xl w-full">
		<div class="flex flex-row text-stone-700">
			<div
				class="w-full md:w-1/2 text-center font-orbitron font-bold text-3xl md:text-left dark:text-white">
				POPULAR COLLECTIONS
			</div>
			<div class="hidden md:block w-1/2 float-right">
				<button
					type="button"
					class="flex flex-row w-32 h-8 mt-[2px] align-middle float-right border-2 border-light-mint dark:border-dark-mint bg-white dark:bg-transparent dark:hover:bg-white 
						font-Poppins font-semibold text-sm rounded-md hover:text-white dark:text-white dark:hover:text-dark-mint">
					<p class="w-5/6 leading-7 align-middle">EXPLORE ALL</p>
					<p class="text-xl">></p>
				</button>
			</div>
		</div>
		<PopularCollectionsCarousel {popularCollections} />
		<div class="md:hidden w-full pt-10">
			<button
				type="button"
				class="flex flex-row w-32 h-8 mt-[2px] mx-auto align-middle border-2 border-light-mint bg-white font-Poppins font-semibold text-sm rounded-md hover:bg-light-mint hover:text-white">
				<p class="w-5/6 leading-7 align-middle">EXPLORE ALL</p>
				<p class="text-xl">></p>
			</button>
		</div>
	</div>
	<div class="flex flex-col md:max-w-7xl w-full">
		<div class="flex flex-row text-stone-700">
			<div
				class="w-full md:w-1/2 text-center font-orbitron font-bold text-3xl md:text-left dark:text-white">
				JUST SOLD
			</div>
			<div class="hidden float-right w-1/2 md:block">
				<button
					type="button"
					class="flex flex-row align-middle h-8 w-32 mt-[2px] float-right border-2 border-light-mint dark:border-dark-mint bg-white hover:bg-light-mint dark:bg-transparent dark:hover:bg-white
					font-Poppins font-semibold text-sm rounded-md hover:text-white dark:text-white dark:hover:text-dark-mint">
					<p class="w-5/6 leading-7 align-middle">EXPLORE ALL</p>
					<p class="text-xl">></p>
				</button>
			</div>
		</div>
		<MostfireCarousel {nftsFire} />
		<!-- Replace with live.-->
		<div class="w-full pt-10 md:hidden">
			<button
				type="button"
				class="flex flex-row w-32 h-8 mt-[2px] mx-auto align-middle border-2 rounded-md border-light-mint dark:border-dark-mint font-Poppins dark:hover:bg-white
				bg-white hover:bg-light-mint dark:bg-transparent font-semibold text-sm dark:text-white hover:text-white dark:hover:text-black">
				<p class="w-5/6 leading-7 align-middle">EXPLORE ALL</p>
				<p class="text-xl">></p>
			</button>
		</div>
	</div>
	<div
		class="flex flex-col md:max-w-7xl w-full md:h-[400px] font-orbitron text-stone-700 dark:text-white space-y-10">
		<div class="text-center font-bold text-3xl md:text-left">CREATE AND SELL YOUR ART</div>
		<div
			class="grid lg:grid-cols-4 md:grid-cols-2 place-items-center grid-cols-1 gap-4 lg:w-full w-4/5 m-auto p dark:text-dark-mint">
			<div
				class="max-w-[305px] aspect-square dark:text-white bg-white border-2 border-light-mint dark:border-dark-mint rounded-2xl dark:bg-deep-dark-mint shadow-xl">
				<div class="flex items-center justify-center h-2/5">
					<svg
						width="84"
						height="84"
						viewBox="0 0 84 84"
						class="fill-light-mint dark:fill-shallow-light-mint"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M84.0001 35.5964C84.0001 33.308 82.145 31.4529 79.8566 31.4529H56.1257C53.8373 31.4529 51.9822 33.308 51.9822 35.5964V48.0269C51.9822 50.3152 53.8373 52.1704 56.1257 52.1704H79.8566C82.145 52.1704 84.0001 50.3152 84.0001 48.0269V35.5964ZM63.8533 46.6961C61.1856 46.6961 59.0231 44.5335 59.0231 41.8659C59.0231 39.1982 61.1856 37.0357 63.8533 37.0357C66.521 37.0357 68.6835 39.1982 68.6835 41.8659C68.6835 44.5331 66.521 46.6961 63.8533 46.6961Z" />
						<path
							d="M46.5236 25.8026H77.2197V13.3721C77.2197 10.2566 74.8109 7.72192 71.6949 7.72192H5.77566C2.66013 7.72192 0 10.2566 0 13.3721V70.6278C0 73.7433 2.66013 76.278 5.77566 76.278H71.6949C74.8105 76.278 77.2197 73.7433 77.2197 70.6278V57.8206H46.5797L46.5236 25.8026Z" />
					</svg>
				</div>
				<div class="flex flex-col w-full h-3/5 ">
					<p class="w-full font-bold text-center text-lg">Set up Your Wallet</p>
					<p class="w-full mt-1 p-3 font-Poppins text-center">
						Login using your Hashpack or Blade Wallet to take advantage of all of <b>
							{NFT_MARKET_PLACE}'s</b> features.
					</p>
				</div>
			</div>
			<div
				class="max-w-[305px] aspect-square dark:text-white bg-white border-2 border-light-mint dark:border-dark-mint rounded-2xl dark:bg-deep-dark-mint shadow-xl">
				<div class="flex items-center justify-center h-2/5">
					<svg
						width="84"
						height="84"
						viewBox="0 0 84 84"
						class="fill-light-mint dark:fill-shallow-light-mint"
						xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_101_4129)">
							<path
								d="M32.3571 6H12.0714C9.27065 6 7 8.27065 7 11.0714V31.3571C7 34.1579 9.27065 36.4286 12.0714 36.4286H32.3571C35.1579 36.4286 37.4286 34.1579 37.4286 31.3571V11.0714C37.4286 8.27065 35.1579 6 32.3571 6Z" />
							<path
								d="M32.3571 46.5715H12.0714C9.27065 46.5715 7 48.8422 7 51.643V71.9287C7 74.7295 9.27065 77.0001 12.0714 77.0001H32.3571C35.1579 77.0001 37.4286 74.7295 37.4286 71.9287V51.643C37.4286 48.8422 35.1579 46.5715 32.3571 46.5715Z" />
							<path
								d="M72.9287 6H52.643C49.8422 6 47.5715 8.27065 47.5715 11.0714V31.3571C47.5715 34.1579 49.8422 36.4286 52.643 36.4286H72.9287C75.7295 36.4286 78.0001 34.1579 78.0001 31.3571V11.0714C78.0001 8.27065 75.7295 6 72.9287 6Z" />
							<path
								d="M72.9287 46.5715H52.643C49.8422 46.5715 47.5715 48.8422 47.5715 51.643V71.9287C47.5715 74.7295 49.8422 77.0001 52.643 77.0001H72.9287C75.7295 77.0001 78.0001 74.7295 78.0001 71.9287V51.643C78.0001 48.8422 75.7295 46.5715 72.9287 46.5715Z" />
						</g>
						<defs>
							<clipPath id="clip0_101_4129">
								<rect
									width="75"
									height="71"
									fill="white"
									transform="translate(7 6)" />
							</clipPath>
						</defs>
					</svg>
				</div>
				<div class="flex flex-col h-3/5 w-full">
					<p class="w-full font-bold text-center text-lg">Create Your Collection</p>
					<p class="w-full mt-1 p-3 font-Poppins text-center">
						Once signed in, you can create a Collection for your NFT project.
					</p>
				</div>
			</div>
			<div
				class="max-w-[305px] aspect-square dark:text-white bg-white border-2 border-light-mint dark:border-dark-mint rounded-2xl dark:bg-deep-dark-mint shadow-xl">
				<div class="flex items-center justify-center h-2/5">
					<svg
						width="87"
						height="87"
						viewBox="0 0 87 87"
						class="fill-light-mint dark:fill-shallow-light-mint"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M72.8492 79.4007H0L14.1508 28.0352H87L72.8492 79.4007Z" />
						<path
							d="M11.0437 23.9516H72.8492V16.0861H36.4512L32.7937 7.59912H0V64.0781L11.0437 23.9516Z" />
					</svg>
				</div>
				<div class="h-3/5 w-full">
					<p class="w-full font-bold text-center text-lg">Mint Your NFTs</p>
					<p class="w-full mt-1 p-3 font-Poppins text-center">
						Now you're ready to mint your NFTs! All NFTs are <a
							href="https://hips.hedera.com/hip/hip-412"
							class="font-bold">HIP-412</a> compliant.
					</p>
				</div>
			</div>
			<div
				class="max-w-[305px] aspect-square dark:text-white bg-white border-2 border-light-mint dark:border-dark-mint rounded-2xl dark:bg-deep-dark-mint shadow-xl">
				<div class="flex items-center justify-center h-2/5">
					<svg
						height="85"
						viewBox="0 0 85 85"
						class="fill-light-mint dark:fill-shallow-light-mint"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M0.445312 30.3049L37.789 76.6642L20.8503 30.3049H0.445312Z" />
						<path d="M24.179 30.3049L42.2257 79.6975L60.6272 30.3049H24.179Z" />
						<path d="M46.2468 77.8612L84.5532 30.3049H63.9623L46.2468 77.8612Z" />
						<path d="M69.9413 5.30078H45.7842L62.3479 25.687L69.9413 5.30078Z" />
						<path d="M59.5317 27.1793L42.4992 6.21802L25.4683 27.1793H59.5317Z" />
						<path d="M39.2158 5.30078H15.0415L22.5412 25.8245L39.2158 5.30078Z" />
						<path d="M12.438 7.2793L0 27.1795H19.7079L12.438 7.2793Z" />
						<path d="M85.0001 27.1795L72.5496 7.25903L65.1265 27.1795H85.0001Z" />
					</svg>
				</div>
				<div class="h-3/5 w-full">
					<p class="w-full font-bold text-center text-lg">Sell Your NFTs</p>
					<p class="w-full mt-1 p-3 font-Poppins text-center">
						Whether you minted your NFTs with us or not, you can still sell your NFTs on
						our platform!
					</p>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-col md:max-w-7xl w-full">
		<div
			class="text-center font-orbitron font-bold text-3xl text-stone-700 dark:text-white md:text-left">
			EXPLORE {NFT_MARKET_PLACE.toUpperCase()}
		</div>
		<Catagories />
	</div>
</div>
