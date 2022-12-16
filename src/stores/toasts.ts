import { writable, type Writable } from "svelte/store";
import type { Toast } from "$lib/toast/toast";

export const toasts: Writable<Toast[]> = writable([]);
