import { writable, type Writable } from "svelte/store";

export const pairWalletOverlay: Writable<boolean> = writable(false);