import { AGORAH_API_BASE_URI } from "src/stores/constants";

export const prerender = false;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const collectionInfoResp = await fetch(
		`${AGORAH_API_BASE_URI}/collection?collectionId=${params.id}`
	);
	const nftResp = await fetch(
		`${AGORAH_API_BASE_URI}/nft?collectionId=${params.id}&serial=${params.serial}`
	);
	if (collectionInfoResp.status === 200 && nftResp.status === 200) {
		const retrievedCollectionInfo = await collectionInfoResp.json();
		const retrievedNft = await nftResp.json();
		console.log(retrievedCollectionInfo);
		return { collectionInfo: retrievedCollectionInfo, nft: retrievedNft };
	} else {
		console.log("Errors!!");
	}
}
