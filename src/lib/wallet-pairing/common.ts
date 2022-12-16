import { BLADE_WALLET } from "../../stores/constants";
import { accountBal, accountId, isWalletPaired, pairedWallet } from "../../stores/wallet";
import { getAccountId, getAccountBalance } from "./bladewallet";

let iwp: boolean;
let pw: string | null;

isWalletPaired.subscribe(val => {
    iwp = val;
});

pairedWallet.subscribe(val => {
    pw = val;
});

/*
    If isWalletPaired and pairedWallet are out of sync we need to correct this
    in order to allow users to re-pair their wallets.
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