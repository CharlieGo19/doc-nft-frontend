<script lang="ts">
    import { ERROR_GENERATING_QRCODE, HASHPACK_PAIRING_STRING_COPIED, HASHPACK_WALLET, TOAST_LEVEL_ERROR, TOAST_TIME_TO_LIVE_MEDIUM } from "src/stores/constants";
    import { hashpackPairingString } from "src/stores/wallet";
    import { startPairing } from "$lib/wallet-pairing/common";
    import QRCode from "qrcode";
    import { onMount } from "svelte";
    import { copyToClipBoard } from "$lib/common/functions";
    import { manageToast, type Toast } from "$lib/toast/toast";
    import { pairWithExtension } from "$lib/wallet-pairing/hashpack";

    let genQrCode: any;

    // TODO: Add loading element until qRCode generate
    onMount(async() => {
        // TODO -> startPairing needs a refactor, we need to get pairing data from initData obj.
        await startPairing(HASHPACK_WALLET);
        
        try {
            genQrCode = await QRCode.toDataURL($hashpackPairingString as string);
        } catch(e) {
            const t: Toast = {
                messageLevel: TOAST_LEVEL_ERROR,
                messageContent: ERROR_GENERATING_QRCODE
            }
            manageToast(t, TOAST_TIME_TO_LIVE_MEDIUM);
        }
    });

</script>
<!-- TODO: Add extra safeguards here incase of error to prevent the display of pairing string if paired. -->
<div class="w-full flex flex-col translate-y-1/4 text-white">
    <span class="w-1/2 mx-auto py-1 text-center font-extrabold">Pair Wallet</span>
    <button class="flex flex-row mx-auto py-1 justify-center border-4 border-[#525298] w-1/2 rounded-xl font-bold text-white hover:bg-black/50" on:click={pairWithExtension}>
        <img src="/wallets/hashpack-clear.svg" alt="HashPack" class="w-6 h-6">
        <span class="px-4">EXTENSION</span>
    </button>
    <span class="w-1/2 mx-auto mt-4 py-1 text-center font-extrabold">Pairing String</span>
    <div class="flex flex-row w-1/2 mx-auto px-3 py-3 space-x-2 border-4 border-[#525298] rounded-xl">
        <input class="flex truncate bg-transparent focus:outline-none focus:border-none focus:ring focus:ring-white focus:ring-opacity-40 rounded-sm" value={$hashpackPairingString}/>
        <button on:click={() => {
            copyToClipBoard($hashpackPairingString, HASHPACK_PAIRING_STRING_COPIED);
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <title>Copy your HahsPack Pairing String!</title>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
            </svg>
        </button>
    </div>
    <span class="w-1/2 mx-auto mt-4 py-1 text-center font-extrabold">Scan QR Code in your {HASHPACK_WALLET} app</span>
    <img src="{genQrCode}" alt="QRCode to pait with HashPack!" class="w-1/2 mx-auto" />
</div>