import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";
import type { BladeSigner } from "@bladelabs/blade-web3.js";
import type { HashConnect, HashConnectTypes } from "hashconnect";
import type { HashConnectProvider } from "hashconnect/dist/esm/provider/provider";

// Values to commit to localStorage.
export const isWalletPaired: Writable<boolean> = writable(retrieveFromLocal("isWalletPaired", false, true));
export const pairedWallet: Writable<string | null> = writable(retrieveFromLocal("pairedWallet", null, false));

commitToLocal("isWalletPaired", isWalletPaired);
commitToLocal("pairedWallet", pairedWallet);
/**
 * 
 * @param {string} key key for the value to be stored in localStorage.
 * @param {any} value value destined for localStorage.
 */
function commitToLocal(key: string, value: any): void {
    if (browser) {
        value.subscribe((val: any) => {
            if(val === null || val === undefined) {
                window.localStorage.removeItem(key);
            } else {
                const storageEntry: any = (typeof val === "object") ? JSON.stringify(val) : val.toString();
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

// Values not to be commited to localStorage.
export const walletObj: Writable<HashConnect | BladeSigner | undefined> = writable(undefined);
export const accountId: Writable<string | null> = writable(null);
export const accountBal: Writable<string> = writable("0");

// TODO: Change if needed in localStorage
export const hashpackPairingString: Writable<string | null> = writable(null);
export const hashPackExtensionData: Writable<HashConnectTypes.WalletMetadata> = writable();
export const hashPackTopic: Writable<string> = writable();
export const hashPackProvider: Writable<HashConnectProvider> = writable();

