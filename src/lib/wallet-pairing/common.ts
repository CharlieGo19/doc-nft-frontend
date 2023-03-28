import {
	BLADE_WALLET,
	HASHPACK_WALLET,
	INVALID_WALLET_SELECTION,
	TOAST_LEVEL_ERROR,
	TOAST_TIME_TO_LIVE_MEDIUM,
} from "src/stores/constants";
import { getUsersNftCuration } from "src/stores/helpers";
import {
	accountBal,
	accountId,
	isWalletPaired,
	nftCuration,
	pairedWallet,
} from "src/stores/wallet";
import { manageToast, type Toast } from "../toast/toast";
import {
	getBladeAccountBalance,
	getBladeAccountId,
	initBlade,
	unpairBladeWallet,
} from "./bladewallet";
import {
	getHashpackAccountBalance,
	getHashpackAccountId,
	initHashpack,
	unpairHashPackWallet,
} from "./hashpack";

//  TODO: Create Wallet interface for common functions, i.e. getAccBal.

let iwp: boolean;
let pw: string | null;

isWalletPaired.subscribe((val) => {
	iwp = val;
});

pairedWallet.subscribe((val) => {
	pw = val;
});

/**
 * initPairedWallet will check to see if there's an existing pairing, if there is, it will attempt to set up wallet object.
 */
export async function initPairedWallet() {
	if (iwp) {
		switch (pw) {
			case HASHPACK_WALLET:
				initHashpack();
				console.log(accountId);
				break;
			case BLADE_WALLET:
				await initBlade();
				break;
		}
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
	switch (wallet) {
		case HASHPACK_WALLET:
			await initHashpack();
			break;
		case BLADE_WALLET:
			await initBlade(); // TODO: Move toasts in to Blade.
			break;
		default:
			//eslint-disable-next-line no-case-declarations
			const t: Toast = {
				messageLevel: TOAST_LEVEL_ERROR,
				messageContent: INVALID_WALLET_SELECTION,
			};
			manageToast(t, TOAST_TIME_TO_LIVE_MEDIUM);
	}
}

/**
 * Unpairs currently paired wallet and cleans up stored wallet objects.
 */
export async function unpairWallet(): Promise<void> {
	console.log(pw);
	switch (pw) {
		case HASHPACK_WALLET:
			unpairHashPackWallet();
			//await unpairHashPackWallet();
			break;
		case BLADE_WALLET:
			unpairBladeWallet();
			break;
	}
}

/**
 *
 * @returns the name of current paired wallet.
 */
export async function checkPairedWallet(): Promise<string | null> {
	// TODO: Fix bug here, we should check if wallObj is empty too, if it is and pw is !null then update that case
	if (!iwp) {
		if (pw !== null) {
			// TODO: Additional check to ensure valid wallet.
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
			case HASHPACK_WALLET:
				accountId.set(getHashpackAccountId());
				accountBal.set(await getHashpackAccountBalance());
				nftCuration.set(await getUsersNftCuration(getHashpackAccountId()));
				break;
			case BLADE_WALLET:
				accountId.set(getBladeAccountId());
				accountBal.set(await getBladeAccountBalance());
				break;
		}
	}
	return;
}
