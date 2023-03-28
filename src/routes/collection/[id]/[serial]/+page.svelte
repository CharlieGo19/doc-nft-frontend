<script lang="ts">
	import { page } from "$app/stores";
	import {
		AGORAH_API_BASE_URI,
		HEDERA_LOWERCASE_H,
		SUPPORTED_HEDERA_EXPLORER_ACCOUNT_URI,
		SUPPORTED_HEDERA_EXPLORER_TOKEN_URI,
	} from "src/stores/constants";

	async function fetchNftInformation() {
		let data: { collectionInfo: any; nft: any } = { collectionInfo: "", nft: "" };
		let res = await fetch(`${AGORAH_API_BASE_URI}/collection?collectionId=${$page.params.id}`);

		if (res.status !== 200) {
			const err = await res.json();
			throw new Error("Couldn't get NFT data, error returned: ", err.error);
		} else {
			const value = await res.json();
			data.collectionInfo = value;
		}

		res = await fetch(
			`${AGORAH_API_BASE_URI}/nft?collectionId=${$page.params.id}&serial=${$page.params.serial}`
		);

		if (res.status !== 200) {
			const err = await res.json();
			throw new Error("Couldn't get NFT data, error returned: ", err.error);
		} else {
			const value = await res.json();
			data.nft = value;
		}

		// TODO: Set Copyright information.

		if (data.nft.nft_properties !== null) {
			traits = setTraits(data.nft.nft_properties);
		}
		return data;
	}

	function tinyBarsToHbars(value: string): number {
		const tinyBars: number = Number(value);
		return tinyBars / 100000000;
	}

	function setTraits(value: string) {
		return JSON.parse(value).attributes;
	}

	let tokenId: string;
	let serial: string;
	let traits: any = null;

	const locale = "en";
	$: {
		tokenId = $page.params.id;
		serial = $page.params.serail;
	}
</script>

<div class="w-full font-Poppins text-white">
	<div class="flex flex-col md:flex-row w-4/5 mx-auto md:max-w-7xl py-10">
		{#await fetchNftInformation()}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				style="margin: auto; background: none; display: block; shape-rendering: auto;"
				width="184px"
				height="184px"
				viewBox="0 0 100 100"
				preserveAspectRatio="xMidYMid">
				<path d="M12 50A38 38 0 0 0 88 50A38 40.1 0 0 1 12 50" fill="#0a3a2a" stroke="none">
					<animateTransform
						attributeName="transform"
						type="rotate"
						dur="1s"
						repeatCount="indefinite"
						keyTimes="0;1"
						values="0 50 51.05;360 50 51.05" />
				</path>
			</svg>
		{:then data}
			<span class="md:w-1/3">
				<img
					src={data.nft.nft_file}
					alt={data.nft.nft_name}
					class="w-full object-cover border-2 border-light-mint dark:border-dark-mint rounded-lg shadow-xl" />
				{#if traits !== null && traits !== undefined}
					<span
						class="grid grid-cols-2 gap-2 w-full mt-2 px-4 py-4 rounded-lg bg-black/60 text-md">
						{#each traits as trait}
							<span
								class="p-1 border-2 rounded-sm border-shallow-light-mint bg-black/40">
								<p class="font-extralight text-sm text-center">
									{trait.trait_type}
								</p>
								<p class="font-semibold text-md text-center">{trait.value}</p>
							</span>
						{/each}
					</span>
				{/if}
			</span>
			<span class="flex flex-col mt-2 md:mt-0 md:w-2/3 md:pl-2">
				<span class="w-full px-4 py-2 rounded-lg bg-black/60 ">
					<p class="text-3xl font-semibold">{data.collectionInfo.token_name}</p>
					<p class="text-lg font-light">{data.nft.nft_name} - #{data.nft.serial_id}</p>
				</span>
				<span class="w-full mt-2 px-4 py-2 rounded-lg bg-black/60">
					{data.nft.nft_description}</span>
				<span class="grid grid-cols-2 w-full mt-2 px-4 py-2 rounded-lg bg-black/60 text-md">
					<span>Token ID:</span>
					<span>
						<a
							href="{SUPPORTED_HEDERA_EXPLORER_TOKEN_URI}/0.0.{data.collectionInfo
								.token_id}">0.0.{data.collectionInfo.token_id}</a>
					</span>
					<span>Token Serial:</span>
					<span>#{data.nft.serial_id}</span>
					<span>Token Name:</span>
					<span>{data.collectionInfo.token_name}</span>
					<span>Token Symbol:</span>
					<span>{data.collectionInfo.token_symbol}</span>
					<span>Token Current Supply:</span>
					<span>{data.collectionInfo.current_supply.toLocaleString()}</span>
					<span>Token Max Supply:</span>
					<span>{data.collectionInfo.max_supply.toLocaleString()}</span>
					{#if data.collectionInfo.royalty_collector.length > 0}
						<span>Token Royalities:</span>
						<span>
							{#each data.collectionInfo.royalty_collector as collector, i}
								{data.collectionInfo.royalty_fee[i] * 100}% to
								<a href="{SUPPORTED_HEDERA_EXPLORER_ACCOUNT_URI}/0.0.{collector}"
									>0.0.{collector}</a
								><br />
							{/each}
						</span>
					{/if}
					{#if data.collectionInfo.royalty_fallback_fee_amount.length > 0}
						<span>Token Fallback Fee:</span>
						<span>
							{#each data.collectionInfo.royalty_fallback_fee_amount as fee, i}
								{#if data.collectionInfo.royalty_fallback_fee_token[i] == 0}
									{tinyBarsToHbars(fee).toLocaleString()}
									{HEDERA_LOWERCASE_H}
								{:else}
									{fee} of
									<a
										href="{SUPPORTED_HEDERA_EXPLORER_TOKEN_URI}/0.0.{fee
											.royalty_fallback_fee_token[i]}">
										0.0.{fee.rooyalty_fallback_fee_token[i]}
									</a>
								{/if}
								to
								<a
									href="{SUPPORTED_HEDERA_EXPLORER_ACCOUNT_URI}/0.0.{data
										.collectionInfo.royalty_collector[i]}"
									>0.0.{data.collectionInfo.royalty_collector[i]}</a
								><br />
							{/each}
						</span>
					{/if}
					<span>Wipe Key Set:</span>
					<span>
						{#if data.collectionInfo.wipe_key}
							Yes
						{:else}
							No
						{/if}
					</span>
					<span>Supply Key Set:</span>
					<span>
						{#if data.collectionInfo.supply_key}
							Yes
						{:else}
							No
						{/if}
					</span>
					<span>Freeze Key Set:</span>
					<span>
						{#if data.collectionInfo.freeze_key}
							Yes
						{:else}
							No
						{/if}
					</span>
				</span>
			</span>
		{:catch error}
			{error}
		{/await}
	</div>
</div>
