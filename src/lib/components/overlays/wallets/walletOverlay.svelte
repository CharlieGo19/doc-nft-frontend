<script lang="ts">
    import { accountBal, accountId, isWalletPaired } from "src/stores/wallet";
    import {
        initPairedWallet,
        startPairing,
        unpairWallet,
    } from "src/lib/wallet-pairing/common";
    import {
        pairWalletOverlay,
        pairHashPackOverlay,
    } from "src/stores/overlays";
    import { BLADE_WALLET, HASHPACK_WALLET } from "src/stores/constants";
    import { fade } from "svelte/transition";
    import HashpackOverlay from "./hashpackOverlay.svelte";
    import { onMount } from "svelte";

    onMount(async () => {
        await initPairedWallet();
    });
</script>

<div
    class="w-screen h-screen fixed flex flex-col top-[-56px] right-0 items-center bg-black/80 backdrop-blur-lg z-40"
    in:fade={{ duration: 250 }}
    out:fade>
    <div class="md:absolute md:w-full md:max-w-7xl">
        <button
            class="absolute top-7 right-4 md:top-7 md:right-[30px]"
            on:click={() => {
                $pairWalletOverlay = false;
                $pairHashPackOverlay = false;
            }}>
            <div class="relative flex items-center justify-center">
                <span
                    class="relative flex h-1 w-[27px] left-[1.7rem] bg-light-mint rounded-md -rotate-45" />
                <span
                    class="relative flex h-1 w-[27px] bg-light-mint rounded-md rotate-45" />
            </div>
        </button>
    </div>
    {#if !$isWalletPaired && !$pairHashPackOverlay}
        <div class="flex my-auto space-x-20">
            <button
                on:click={() => {
                    startPairing(BLADE_WALLET);
                }}>
                <img
                    src="/wallets/blade-clear.png"
                    alt="Click to connect via Blade Wallet."
                    class="h-24 w-24 p-1 border rounded-xl border-white shadow-inner shadow-white hover:bg-black bg-black/10" />
            </button>
            <button
                on:click={() => {
                    $pairHashPackOverlay = true;
                }}>
                <img
                    src="/wallets/hashpack-clear.svg"
                    alt="Click to connect via HashPack."
                    class="h-24 w-24 border p-1 rounded-xl border-[#7A7AB8] shadow-inner shadow-[#7A7AB8] hover:bg-black bg-black/10" />
            </button>
        </div>
    {:else if !$isWalletPaired && $pairHashPackOverlay}
        <HashpackOverlay />
    {:else}
        <div class="mt-48 text-white text-2xl" />
        <div class="flex flex-col p-2 mt-28">
            <span> Account ID: {$accountId}</span>
            <span> HBar Balance: {$accountBal}</span>
            <button
                class="bg-purple-700 text-white font-bold"
                on:click={unpairWallet}>Unpair</button>
        </div>
    {/if}
</div>
