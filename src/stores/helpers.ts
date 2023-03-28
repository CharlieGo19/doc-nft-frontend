import { browser } from "$app/environment";
import type { CuratedNft } from "src/lib/common/interfaces";
import type { Writable } from "svelte/store";
import { AGORAH_API_BASE_URI, PAIRED_WALLET_KEY } from "./constants";

// TODO: As I add more storage options, change return type
/**
 *
 * @param {string} key key for the value to be stored in localStorage.
 * @param {boolean} value value destined for localStorage.
 */
export function commitToLocal(key: string, value: Writable<boolean | string | null>): void {
	if (browser) {
		value.subscribe((val: boolean | string | null) => {
			if (val === null || val === undefined) {
				window.localStorage.removeItem(key);
			} else {
				const storageEntry: string =
					typeof val === "object" ? JSON.stringify(val) : val.toString();
				window.localStorage.setItem(key, storageEntry);
			}
		});
	}
}

/**
 *
 * @param {string} key key of localStorage value.
 * @param {any} def default value if nothing is found.
 * @param {boolean} isObj flag to JSON.parse if an object.
 * @returns retrieves local data and sets the appropriate Writable defined by the key.
 */
export function retrieveFromLocal(
	key: string,
	def: boolean | null,
	isObj: boolean
): boolean | string | unknown {
	if (browser) {
		const storageEntry: string = window.localStorage.getItem(key) as string;
		if (storageEntry !== undefined && storageEntry !== null) {
			if (isObj) {
				return JSON.parse(storageEntry);
			} else {
				switch (key) {
					case PAIRED_WALLET_KEY:
						return storageEntry;
					default:
						console.log("Could not handle key:value pair with key: ", key);
				}
			}
		}
		return def;
	}
}

export async function getUsersNftCuration(accountId: string): Promise<CuratedNft[] | undefined> {
	// TODO: Add correct return type.
	if (accountId !== null) {
		const res = await fetch(`${AGORAH_API_BASE_URI}/curation?accountId=${accountId}`);
		if (res.status !== 200) {
			const err = await res.json();
			throw new Error("Couldn't get your NFT information, error returned: ", err.error);
		} else {
			const data = await res.json();
			return data;
		}
	}
}
