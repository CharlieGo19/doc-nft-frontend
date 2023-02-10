import { browser } from "$app/environment";
import type { Writable } from "svelte/store";

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
					default:
						console.log("Could not handle key:value pair with key: ", key);
				}
			}
		}
		return def;
	}
}
