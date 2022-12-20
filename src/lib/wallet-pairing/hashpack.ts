import { manageToast, type Toast } from "$lib/toast/toast";
import { HashConnect, type HashConnectTypes } from "hashconnect";
import type { HashConnectProvider } from "hashconnect/dist/esm/provider/provider";
import { HASHPACK_EXTENSION_NOT_FOUND_MESSAGE, HASHPACK_FAILED_TO_UNPAIR_WALLET, HASHPACK_PAIR_SUCCESS, HASHPACK_UNPAIR_SUCCESS, HASHPACK_WALLET, 
    NFT_MARKET_PLACE, NFT_MARKET_PLACE_URL, TOAST_LEVEL_ERROR, TOAST_LEVEL_SUCCESS, TOAST_TIME_TO_LIVE_MEDIUM } from "src/stores/constants";
import { accountBal, accountId, hashPackExtensionData, hashpackPairingString, hashPackProvider, hashPackTopic, 
    isWalletPaired, pairedWallet, walletObj } from "src/stores/wallet";

const hashConnect: HashConnect = new HashConnect(true);
const metaData: HashConnectTypes.AppMetadata = {
    name: NFT_MARKET_PLACE,
    description: "An up and coming NFT platform, for the Hedera community.",
    url: NFT_MARKET_PLACE_URL,
    icon: "", // TODO: Add icon.
};

export let pairingString: string;
let hemd: HashConnectTypes.WalletMetadata;
let iwp: boolean;
let aid: string | null;
let ht: string;
let hp: HashConnectProvider | undefined;

isWalletPaired.subscribe(val => {
    iwp = val;
});

accountId.subscribe(val => {
    aid = val;
});

hashPackTopic.subscribe(val => {
    ht = val;
});

hashPackProvider.subscribe(val => {
    hp = val;
});

hashPackExtensionData.subscribe((hped) => {
    hemd = hped;
});


hashConnect.foundExtensionEvent.once((fee: HashConnectTypes.WalletMetadata) => {
    hashPackExtensionData.set(fee);
});

hashConnect.pairingEvent.on(() => {
    isWalletPaired.set(true);
    pairedWallet.set(HASHPACK_WALLET);
    let t: Toast = { 
        messageLevel: TOAST_LEVEL_SUCCESS,
        messageContent: HASHPACK_PAIR_SUCCESS
    };
    manageToast(t, TOAST_TIME_TO_LIVE_MEDIUM);
});
hashConnect.acknowledgeMessageEvent.on(e => {
    console.log("Ack")
    console.log(e);

});

hashConnect.connectionStatusChangeEvent.on(e => {
    console.log("Conn: ", e)
});

// Listen to other events. figure out which is fired on disconnect...
export async function initHashpack(): Promise<void> {
    let initData = await hashConnect.init(metaData, "testnet", true); // TODO: Abstract network to const

    if (initData.savedPairings.length > 0) {
        if (!iwp) {
            isWalletPaired.set(true);
        }
        accountId.set(initData.savedPairings[0].accountIds[0]);
        hashPackTopic.set(initData.topic);
        hashPackProvider.set(hashConnect.getProvider("testnet", initData.topic, aid as string)); // TODO: Abstract network to const.
        
        const accBal = (await (hp as HashConnectProvider).getAccountBalance(aid as string)).hbars.toBigNumber();
        const fmtr: Intl.NumberFormat = new Intl.NumberFormat('en-gb'); // TODO: Refactor
        // @ts-ignore
        accountBal.set(fmtr.format(accBal));
        // TODO: Create some logic to ensure only 1 account is paired for now.
        // MultiAccount support will come.
    }
    walletObj.set(hashConnect);
    hashpackPairingString.set(initData.pairingString);
    hashPackProvider.set(hashConnect.getProvider("testnet", initData.topic, aid as string)); //TODO: Abstract network to const.
};

export async function pairWithExtension(): Promise<void> {
    // TODO: Safeguard here, ensure to clear HP data.
    if (hemd === undefined || hemd.name !== HASHPACK_WALLET) {
        let t: Toast = {
            messageLevel: TOAST_LEVEL_ERROR,
            messageContent: HASHPACK_EXTENSION_NOT_FOUND_MESSAGE
        };
        manageToast(t, TOAST_TIME_TO_LIVE_MEDIUM);
        return;
    } else {
        hashConnect.connectToLocalWallet();
        return;
    }
}

export async function unpairHashPackWallet(): Promise<void> {
    await hashConnect.disconnect(ht);

    if (hashConnect.hcData.pairingData.length !== 0) {
        let t: Toast = {
            messageLevel: TOAST_LEVEL_ERROR,
            messageContent: HASHPACK_FAILED_TO_UNPAIR_WALLET
        };
        manageToast(t, TOAST_TIME_TO_LIVE_MEDIUM);
        return
    } else {
        // TODO: Check flags, as defaults to HP overlay - reset.
        walletObj.set(undefined);
        accountId.set(null);
        accountBal.set("0");
        hashpackPairingString.set(hashConnect.hcData.pairingString);
        pairedWallet.set(null);
        isWalletPaired.set(false);
        let t: Toast = {
            messageLevel: TOAST_LEVEL_SUCCESS,
            messageContent: HASHPACK_UNPAIR_SUCCESS
        };
        manageToast(t, TOAST_TIME_TO_LIVE_MEDIUM);
        return;
    }

}