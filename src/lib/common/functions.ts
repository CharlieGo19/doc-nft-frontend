import { manageToast, type Toast } from "$lib/toast/toast";
import {
    ERROR_COPYING_TO_CLIPBOARD,
    TOAST_LEVEL_SUCCESS,
    TOAST_LEVEL_WARNING,
    TOAST_TIME_TO_LIVE_MEDIUM,
    TOAST_TIME_TO_LIVE_SHORT,
} from "src/stores/constants";

export function scrollLeft(x: number, eleId: HTMLUListElement): void {
    eleId.scrollLeft -= x; // width of NFT - maybe extract this out to global?s
}

export function scrollRight(x: number, eleId: HTMLUListElement): void {
    eleId.scrollLeft += x;
}

/**
 *
 * @param { string | null } value the value to be copied to the clipboard, a null param will warn user it failed.
 * @param { string } toastMessage message to displayed on success.
 */
export function copyToClipBoard(
    value: string | null,
    toastMessage: string
): void {
    if (value !== null) {
        let t: Toast = {
            messageLevel: TOAST_LEVEL_SUCCESS,
            messageContent: toastMessage,
        };

        navigator.clipboard.writeText(value as string);
        manageToast(t, TOAST_TIME_TO_LIVE_SHORT);
    } else {
        let t: Toast = {
            messageLevel: TOAST_LEVEL_WARNING,
            messageContent: ERROR_COPYING_TO_CLIPBOARD,
        };
        manageToast(t, TOAST_TIME_TO_LIVE_MEDIUM);
    }
}
