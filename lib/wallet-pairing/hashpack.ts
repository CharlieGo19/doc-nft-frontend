import { HashConnect, type HashConnectTypes } from "hashconnect";
import type { HashConnectProvider } from "hashconnect/dist/esm/provider/provider";
import {
	HASHPACK_EXTENSION_NOT_FOUND_MESSAGE,
	HASHPACK_FAILED_TO_UNPAIR_WALLET,
	HASHPACK_PAIR_SUCCESS,
	HASHPACK_UNPAIR_SUCCESS,
	HASHPACK_WALLET,
	NFT_MARKET_PLACE,
	NFT_MARKET_PLACE_URL,
	TOAST_LEVEL_ERROR,
	TOAST_LEVEL_SUCCESS,
	TOAST_TIME_TO_LIVE_MEDIUM,
} from "src/stores/constants";
import {
	accountBal,
	accountId,
	hashPackExtensionData,
	hashpackPairingString,
	hashPackProvider,
	hashPackTopic,
	isWalletPaired,
	pairedWallet,
	walletObj,
} from "src/stores/wallet";
import { manageToast, type Toast } from "../toast/toast";
import { setAccountInfo } from "./common";

const hashConnect: HashConnect = new HashConnect(false); // DEBUG
const metaData: HashConnectTypes.AppMetadata = {
	name: NFT_MARKET_PLACE,
	description: "An up and coming NFT platform, for the Hedera community.",
	url: NFT_MARKET_PLACE_URL,
	icon: "", // TODO: Add icon.
};

let iwp: boolean;
let aid: string | null;
let ht: string;
let hemd: HashConnectTypes.WalletMetadata;
let hp: HashConnectProvider | undefined;

isWalletPaired.subscribe((val) => {
	iwp = val;
});

accountId.subscribe((val) => {
	aid = val;
});

hashPackTopic.subscribe((val) => {
	ht = val;
});

hashPackExtensionData.subscribe((hped) => {
	hemd = hped;
});

hashPackProvider.subscribe((val) => {
	hp = val;
});

hashConnect.foundExtensionEvent.once((fee: HashConnectTypes.WalletMetadata) => {
	hashPackExtensionData.set(fee);
});

hashConnect.pairingEvent.once(async () => {
	isWalletPaired.set(true);
	pairedWallet.set(HASHPACK_WALLET);
	await setAccountInfo();

	const t: Toast = {
		messageLevel: TOAST_LEVEL_SUCCESS,
		messageContent: HASHPACK_PAIR_SUCCESS,
	};
	manageToast(t, TOAST_TIME_TO_LIVE_MEDIUM);
});

/**
 * initHashPack will set store values to enable basic functionality with HashPack
 * If it's an existing pairing it will also set account balance & Id.
 */
export async function initHashpack(): Promise<void> {
	const initData = await hashConnect.init(metaData, "testnet", true); // TODO: Abstract network to const

	if (initData.savedPairings.length > 0) {
		if (!iwp) {
			isWalletPaired.set(true);
			hashPackTopic.set(hashConnect.hcData.topic);
			hashPackProvider.set(
				hashConnect.getProvider("testnet", hashConnect.hcData.topic, aid as string)
			);
		}
		await setAccountInfo();
		// TODO: Create some logic to ensure only 1 account is paired for now.
		// MultiAccount support will come.
	}
	walletObj.set(hashConnect);
	hashpackPairingString.set(initData.pairingString);
	hashPackProvider.set(hashConnect.getProvider("testnet", initData.topic, aid as string)); //TODO: Abstract network to const.
}

/**
 *
 * @returns {void} Will create new credentials associated with Hashconnect and reset all platform pairing stores.
 */
export async function unpairHashPackWallet(): Promise<void> {
	await hashConnect.disconnect(ht);

	if (hashConnect.hcData.pairingData.length !== 0) {
		const t: Toast = {
			messageLevel: TOAST_LEVEL_ERROR,
			messageContent: HASHPACK_FAILED_TO_UNPAIR_WALLET,
		};
		manageToast(t, TOAST_TIME_TO_LIVE_MEDIUM);
		return;
	} else {
		// TODO: Check flags, as defaults to HP overlay - reset.
		walletObj.set(undefined);
		accountId.set(null);
		accountBal.set("0");
		hashpackPairingString.set(hashConnect.hcData.pairingString);
		pairedWallet.set(null);
		isWalletPaired.set(false);
		const t: Toast = {
			messageLevel: TOAST_LEVEL_SUCCESS,
			messageContent: HASHPACK_UNPAIR_SUCCESS,
		};
		manageToast(t, TOAST_TIME_TO_LIVE_MEDIUM);
		return;
	}
}

/**
 *
 * @returns {string} AccountID as reported by Hashpack.
 */
export function getHashpackAccountId(): string {
	return hashConnect.hcData.pairingData[0].accountIds[0];
}

/**
 *
 * @returns {string} Account Balance as reported by Hashpack.
 */
export async function getHashpackAccountBalance(): Promise<string> {
	const accBal: any = (
		await (hp as HashConnectProvider).getAccountBalance(aid as string)
	).hbars.toBigNumber();
	const fmtr: Intl.NumberFormat = new Intl.NumberFormat("en-gb"); // TODO: Refactor
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return fmtr.format(accBal);
}

/**
 *
 * @returns {void} Will prompt user to pair via browser app.
 */
export async function pairWithExtension(): Promise<void> {
	// TODO: Safeguard here, ensure to clear HP data.
	if (hemd === undefined || hemd.name !== HASHPACK_WALLET) {
		const t: Toast = {
			messageLevel: TOAST_LEVEL_ERROR,
			messageContent: HASHPACK_EXTENSION_NOT_FOUND_MESSAGE,
		};
		manageToast(t, TOAST_TIME_TO_LIVE_MEDIUM);
		return;
	} else {
		hashConnect.connectToLocalWallet();
		return;
	}
}
