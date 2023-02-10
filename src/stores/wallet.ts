import { writable, type Writable } from "svelte/store";
import type { BladeSigner } from "@bladelabs/blade-web3.js";
import type { HashConnect, HashConnectTypes } from "hashconnect";
import type { HashConnectProvider } from "hashconnect/dist/esm/provider/provider";
import { retrieveFromLocal, commitToLocal } from "./helpers";
import { IS_WALLET_PAIRED_KEY, PAIRED_WALLET_KEY } from "./constants";

// Values to commit to localStorage.
export const isWalletPaired: Writable<boolean> = writable(
	retrieveFromLocal(IS_WALLET_PAIRED_KEY, false, true) as boolean
);
export const pairedWallet: Writable<string | null> = writable(
	retrieveFromLocal(PAIRED_WALLET_KEY, null, false) as string | null
);

commitToLocal(IS_WALLET_PAIRED_KEY, isWalletPaired);
commitToLocal(PAIRED_WALLET_KEY, pairedWallet);

// Values not to be commited to localStorage.
export const walletObj: Writable<HashConnect | BladeSigner | undefined> = writable(undefined);
export const accountId: Writable<string | null> = writable(null);
export const accountBal: Writable<string> = writable("0");

// TODO: Change if needed in localStorage
export const hashpackPairingString: Writable<string | null> = writable(null);
export const hashPackExtensionData: Writable<HashConnectTypes.WalletMetadata> = writable();
export const hashPackTopic: Writable<string> = writable();
export const hashPackProvider: Writable<HashConnectProvider> = writable();
