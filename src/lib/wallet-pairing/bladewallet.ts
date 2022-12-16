import { BladeSigner, HederaNetwork } from "@bladelabs/blade-web3.js";
import { BLADE_WALLET, NFT_MARKET_PLACE, WALLET_ALREADY_PAIRED } from "src/stores/constants";
import { isWalletPaired, pairedWallet, walletObj } from "src/stores/wallet";
import { checkPairedWallet, setAccountInfo } from "./common";

let bs: BladeSigner | undefined;

walletObj.subscribe(val => {
    bs = val;
});

/**
 * @returns Sets wallet paired flag, name of wallet paired and the wallet object.
 */
export async function initBlade(): Promise<void | never> {
    const wallet: string | null = checkPairedWallet();

    if (wallet === null || wallet === BLADE_WALLET) {
        const params = {
            network: HederaNetwork.Testnet, // TODO: Extract to env variable.
            dAppCode: NFT_MARKET_PLACE // TODO: Contact blade regarding a setup for dAppCode?
        };
        
        try {
            walletObj.set(new BladeSigner());
            // @ts-ignore
            await (bs as BladeSigner).createSession(params);
            isWalletPaired.set(true);
            pairedWallet.set(BLADE_WALLET);
            setAccountInfo();

        }catch(e) {
            walletObj.set(undefined);
            throw e;
        }
    } else {
        throw new Error(WALLET_ALREADY_PAIRED);
    }
}

export function getAccountId(): string {
    return (bs as BladeSigner).getAccountId().toString();
}

export async function getAccountBalance(): Promise<string> {
    const fmtr: Intl.NumberFormat = new Intl.NumberFormat('en-gb');
    const bal: any = await (await (bs as BladeSigner).getAccountBalance()).hbars.toBigNumber();
    return(fmtr.format(bal));
}

