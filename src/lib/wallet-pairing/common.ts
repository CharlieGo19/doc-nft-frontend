import { type Toast, manageToast } from "$lib/toast/toast";
import { BLADE_WALLET, BLADE_WALLET_EXTENSION_NOT_FOUND, BLADE_WALLET_EXTENSION_NOT_FOUND_MESSAGE, BLADE_WALLET_PAIR_SUCCESS, ERROR_WITH_ERROR, HASHPACK_WALLET, 
        INVALID_WALLET_SELECTION, 
        TOAST_LEVEL_ERROR, TOAST_LEVEL_SUCCESS, TOAST_LEVEL_WARNING, TOAST_TIME_TO_LIVE_MEDIUM, TOAST_TIME_TO_LIVE_SHORT } from "src/stores/constants";
import { accountBal, accountId, hashpackPairingString, isWalletPaired, pairedWallet } from "src/stores/wallet";
import { getAccountId, getAccountBalance, initBlade } from "./bladewallet";
import { initHashpack, unpairHashPackWallet } from "./hashpack";

let iwp: boolean;
let pw: string | null;
let hps: string | null;

isWalletPaired.subscribe(val => {
    iwp = val;
});

pairedWallet.subscribe(val => {
    pw = val;
});

hashpackPairingString.subscribe(val => {
    hps = val;
});

export async function initPairedWallet() {
    if (iwp) {
        switch(pw) {
            case HASHPACK_WALLET:
                await initHashpack();
                break;
        }
        //TODO: Blade
    }
}
/**
 * 
 * @param wallet wallet to be paired.
 * 
 * startPairing will check if a wallet is already paired, if one exists, will set the walletObj,
 * else it will pair with request wallet and set walletObj.
 */
export async function startPairing(wallet: string): Promise<void> {
    switch(wallet) {
        case HASHPACK_WALLET:
            await initHashpack();
            break;
        case BLADE_WALLET:
            try {
                await initBlade(); // TODO: Move toasts in to Blade.
                let t: Toast = {
                    messageLevel: TOAST_LEVEL_SUCCESS,
                    messageContent: BLADE_WALLET_PAIR_SUCCESS
                }
                manageToast(t, TOAST_TIME_TO_LIVE_SHORT);
            }catch(e) {
                if (e instanceof Error) {
                    let t: Toast = {
                        messageLevel: TOAST_LEVEL_WARNING,
                        messageContent:  ERROR_WITH_ERROR
                    };
                    if (e.name === BLADE_WALLET_EXTENSION_NOT_FOUND) {
                        t = {
                                messageLevel: TOAST_LEVEL_ERROR,
                                messageContent: BLADE_WALLET_EXTENSION_NOT_FOUND_MESSAGE,
                            };
                        }
                    manageToast(t, TOAST_TIME_TO_LIVE_MEDIUM);
                }
            }
            break;
        default: 
            let t: Toast = {
                messageLevel: TOAST_LEVEL_ERROR,
                messageContent: INVALID_WALLET_SELECTION
            };
            manageToast(t, TOAST_TIME_TO_LIVE_MEDIUM);
    }
}

export async function unpairWallet(): Promise<void> {
    switch(pw) {
        case HASHPACK_WALLET:
            await unpairHashPackWallet();
            break;
        case BLADE_WALLET:
            break;
    }
}

/**
 * 
 * @returns the name of current paired wallet.
 */
export function checkPairedWallet(): string | null  {
    // TODO: Fix bug here, we should check if wallObj is empty too, if it is and pw is !null then update that case
    if (!iwp) {
        if(pw !== null) { // TODO: Additional check to ensure valid wallet.
            isWalletPaired.set(true);
            return pw;
        }
    }
    return pw;
}

/**
 * 
 * @returns sets non-localStorage account details in svelte store
 */
export async function setAccountInfo(): Promise<void> {
    // TODO: Refactor using interface
    if (isWalletPaired) {
        switch (pw) {
            case BLADE_WALLET:
                accountId.set(getAccountId());
                accountBal.set(await getAccountBalance());
                break;
        }
    }
    return;
}