import { writable, type Writable } from "svelte/store";

export const pairWalletOverlay: Writable<boolean> = writable(true); // TODO: Set default back to false;