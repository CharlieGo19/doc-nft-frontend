import { type Toast, manageToast } from "$lib/toast/toast";
import { BLADE_WALLET, BLADE_WALLET_EXTENSION_NOT_FOUND, BLADE_WALLET_EXTENSION_NOT_FOUND_MESSAGE, ERROR_WITH_ERROR, HASHPACK_WALLET, 
        TOAST_LEVEL_ERROR, TOAST_LEVEL_SUCCESS, TOAST_LEVEL_WARNING } from "src/stores/constants";
import { accountBal, accountId, isWalletPaired, pairedWallet } from "src/stores/wallet";
import { getAccountId, getAccountBalance, initBlade } from "./bladewallet";

let iwp: boolean;
let pw: string | null;

isWalletPaired.subscribe(val => {
    iwp = val;
});

pairedWallet.subscribe(val => {
    pw = val;
});

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
            let t: Toast = {
                messageLevel: TOAST_LEVEL_SUCCESS,
                messageContent: "Paired with Hashpack."
            }
            manageToast(t);
            break;
        case BLADE_WALLET:
            try {
                await initBlade();
                let t: Toast = {
                    messageLevel: TOAST_LEVEL_SUCCESS,
                    messageContent: "Successfully paired with Blade Wallet."
                }
                manageToast(t);
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
                    manageToast(t);
                }
            }
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