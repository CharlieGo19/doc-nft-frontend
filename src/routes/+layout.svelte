<script lang="ts">
	import "src/app.css";
	import { theme, toggleDarkMode } from "src/stores/theme";
	import { slide } from "svelte/transition";
	import { linear } from "svelte/easing";
	import { SearchDummyData } from "src/stores";
	import { accountId, isWalletPaired } from "src/stores/wallet";
	import { pairWalletOverlay } from "src/stores/overlays";
	import WalletOverlay from "$lib/components/overlays/walletOverlay.svelte";
	import Toasts from "src/lib/components/toast/toasts.svelte";
	import {
		AGORAH_API_BASE_URI,
		AGORAH_BRANDING_LANDING_PAGE_FOOTER_DARK_MODE,
		AGORAH_BRANDING_LANDING_PAGE_FOOTER_LIGHT_MODE,
		AGORAH_BRANDING_MENU_LOGO,
		AGORAH_BRANDING_MENU_LOGO_ALT,
		NFT_MARKET_PLACE,
	} from "src/stores/constants";
	import { onMount } from "svelte";
	import { initPairedWallet } from "src/lib/wallet-pairing/common";

	onMount(async () => {
		await initPairedWallet();
	});
	// TODO: Discuss this with the guys - what do we want as results, how do we format it.
	type SearchBox = {
		users: Array<any>;
		tokens: Array<any>;
		collections: Array<any>;
	};

	async function SearchAgorah() {
		const res = await fetch(
			`${AGORAH_API_BASE_URI}/search?` +
				new URLSearchParams({
					value: searchValue,
				})
		);
		return await res.json();
	}

	const searchResults: SearchBox = {
		users: [],
		tokens: [],
		collections: [],
	};

	let dark: boolean = false;
	let showAccountMenu: boolean = false;
	let showMobileMenu: boolean = false;
	let showMobileSearch: boolean = false;
	let showDesktopSearch: boolean = false;
	let showResourcesMenu: boolean = false;
	let showUserResults: boolean = false;
	let showCollectionResults: boolean = false;
	let showNftResults: boolean = false;
	let searchValue: string = "";
	let iwp: boolean;
	let accId: string | null;

	$: {
		dark = $theme;

		showUserResults = searchResults.users.length > 0 ? true : false;
		showCollectionResults = searchResults.collections.length > 0 ? true : false;
		showNftResults = searchResults.tokens.length > 0 ? true : false;
	}

	async function updateResults() {
		if (searchValue.length > 3) {
			const x: any = await SearchAgorah();
			console.log(x);
			if (x.token_ids.length > 0) {
				searchResults.collections = x.token_ids;
			}
		}
	}

	const toggleMenu = (menu: string): any => {
		if (menu === "account") {
			showAccountMenu = !showAccountMenu;
		} else if (menu === "mobile") {
			if (showMobileSearch) {
				showMobileSearch = false;
				setTimeout(() => {
					showMobileMenu = !showMobileMenu;
				}, 300);
			} else {
				showMobileMenu = !showMobileMenu;
			}
		} else if (menu === "mobileSearch") {
			// TODO: Is there a better way of cleaning this up - does it even need cleaning up?
			searchValue = "";
			searchResults.users = [];
			searchResults.tokens = [];
			searchResults.collections = [];

			if (showMobileMenu) {
				showMobileMenu = false;
				setTimeout(() => {
					showMobileSearch = !showMobileSearch;
				}, 300);
			} else {
				showMobileSearch = !showMobileSearch;
			}
		} else if (menu === "desktopSearch") {
			searchValue = "";
			searchResults.users = [];
			searchResults.tokens = [];
			searchResults.collections = [];

			showDesktopSearch = !showDesktopSearch;
		} else if (menu === "resources") {
			showResourcesMenu = !showResourcesMenu;
		}
	};

	isWalletPaired.subscribe((val) => {
		iwp = val;
	});

	accountId.subscribe((val) => {
		accId = val;
	});
	// TODO: Check onmount from old.
</script>

<div class:dark>
	<Toasts />
	<div
		class="flex flex-col w-full h-screen bg-gradient-to-b from-shallow-light-mint to-white dark:from-black dark:to-deep-dark-mint overflow-x-hidden md:overflow-y-auto">
		<div class="md:hidden fixed flex flex-col w-full z-40 bg-black/60 backdrop-blur-lg">
			<div class="flex flex-row h-14">
				<div class="relative w-2/3 pr-4 my-auto">
					<a href="/">
						<img
							src={AGORAH_BRANDING_MENU_LOGO}
							alt={AGORAH_BRANDING_MENU_LOGO_ALT}
							class="h-14" /></a>
				</div>
				<div class="relative flex w-1/6 h-full items-center">
					<button
						type="button"
						class="w-full h-full"
						on:click={() => toggleMenu("mobileSearch")}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="white"
							class="relative w-8 h-8 mr-2 ml-auto">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
						</svg>
					</button>
				</div>
				<div class="relative w-1/6 ml-auto mr-0">
					<button
						type="button"
						class="w-full h-full float-right"
						on:click={() => toggleMenu("mobile")}>
						<div class="relative flex items-center justify-center">
							<span
								class="absolute h-1 w-1/3 right-4 -translate-y-2 bg-shallow-light-mint rounded-md  {showMobileMenu ===
								true
									? 'opacity-0'
									: ''} transition duration-300" />
							<span
								class="absolute h-1 w-1/3 right-4 bg-shallow-light-mint rounded-md {showMobileMenu ===
								true
									? '-rotate-45'
									: ''} transform duration-300" />
							<span
								class="absolute h-1 w-1/3 right-4 bg-shallow-light-mint rounded-md {showMobileMenu ===
								true
									? 'rotate-45'
									: ''} transform duration-300" />
							<span
								class="absolute h-1 w-1/3 right-4 translate-y-2 bg-shallow-light-mint rounded-md {showMobileMenu ===
								true
									? 'opacity-0'
									: ''} transition duration-300}" />
						</div>
					</button>
				</div>
			</div>

			<div class="flex flex-row">
				{#if showMobileMenu}
					<div
						class="grid grid-cols-2 w-full text-white p-2"
						transition:slide={{
							duration: 300,
							easing: linear,
						}}>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<span
							class="p-2 hover:rounded-md hover:font-bold hover:bg-shallow-light-mint hover:text-black dark:hover:bg-dark-mint dark:hover:text-white"
							role="menuitem"
							tabindex="-1"
							id="menu-item-0"
							on:click={() => toggleDarkMode(!dark)}
							>{#if dark}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6 mx-auto">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
								</svg>
							{:else}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="w-6 h-6 mx-auto">
									<path
										fill-rule="evenodd"
										d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
										clip-rule="evenodd" />
								</svg>
							{/if}</span>
						<span
							class="p-2 hover:rounded-md text-center hover:font-bold hover:bg-shallow-light-mint hover:text-black"
							>LaunchPad</span>
						<span
							class="p-2 hover:rounded-md text-center hover:font-bold hover:bg-shallow-light-mint hover:text-black"
							>Explore</span>
						<span
							class="p-2 hover:rounded-md text-center hover:font-bold hover:bg-shallow-light-mint hover:text-black"
							>Activity</span>
						<span
							class="p-2 hover:rounded-md text-center hover:font-bold hover:bg-shallow-light-mint hover:text-black"
							>DAO</span>
						<span
							class="p-2 hover:rounded-md text-center hover:font-bold hover:bg-shallow-light-mint hover:text-black"
							>Raffle</span>
						<span
							class="p-2 hover:rounded-md text-center hover:font-bold hover:bg-shallow-light-mint hover:text-black"
							>Account</span>
						<button
							class="p-2 hover:rounded-md text-center hover:font-bold hover:bg-shallow-light-mint hover:text-black {iwp ===
							true
								? 'font-bold'
								: ''}"
							on:click={() => {
								pairWalletOverlay.set(true);
								toggleMenu("mobile");
							}}>
							{#if iwp}
								{accId}
							{:else}
								Pair Wallet
							{/if}
						</button>
					</div>
				{/if}
				{#if showMobileSearch}
					<div
						class="flex flex-col w-full z-40 pt-0 pb-2 px-4"
						transition:slide={{
							duration: 300,
							easing: linear,
						}}>
						<input
							type="search"
							class="w-full mx-auto px-2 py-1 font-Poppins text-sm"
							placeholder="Search items, collections, creators and collectors"
							bind:value={searchValue} />
						{#if showUserResults}
							<div class="w-full flex flex-col py-2 text-white">
								<span class="p-1" />
								<span
									class="w-full mx-auto px-2 rounded-md text-center text-black dark:text-white font-semibold bg-shallow-light-mint dark:bg-dark-mint"
									>Creators and Users</span>
								<span class="p-1" />
								{#each searchResults.users as user}
									<!-- TODO: Convert these to links. -->
									<span
										class="px-2 hover:rounded-md hover:font-bold hover:text-black dark:hover:text-white hover:bg-shallow-light-mint dark:hover:bg-deep-dark-mint"
										>{user.value}</span>
								{/each}
							</div>
						{/if}
						{#if showCollectionResults}
							<div class="flex flex-col w-full py-2 text-white">
								<span
									class="w-full mx-auto px-2 rounded-md text-center text-black dark:text-white font-semibold bg-shallow-light-mint dark:bg-dark-mint"
									>Collections</span>
								<span class="p-1" />
								{#each searchResults.collections as collection}
									<a
										href="/collection/{collection.value}"
										class="px-2 hover:rounded-md hover:font-bold hover:text-black dark:hover:text-white hover:bg-shallow-light-mint dark:hover:bg-deep-dark-mint"
										on:click={() => {
											toggleMenu("mobileSearch");
										}}>{collection.value}</a>
								{/each}
							</div>
						{/if}
						{#if showNftResults}
							<div class="flex flex-col w-full py-2 text-white">
								<span
									class="w-full mx-auto px-2 rounded-md text-center text-black dark:text-white font-semibold bg-shallow-light-mint dark:bg-dark-mint"
									>Tokens</span>
								<span class="p-1" />
								{#each searchResults.tokens as token}
									<!-- TODO: Convert these to links. -->
									<span
										class="px-2 hover:rounded-md hover:font-bold hover:text-black dark:hover:text-white hover:bg-shallow-light-mint dark:hover:bg-deep-dark-mint"
										>{token.value}</span>
								{/each}
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
		<div
			class="hidden md:flex w-full items-center py-2 bg-black/60 backdrop-blur-lg fixed z-40">
			<div
				class="flex flex-row w-full max-w-7xl h-11 mx-auto justify-between space-x-2 place-items-center text-center font-medium text-sm text-white">
				<div id={NFT_MARKET_PLACE} class="grow z-0">
					<a href="/">
						<img
							src={AGORAH_BRANDING_MENU_LOGO}
							alt={AGORAH_BRANDING_MENU_LOGO_ALT}
							class="h-14" />
					</a>
				</div>

				<div id="search" class="grow-2">
					<input
						class="w-full h-10 px-2 border-none rounded-lg focus:outline-none text-sm text-black"
						type="search"
						placeholder="Search items, collections & accounts"
						on:focus={() => toggleMenu("desktopSearch")}
						bind:value={searchValue}
						on:keydown={async () => {
							showDesktopSearch = true;
							await updateResults();
						}} />
					{#if showDesktopSearch}
						<div
							class="absolute w-4/5 max-w-4xl inset-x-auto mt-[10px] rounded-mdtext-white bg-black/60 backdrop-blur-lg z-40 "
							tabindex="-1"
							on:mouseleave={() => toggleMenu("desktopSearch")}>
							{#if showUserResults}
								<!-- TODO: Add more button to list full results / paginated. / add link to header -->
								<div
									class="w-full flex flex-col p-2 text-white"
									transition:slide={{
										duration: 200,
										easing: linear,
									}}>
									<span
										class="w-full mx-auto px-2 rounded-md text-black dark:text-white font-semibold bg-shallow-light-mint dark:bg-dark-mint"
										>Creators and Users</span>
									<!-- <hr class="w-[98%] h-px mx-auto bg-white border-0" /> -->
									<div class="grid grid-cols-5 md:grid-cols-3 py-2">
										{#each searchResults.users as user}
											<!-- TODO: Convert these to links. -->
											<span
												class="px-2 hover:rounded-md hover:font-bold hover:bg-shallow-light-mint dark:hover:bg-dark-mint hover:text-black dark:hover:text-white"
												>{user.value}</span>
										{/each}
									</div>
								</div>
							{/if}
							{#if showCollectionResults}
								<div
									class="flex flex-col w-full px-2 text-white"
									transition:slide={{
										duration: 200,
										easing: linear,
									}}>
									<span
										class="w-full mx-auto px-2 rounded-md text-black dark:text-white font-semibold bg-shallow-light-mint dark:bg-dark-mint"
										>Collections</span>
									<div class="grid grid-cols-5 md:grid-cols-3 py-2">
										{#each searchResults.collections as collection}
											<span
												class="px-2 hover:rounded-md hover:font-bold hover:bg-shallow-light-mint dark:hover:bg-dark-mint hover:text-black dark:hover:text-white"
												><a href="/collection/{collection}">{collection}</a
												></span>
										{/each}
									</div>
								</div>
							{/if}
							{#if showNftResults}
								<div
									class="flex flex-col w-full p-2 text-white"
									transition:slide={{
										duration: 200,
										easing: linear,
									}}>
									<span
										class="w-full mx-auto px-2 rounded-md text-black dark:text-white font-semibold bg-shallow-light-mint dark:bg-dark-mint"
										>NFTs</span>
									<div class="grid grid-cols-5 md:grid-cols-3 py-2">
										{#each searchResults.tokens as nft}
											<!-- TODO: Convert these to links. -->
											<span
												class="px-2 hover:rounded-md hover:font-bold hover:bg-shallow-light-mint dark:hover:bg-dark-mint hover:text-black dark:hover:text-white"
												>{nft.value}</span>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					{/if}
				</div>
				<div
					id="launchPad"
					class="grow flex h-full justify-center items-center hover:font-bold hover:cursor-pointer rounded-md hover:text-black  hover:bg-shallow-light-mint dark:hover:bg-dark-mint">
					LaunchPad
				</div>
				<div
					id="explore"
					class="grow flex h-full justify-center items-center hover:font-bold hover:cursor-pointer rounded-md hover:text-black hover:bg-shallow-light-mint dark:hover:bg-dark-mint">
					Marketplace
				</div>
				<div
					id="activity"
					class="grow flex h-full justify-center items-center hover:font-bold hover:cursor-pointer rounded-md hover:text-black hover:bg-shallow-light-mint dark:hover:bg-dark-mint">
					Activity
				</div>
				<div
					id="dao"
					class="grow flex h-full justify-center items-center hover:font-bold hover:cursor-pointer rounded-md hover:text-black hover:bg-shallow-light-mint dark:hover:bg-dark-mint">
					DAO
				</div>
				<div
					id="raffle"
					class="grow flex h-full justify-center items-center hover:font-bold hover:cursor-pointer rounded-md hover:text-black hover:bg-shallow-light-mint dark:hover:bg-dark-mint">
					Raffle
				</div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					id="account"
					class="flex h-full justify-center items-center text-left grow hover:cursor-pointer rounded-md hover:text-black dark:hover:text-white hover:bg-shallow-light-mint dark:hover:bg-dark-mint"
					on:click={() => toggleMenu("account")}>
					<button
						type="button"
						class="font-material-symbols-outlined text-4xl font-thin"
						id="account-menu-button"
						aria-expanded="true"
						aria-haspopup="true">
						<!-- TODO: Change fill on darkmode.-->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-7 h-7">
							<title>Account</title>
							<desc
								>Account: access notifications, profile, NFT Studio for creators and
								site settings.</desc>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
					</button>
					{#if showAccountMenu}
						<div
							class="absolute mt-[16.3rem] w-56 bg-black/60 backdrop-blur-lg rounded-b-md focus:outline-none text-center text-white z-40"
							on:mouseleave={() => toggleMenu("account")}
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="menu-button"
							tabindex="-1"
							transition:slide={{
								duration: 200,
								easing: linear,
							}}>
							<div class="p-2" role="none">
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<span
									class="block px-4 py-2 rounded-md text-sm hover:bg-shallow-light-mint dark:hover:bg-dark-mint hover:text-black dark:hover:text-white"
									role="menuitem"
									tabindex="-1"
									id="menu-item-0"
									on:click={() => toggleDarkMode(!dark)}>
									{#if dark}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="w-6 h-6 mx-auto">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
										</svg>
									{:else}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											class="w-6 h-6 mx-auto">
											<path
												fill-rule="evenodd"
												d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
												clip-rule="evenodd" />
										</svg>
									{/if}
								</span>
								<a
									href="/"
									class="block px-4 py-2 rounded-md text-sm hover:bg-shallow-light-mint hover:text-black dark:hover:bg-dark-mint"
									role="menuitem"
									tabindex="-1"
									id="menu-item-0">Notifications</a>
								<a
									href="/profile"
									class="block px-4 py-2 rounded-md text-sm hover:bg-shallow-light-mint hover:text-black dark:hover:bg-dark-mint"
									role="menuitem"
									tabindex="-1"
									id="menu-item-1">Profile</a>
								<a
									href="/"
									class="block px-4 py-2 text-sm rounded-md hover:bg-shallow-light-mint hover:text-black dark:hover:bg-dark-mint"
									role="menuitem"
									tabindex="-1"
									id="menu-item-2">Studio</a>
								<a
									href="/"
									class="block px-4 py-2 text-sm rounded-md hover:bg-shallow-light-mint hover:text-black dark:hover:bg-dark-mint"
									role="menuitem"
									tabindex="-1"
									id="settings">Settings</a>
							</div>
						</div>
					{/if}
				</div>
				<div
					id="wallet"
					class="flex h-full justify-center items-center text-left grow rounded-md hover:text-black dark:hover:text-white hover:bg-shallow-light-mint dark:hover:bg-dark-mint">
					<button
						type="button"
						class="inline-flex w-full justify-center align-middle font-material-symbols-outlined text-4xl font-thin"
						id="wallet-menu-button"
						aria-expanded="true"
						aria-haspopup="true"
						on:click={() => pairWalletOverlay.set(true)}>
						<!-- TODO: Add dropdown for wallet integration, i.e. remove wallet, add mutiwallet support -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="w-7 h-7">
							<title>Wallet</title>
							<desc
								>Wallet: Pair with your cryto wallets via Hashpack and Blade, multi
								wallet pairing coming soon...</desc>
							<path
								d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z" />
						</svg>
					</button>
				</div>
			</div>
		</div>
		{#if $pairWalletOverlay}
			<WalletOverlay />
		{/if}
		<!-- TODO: Removed pt-16...-->
		<slot />
		<div class="md:w-1/4 mx-auto text-stone-700 dark:text-white">
			<div class="w-full">
				{#if dark}
					<img
						src={AGORAH_BRANDING_LANDING_PAGE_FOOTER_DARK_MODE}
						alt={NFT_MARKET_PLACE}
						class="h-11 mx-auto" />
				{:else}
					<img
						src={AGORAH_BRANDING_LANDING_PAGE_FOOTER_LIGHT_MODE}
						alt={NFT_MARKET_PLACE}
						class="h-11 mx-auto" />
				{/if}
				<!-- TODO: Move to a store? -->
				<div class="w-5/6 mx-auto pt-4 text-center font-light dark:font-semibold text-sm">
					{NFT_MARKET_PLACE.toUpperCase()} MARKETPLACE IS THE NEWEST NFT MARKETPLACE BUILT
					FOR HEDERA. OUR MISSION IS TO MAKE NFTS SIMPLE. EXPLORE THE MARKET TO GET STARTED!
				</div>
				<div class="flex flex-row w-5/6 mx-auto pt-4 md:pt-8">
					<div class="w-1/3 float-left font-bold">Resources</div>
					<button
						class="w-2/3 float-right text-right"
						on:click={() => toggleMenu("resources")}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2.5"
							stroke="currentColor"
							class="w-6 h-6 float-right transition duration-500 {showResourcesMenu ===
							true
								? 'rotate-180'
								: ''}">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
						</svg>
					</button>
				</div>
				{#if showResourcesMenu}
					<ul
						class="w-5/6 mx-auto px-1"
						transition:slide={{
							delay: 250,
							duration: 250,
							easing: linear,
						}}>
						<li>
							<a
								href="/"
								class="block px-2 py-2 hover:font-bold hover:text-white hover:bg-light-mint dark:hover:bg-dark-mint"
								>About</a>
						</li>
						<li>
							<a
								href="/"
								class="block px-2 py-2 hover:font-bold hover:text-white hover:bg-light-mint dark:hover:bg-dark-mint"
								>Meet the Team</a>
						</li>
						<li>
							<a
								href="/"
								class="block px-2 py-2 hover:font-bold hover:text-white hover:bg-light-mint dark:hover:bg-dark-mint"
								>FAQ</a>
						</li>
						<li>
							<a
								href="/"
								class="block px-2 py-2 hover:font-bold hover:text-white hover:bg-light-mint dark:hover:bg-dark-mint"
								>Blog</a>
						</li>
						<li>
							<a
								href="/"
								class="block px-2 py-2 hover:font-bold hover:text-white hover:bg-light-mint dark:hover:bg-dark-mint"
								>Privacy Policy</a>
						</li>
						<li>
							<a
								href="/"
								class="block px-2 py-2 hover:font-bold hover:text-white hover:bg-light-mint dark:hover:bg-dark-mint"
								>Terms and Conditions</a>
						</li>
					</ul>
				{/if}
			</div>
			<div class="flex flex-row w-2/3 mx-auto pt-4 md:pt-8">
				<div class="w-1/4">
					<svg
						width="26"
						height="26"
						viewBox="0 0 26 26"
						class="mx-auto"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0.00521739 26L1.76282 19.5416C0.604696 17.5563 -0.00375782 15.2984 1.74619e-05 13C1.74619e-05 5.8201 5.82011 0 13 0C20.1799 0 26 5.8201 26 13C26 20.1799 20.1799 26 13 26C10.7026 26.0037 8.44566 25.3957 6.46101 24.2385L0.00521739 26ZM8.30831 6.9004C8.14043 6.91082 7.97639 6.95504 7.82601 7.0304C7.68499 7.11025 7.55626 7.21009 7.44381 7.3268C7.28781 7.4737 7.19941 7.60109 7.10451 7.72459C6.62405 8.34989 6.36561 9.11744 6.37001 9.90599C6.37261 10.543 6.53901 11.1631 6.79901 11.7429C7.33071 12.9155 8.20561 14.157 9.36131 15.3075C9.63951 15.5844 9.91121 15.8626 10.2037 16.1213C11.6381 17.3842 13.3474 18.2949 15.1957 18.7811L15.9354 18.8942C16.1759 18.9072 16.4164 18.889 16.6582 18.8773C17.0368 18.8577 17.4065 18.7552 17.7411 18.577C17.9113 18.4893 18.0775 18.3939 18.239 18.291C18.239 18.291 18.2949 18.2546 18.4015 18.174C18.577 18.044 18.6849 17.9517 18.8305 17.7996C18.9384 17.6878 19.032 17.5565 19.1035 17.407C19.2049 17.1951 19.3063 16.7908 19.3479 16.4541C19.3791 16.1967 19.37 16.0563 19.3661 15.9692C19.3609 15.8301 19.2452 15.6858 19.1191 15.6247L18.3625 15.2854C18.3625 15.2854 17.2315 14.7927 16.5412 14.4781C16.4684 14.4464 16.3904 14.4283 16.3111 14.4248C16.2222 14.4157 16.1323 14.4257 16.0475 14.4541C15.9628 14.4826 15.8851 14.5289 15.8197 14.5899V14.5873C15.8132 14.5873 15.7261 14.6614 14.7862 15.8002C14.7323 15.8727 14.658 15.9275 14.5728 15.9576C14.4876 15.9877 14.3953 15.9917 14.3078 15.9692C14.2231 15.9465 14.1401 15.9179 14.0595 15.8834C13.8983 15.8158 13.8424 15.7898 13.7319 15.7417L13.7254 15.7391C12.9817 15.4144 12.2931 14.9758 11.6844 14.4391C11.5206 14.2961 11.3685 14.1401 11.2125 13.9893C10.7011 13.4995 10.2553 12.9454 9.88651 12.3409L9.80981 12.2174C9.75472 12.1344 9.71018 12.0449 9.67721 11.9509C9.62781 11.7598 9.75651 11.6064 9.75651 11.6064C9.75651 11.6064 10.0724 11.2606 10.2193 11.0734C10.3416 10.9178 10.4557 10.756 10.5612 10.5885C10.7146 10.3415 10.7627 10.088 10.6821 9.89169C10.3181 9.00249 9.94111 8.11719 9.55371 7.23839C9.47701 7.0642 9.24951 6.93939 9.04281 6.91469C8.97261 6.9069 8.90241 6.8991 8.83221 6.8939C8.65763 6.88522 8.48269 6.88696 8.30831 6.8991V6.9004Z"
							fill="#434343" />
					</svg>
				</div>
				<div class="w-1/4">
					<svg
						width="26"
						height="26"
						viewBox="0 0 20 20"
						class="mx-auto"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M9.99731 6.66525C8.16111 6.66525 6.66262 8.16376 6.66262 10C6.66262 11.8362 8.16111 13.3348 9.99731 13.3348C11.8335 13.3348 13.332 11.8362 13.332 10C13.332 8.16376 11.8335 6.66525 9.99731 6.66525ZM19.9989 10C19.9989 8.61907 20.0114 7.25064 19.9338 5.87221C19.8563 4.27113 19.4911 2.85017 18.3203 1.67938C17.147 0.506085 15.7286 0.14334 14.1275 0.065788C12.7466 -0.0117644 11.3782 0.000744113 9.99981 0.000744113C8.61891 0.000744113 7.25051 -0.0117644 5.8721 0.065788C4.27105 0.14334 2.85012 0.508587 1.67935 1.67938C0.506076 2.85267 0.143338 4.27113 0.0657868 5.87221C-0.0117642 7.25314 0.000744099 8.62157 0.000744099 10C0.000744099 11.3784 -0.0117642 12.7494 0.0657868 14.1278C0.143338 15.7289 0.508578 17.1498 1.67935 18.3206C2.85262 19.4939 4.27105 19.8567 5.8721 19.9342C7.25301 20.0118 8.62141 19.9993 9.99981 19.9993C11.3807 19.9993 12.7491 20.0118 14.1275 19.9342C15.7286 19.8567 17.1495 19.4914 18.3203 18.3206C19.4936 17.1473 19.8563 15.7289 19.9338 14.1278C20.0139 12.7494 19.9989 11.3809 19.9989 10ZM9.99731 15.131C7.15795 15.131 4.86644 12.8394 4.86644 10C4.86644 7.16058 7.15795 4.86903 9.99731 4.86903C12.8367 4.86903 15.1282 7.16058 15.1282 10C15.1282 12.8394 12.8367 15.131 9.99731 15.131ZM15.3383 5.8572C14.6754 5.8572 14.14 5.32184 14.14 4.65889C14.14 3.99594 14.6754 3.46058 15.3383 3.46058C16.0013 3.46058 16.5366 3.99594 16.5366 4.65889C16.5368 4.81631 16.5059 4.97222 16.4458 5.1177C16.3856 5.26317 16.2974 5.39535 16.1861 5.50666C16.0748 5.61798 15.9426 5.70624 15.7971 5.76639C15.6516 5.82654 15.4957 5.8574 15.3383 5.8572Z"
							fill="#434343" />
					</svg>
				</div>
				<div class="w-1/4">
					<svg
						width="26"
						height="26"
						viewBox="0 0 11 21"
						class="mx-auto"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M10.2792 11.8118L10.8498 8.0115H7.28305V5.54531C7.28305 4.50581 7.78113 3.49191 9.37869 3.49191H11V0.256594C11 0.256594 9.52888 0 8.12195 0C5.18485 0 3.26508 1.82044 3.26508 5.11547V8.01216H0V11.8125H3.26508V21H7.28305V11.8125L10.2792 11.8118Z"
							fill="#434343" />
					</svg>
				</div>
				<div class="w-1/4">
					<svg
						width="26"
						height="26"
						viewBox="0 0 24 17"
						class="mx-auto"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M23.4991 2.65557C23.3625 2.14135 23.0946 1.6724 22.7223 1.29567C22.35 0.91894 21.8863 0.647638 21.3777 0.508917C19.5054 1.03264e-07 12 0 12 0C12 0 4.49464 -1.03264e-07 2.62232 0.50621C2.11345 0.644481 1.64953 0.915632 1.27716 1.29243C0.904787 1.66923 0.637069 2.13842 0.500893 2.65287C-1.02179e-07 4.54777 0 8.5 0 8.5C0 8.5 -1.02179e-07 12.4522 0.500893 14.3444C0.776786 15.3893 1.59107 16.2123 2.62232 16.4911C4.49464 17 12 17 12 17C12 17 19.5054 17 21.3777 16.4911C22.4116 16.2123 23.2232 15.3893 23.4991 14.3444C24 12.4522 24 8.5 24 8.5C24 8.5 24 4.54777 23.4991 2.65557ZM9.61607 12.1274V4.87261L15.8304 8.47293L9.61607 12.1274Z"
							fill="#434343" />
					</svg>
				</div>
			</div>
			<div class="py-4 pb-8 font-light font-sm text-center">
				Copyright 2022 {NFT_MARKET_PLACE}
			</div>
		</div>
	</div>
</div>
