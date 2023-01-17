import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

export const darkTheme: Writable<boolean> = writable(
    retrieveFromLocal("darkTheme", false, false)
);

commitToLocal("darkTheme", darkTheme);
// TODO: Refactor

export function toggleDarkMode(value: boolean): void {
    darkTheme.set(value);
    commitToLocal("darkTheme", darkTheme);
}
/**
 *
 * @param {string} key key for the value to be stored in localStorage.
 * @param {any} value value destined for localStorage.
 */
function commitToLocal(key: string, value: any): void {
    if (browser) {
        value.subscribe((val: any) => {
            if (val === null || val === undefined) {
                window.localStorage.removeItem(key);
            } else {
                const storageEntry: any =
                    typeof val === "object"
                        ? JSON.stringify(val)
                        : val.toString();
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
function retrieveFromLocal(key: string, def: any, isObj: boolean): any {
    if (browser) {
        const storageEntry: any = window.localStorage.getItem(key);
        if (storageEntry !== undefined && storageEntry !== null) {
            if (isObj) {
                return JSON.parse(storageEntry);
            } else {
                return storageEntry;
            }
        }
        return def;
    }
}
