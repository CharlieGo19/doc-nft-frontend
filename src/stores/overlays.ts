import { writable, type Writable } from "svelte/store";

export const pairWalletOverlay: Writable<boolean> = writable(false);
export const pairHashPackOverlay: Writable<boolean> = writable(false);
