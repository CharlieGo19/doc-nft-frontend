<script lang="ts">
	import { page } from "$app/stores";
	import {
		homepageTopCollectionFeed,
		dummyHistoryForNftPage,
		type TopCollectionsCell,
	} from "src/stores";
	import { HEDERA_LOWERCASE_H } from "src/stores/constants";

	let collectionId: string;
	let serial: number;
	let nft: TopCollectionsCell | undefined;

	$: {
		collectionId = $page.params.id;
		serial = ~~$page.params.serial;
		nft = homepageTopCollectionFeed.find((obj) => obj.collectionId === serial); // TODO: Add a defult NFT for the platform.
	}
</script>

<div class="flex flex-col md:flex-row h-full w-full font-Poppins">
	<div class="flex flex-col md:flex-row w-4/5 mx-auto md:max-w-7xl pt-10">
		<div class="md:w-1/3">
			<img
				src={nft?.src}
				alt={nft?.name}
				class="w-full object-cover border-2 border-mint-edge dark:border-dark-mint rounded-2xl shadow-xl" />
			<!-- <b>
                TODO: Add Creators Socials and Link in platform here...<br />
                Also move BUY buttons here, and in space of buy buttons put
                token description. <br />
                And add image viewer, to give a full screen experience for NFTs of
                landscape orientation a good viewing experience.
                Add an owned by.
            </b>-->
		</div>
		<div class="flex flex-col md:w-2/3 md:pl-9">
			<div class="flex flex-col">
				<div
					class="flex flex-col rounded-xl mt-6 md:mt-0 p-4 bg-black/60 dark:bg-dark-mint/60 text-white">
					<span class="text-2xl md:text-2xl lg:text-4xl font-semibold">
						{nft?.name}
					</span>
					<span class="pt-1 md:pt-2 md:text-lg lg:text-2xl">
						NFT Name Placeholder - #1
					</span>
					<span class="pt-1 md:pt-2 lg:text-lg md:font-semibold">
						Listed price: 1,000 <b><i>{HEDERA_LOWERCASE_H}</i></b>
					</span>
				</div>
				<!-- TODO: Conditional if item has name or differing from collection name.-->
				<span
					class="flex flex-row rounded-xl justify-center py-6 mt-6 bg-black/60 dark:bg-dark-mint/60 text-white">
					<span class="w-1/2">
						<button
							class="block align-middle h-10 w-36 mt-[2px] mx-auto border-2 border-light-mint dark:border-dark-mint bg-white font-Poppins font-semibold 
                    text-black dark:text-deep-dark-mint rounded-md hover:bg-light-mint dark:hover:bg-deep-dark-mint hover:text-black dark:hover:text-white">
							Make Offer
						</button>
					</span>
					<span class="w-1/2">
						<button
							class="block align-middle h-10 w-36 mt-[2px] mx-auto border-2 border-light-mint dark:border-dark-mint bg-mint-edge dark:bg-deep-dark-mint text-white font-Poppins font-semibold
                    rounded-md hover:bg-light-mint dark:hover:bg-white hover:text-black dark:hover:text-deep-dark-mint">
							Buy Now
						</button>
					</span>
				</span>
			</div>
			<!-- TODO: Add conditional here, if len of list === 0 then display message saying 'Be the first to own this NFT!'-->
			<div
				class="grid grid-cols-4 grid-flow-row space-y-1 rounded-xl pb-2 md:px-6 md:pb-4 mt-6 bg-black/60 dark:bg-dark-mint/60 text-white">
				<span class="p-2 text-sm md:text-lg font-bold">Price</span>
				<!-- <span class="text-sm text-center font-bold">From</span> -->
				<span class="col-span-2 p-2 text-sm md:text-lg text-center font-bold"> Sale </span>
				<span class="text-sm p-2 md:text-lg text-right font-bold"> Date </span>
				{#each dummyHistoryForNftPage as txn}
					<span class="pl-2 text-sm md:text-base">
						{txn.price} <b><i>{HEDERA_LOWERCASE_H}</i></b>
					</span>
					<span class="col-span-2 text-sm md:text-base text-center">
						<a href="/">
							{txn.from} <b>-></b>
							{txn.to}
						</a>
					</span>
					<span class="pr-2 text-sm md:text-base text-right">
						{txn.date}
					</span>
				{/each}
			</div>
		</div>
	</div>
</div>
