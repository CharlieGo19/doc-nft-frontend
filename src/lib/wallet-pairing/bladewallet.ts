import { HederaNetwork, BladeSigner } from "@bladelabs/blade-web3.js";
import type { HashConnect } from "hashconnect";
import {
	BLADE_WALLET,
	BLADE_WALLET_EXTENSION_NOT_FOUND,
	BLADE_WALLET_EXTENSION_NOT_FOUND_MESSAGE,
	BLADE_WALLET_PAIR_SUCCESS,
	BLADE_WALLET_UNPAIR_SUCCESS,
	ERROR_WITH_ERROR,
	NFT_MARKET_PLACE,
	TOAST_LEVEL_ERROR,
	TOAST_LEVEL_SUCCESS,
	TOAST_LEVEL_WARNING,
	TOAST_TIME_TO_LIVE_MEDIUM,
	TOAST_TIME_TO_LIVE_SHORT,
	WALLET_ALREADY_PAIRED,
} from "src/stores/constants";
import { accountBal, accountId, isWalletPaired, pairedWallet, walletObj } from "src/stores/wallet";
import { checkPairedWallet, setAccountInfo } from "./common";
import { manageToast, type Toast } from "../toast/toast";

let bs: HashConnect | BladeSigner | undefined;

walletObj.subscribe((val) => {
	bs = val;
});

/**
 * @returns Sets wallet paired flag, name of wallet paired and the wallet object.
 */
export async function initBlade(): Promise<void | never> {
	const wallet: string | null = await checkPairedWallet();

	if (wallet === null || wallet === BLADE_WALLET) {
		const params = {
			network: HederaNetwork.Testnet, // TODO: Extract to env variable.
			dAppCode: NFT_MARKET_PLACE, // TODO: Contact blade regarding a setup for dAppCode?
		};

		try {
			walletObj.set(new BladeSigner());
			await (bs as BladeSigner).createSession(params);
			isWalletPaired.set(true);
			pairedWallet.set(BLADE_WALLET);
			setAccountInfo();
			const t: Toast = {
				messageLevel: TOAST_LEVEL_SUCCESS,
				messageContent: BLADE_WALLET_PAIR_SUCCESS,
			};
			manageToast(t, TOAST_TIME_TO_LIVE_SHORT);
		} catch (e) {
			walletObj.set(undefined);
			if (e instanceof Error) {
				let t: Toast = {
					messageLevel: TOAST_LEVEL_WARNING,
					messageContent: ERROR_WITH_ERROR,
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
	} else {
		const t: Toast = {
			messageLevel: TOAST_LEVEL_WARNING,
			messageContent: WALLET_ALREADY_PAIRED,
		};
		manageToast(t, TOAST_TIME_TO_LIVE_SHORT);
	}
}

/**
 *
 * @returns {string} AccountID as reported by BladeWallet.
 */
export function getBladeAccountId(): string {
	return (bs as BladeSigner).getAccountId().toString();
}

/**
 *
 * @returns {string} Returns account balance as reported by BladeWallet.
 */
export async function getBladeAccountBalance(): Promise<string> {
	const fmtr: Intl.NumberFormat = new Intl.NumberFormat("en-gb");
	const bal: any = (await (bs as BladeSigner).getAccountBalance()).hbars.toBigNumber(); // TODO: Refactor
	return fmtr.format(bal.toString());
}

/**
 *
 * Does not actually close Blade Wallet session, as they do not provide this facility.
 * Instead we clear all our stores to allow the user to use a different Wallet of their choosing.
 */
export function unpairBladeWallet() {
	walletObj.set(undefined);
	accountId.set(null);
	accountBal.set("0");
	pairedWallet.set(null);
	isWalletPaired.set(false);
	const t: Toast = {
		messageLevel: TOAST_LEVEL_SUCCESS,
		messageContent: BLADE_WALLET_UNPAIR_SUCCESS,
	};
	manageToast(t, TOAST_TIME_TO_LIVE_MEDIUM);
}
