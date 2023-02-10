import { writable, type Writable } from "svelte/store";
import { commitToLocal, retrieveFromLocal } from "src/stores/helpers";
import { THEME_DARK_LIGHT_MODE_KEY } from "./constants";

export const theme: Writable<boolean> = writable(
	retrieveFromLocal(THEME_DARK_LIGHT_MODE_KEY, false, true) as boolean
);

commitToLocal(THEME_DARK_LIGHT_MODE_KEY, theme);

export function toggleDarkMode(value: boolean): void {
	theme.set(value);
	commitToLocal(THEME_DARK_LIGHT_MODE_KEY, theme);
}
