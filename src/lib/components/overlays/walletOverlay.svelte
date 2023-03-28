<script lang="ts">
	import {
		accountBal,
		accountId,
		isWalletPaired,
		nftCuration,
		pairedWallet,
	} from "src/stores/wallet";
	import { pairWalletOverlay, pairHashPackOverlay } from "src/stores/overlays";
	import { BLADE_WALLET, HASHPACK_WALLET, HEDERA_LOWERCASE_H } from "src/stores/constants";
	import { fade } from "svelte/transition";
	import HashpackOverlay from "./hashpackOverlay.svelte";
	import { startPairing, unpairWallet } from "src/lib/wallet-pairing/common";
	import NftSellCard from "./NFTSellCard.svelte";
	import type { CuratedNft } from "src/lib/common/interfaces";

	let usersCuration: CuratedNft[];

	nftCuration.subscribe((val) => {
		usersCuration = val as CuratedNft[];
	});
</script>

<div
	class="fixed flex flex-col w-screen h-screen z-40 items-center bg-black/80 backdrop-blur-lg"
	in:fade={{ duration: 250 }}
	out:fade>
	<div class="md:absolute md:w-full md:max-w-7xl">
		<button
			class="absolute top-7 right-4 md:top-7 md:right-[30px]"
			on:click={() => {
				$pairWalletOverlay = false;
				$pairHashPackOverlay = false;
			}}>
			<div class="relative flex items-center justify-center">
				<span
					class="relative flex w-[27px] h-1 left-[1.7rem] rounded-md bg-light-mint -rotate-45" />
				<span class="relative flex w-[27px] h-1 rounded-md bg-light-mint rotate-45" />
			</div>
		</button>
	</div>
	{#if !$isWalletPaired && !$pairHashPackOverlay}
		<div class="flex my-auto space-x-20">
			<button
				on:click={() => {
					startPairing(BLADE_WALLET);
				}}>
				<img
					src="/wallets/blade-clear.png"
					alt="Click to connect via Blade Wallet."
					class="w-24 h-24 p-1 border rounded-xl border-white shadow-inner shadow-white hover:bg-black bg-black/10" />
			</button>
			<button
				on:click={() => {
					$pairHashPackOverlay = true;
				}}>
				<img
					src="/wallets/hashpack-clear.svg"
					alt="Click to connect via HashPack."
					class="w-24 h-24 border p-1 rounded-xl border-[#7A7AB8] shadow-inner shadow-[#7A7AB8] hover:bg-black bg-black/10" />
			</button>
		</div>
	{:else if !$isWalletPaired && $pairHashPackOverlay}
		<HashpackOverlay />
	{:else}
		<div class="flex flex-col w-full pt-12 dark:text-white overflow-hidden">
			<div class="flex flex-row w-full md:w-80 max-w-[75%] mx-auto">
				{#if $pairedWallet === HASHPACK_WALLET}
					<img
						src="/wallets/hashpack-clear.svg"
						alt="Click to connect via HashPack."
						class="w-16 h-16 mx-auto border p-1 rounded-xl border-[#7A7AB8] shadow-inner shadow-[#7A7AB8] hover:bg-black bg-black/10" />
				{:else if $pairedWallet === BLADE_WALLET}
					<img
						src="/wallets/blade-clear.png"
						alt="Click to connect via Blade Wallet."
						class="w-16 h-16 mx-auto border p-1 rounded-xl border-white shadow-inner shadow-white hover:bg-black bg-black/10" />
				{/if}
				<span class="flex flex-col mx-auto font-semibold my-auto text-white">
					<span>Account ID: {$accountId}</span>
					<span>Balance: {$accountBal} {HEDERA_LOWERCASE_H}</span>
				</span>
			</div>
			<div class="flex w-full max-w-[75%] py-3 mx-auto justify-center items-center">
				<button
					class="w-28 h-8 mx-4 border-2 border-light-mint dark:border-dark-mint bg-white hover:bg-light-mint dark:bg-transparent dark:hover:bg-white font-semibold text-sm rounded-md hover:text-white dark:text-white dark:hover:text-dark-mint"
					on:click={unpairWallet}>
					Unpair
				</button>
				<button
					class="w-28 h-8 mx-4 border-2 border-light-mint dark:border-dark-mint bg-white hover:bg-light-mint dark:bg-transparent dark:hover:bg-white font-semibold text-sm rounded-md hover:text-white dark:text-white dark:hover:text-dark-mint"
					on:click={() => {
						console.log("Refresh");
					}}>
					Refresh
				</button>
			</div>

			<div
				class="grid grid-cols-1 md:grid-cols-4 w-full max-w-7xl h-full mx-auto dark:text-white overflow-y-scroll md:scrollbar-thin">
				{#if usersCuration.length === 0}
					<span
						>You don't have any NFT's to display. If you should have some to display,
						contact the Agorah team at the links at the bottom of the page.</span>
				{:else}
					{#each usersCuration as curatedNft}
						<NftSellCard
							name={curatedNft.name}
							src={curatedNft.src}
							collection={curatedNft.collection}
							serial={curatedNft.serial}
							forSale={curatedNft.forSale} />
					{/each}
				{/if}
			</div>
		</div>
	{/if}
</div>
