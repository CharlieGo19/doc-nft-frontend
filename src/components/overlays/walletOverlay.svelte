<script lang="ts">
    import { accountBal, accountId, isWalletPaired, pairedWallet } from "../../stores/wallet";
    import { pairWalletOverlay } from "../../stores/overlays";
    import { nftMarketPlace } from "../../stores";
    import { BLADE_WALLET, BLADE_WALLET_EXTENSION_NOT_FOUND, BLADE_WALLET_EXTENSION_NOT_FOUND_MESSAGE, ERROR_WITH_ERROR, 
            HASHPACK_WALLET, TOAST_LEVEL_ERROR, TOAST_LEVEL_SUCCESS, TOAST_LEVEL_WARNING } from "../../stores/constants";
    import { initBlade } from "$lib/wallet-pairing/bladewallet";
    import { manageToast, type Toast } from "$lib/toast/toast";
  import { fade } from "svelte/transition";

    let iwp: boolean;
    let pw: string | null;
    let accId: string | null;
    let accBal: string | null;

    isWalletPaired.subscribe(val => {
        iwp = val;
    });

    pairedWallet.subscribe(val => {
        pw = val;
    });

    accountId.subscribe(val => {
        accId = val;
    });

    accountBal.subscribe(val => {
        accBal = val;
    });

    async function startPairing(wallet: string): Promise<void> {
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
</script>

<div class="w-screen h-screen fixed flex flex-col top-[-56px] right-0 items-center bg-black/80 backdrop-blur-lg z-40" in:fade={{duration: 250}} out:fade>
    <button class="absolute top-4 right-3" on:click={() => {pairWalletOverlay.set(false)}}> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" class="w-6 h-6 stroke-light-mint">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
    {#if !$isWalletPaired}
        <div class="mt-48 text-white text-2xl">PAIR YOUR WALLET WITH</div>
        <div class="text-white text-2xl font-semibold">{$nftMarketPlace}</div>
        <div class="flex flex-row p-2 mt-28 space-x-14">
            <button on:click={() => {startPairing(BLADE_WALLET)}}>
                <img src="/wallets/blade-clear.png" alt="Click to connect via Blade Wallet." class="h-24 w-24 p-1 border rounded-xl border-white shadow-inner shadow-white hover:bg-black bg-black/10"/>
            </button>
            <button on:click={() => {isWalletPaired.set(false); startPairing(HASHPACK_WALLET);}}>
                <img src="/wallets/hashpack-clear.svg" alt="Click to connect via HashPack." class="h-24 w-24 border p-1 rounded-xl border-[#7A7AB8] shadow-inner shadow-[#7A7AB8] hover:bg-black bg-black/10" />
            </button>  
        </div>
    {:else}
        <div class="mt-48 text-white text-2xl">{pw}</div>
        <div class="flex flex-col p-2 mt-28">
            <span> Account ID: {accId} </span>
            <span> HBar Balance: {accBal} </span>
        </div>
    {/if}
</div>