<script lang="ts">
    import "../app.postcss";
    import { nftMarketPlace, nftMarketPlaceLogo } from "../stores";
    import { slide } from "svelte/transition";
    import { linear } from "svelte/easing";

    export const prerender = true;

    let showAccountMenu: boolean = false;
    let showMobileMenu: boolean = false;
    let showResourcesMenu: boolean = false;

    function closeMenu(event: KeyboardEvent): void {
        if (event.key === "Escape") {
            showAccountMenu = false;
        }
    }

    const toggleMenu = (menu: string): any => {
        if (menu === "account") {
            showAccountMenu = !showAccountMenu;
        } else if (menu === "mobile") {
            showMobileMenu = !showMobileMenu;
        } else if (menu === "resources") {
            showResourcesMenu = !showResourcesMenu;
        }
    }
</script>

<svelte:window on:keydown={closeMenu}/>
<!-- TODO: Change h-screen to h-full when content added -->
<div class="h-screen w-full flex flex-col space-y-14 overflow-x-hidden md:overflow-y-auto bg-gradient-to-b from-[#82FFF2] to-white"> <!--bg-gradient-to-b from-light-mode-mint via-white to-light-mode-mint"> -->
    <div class="flex w-full items-center md:px-6 md:py-2">
        <div class="hidden flex-row w-full h-11 justify-between text-sm px-6
                    place-items-center text-center md:flex max-w-7xl m-auto">
        <div id="{$nftMarketPlace}" class="grow z-0">
            <a href="/">{$nftMarketPlace}</a>
        </div>
        <div id="search" class="grow-2 mx-auto my-auto">
            <!-- TODO: Provide drop down with options of filtered NFTs / Projects-->
            <input class="border-none w-full bg-white h-10 px-2 rounded-lg text-sm focus:outline-none"
                type="search" placeholder="Search items, collections & accounts">
        </div>
        <div id="launchPad" class="grow">Launch Pad</div>
        <div id="explore" class="grow">Explore</div>
        <div id="activity" class="grow">Activity</div>
        <div id="dao" class="grow">DAO</div>
        <div id="raffle" class="grow">Raffle</div> 
        <!-- TODO: Add hover effects -->
        <div id="account" class="relative inline-block text-left grow">
            <button type="button" class="inline-flex w-full justify-center align-middle font-material-symbols-outlined text-4xl font-thin" id="account-menu-button" aria-expanded="true" aria-haspopup="true" on:click="{() => toggleMenu('account')}">
            <!-- TODO: Change fill on darkmode.-->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                <title>Account</title>
                <desc>Account: access notifications, profile, NFT Studio for creators and site settings.</desc>
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            </button>
            {#if showAccountMenu}
                <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" 
                        role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1" on:mouseleave="{() => toggleMenu('account')}" transition:slide>
                    <div class="py-1" role="none">
                    <a href="/" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Dark Mode</a>
                    <a href="/" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Notifications</a>
                    <a href="/profile" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Profile</a>
                    <a href="/" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Studio</a>
                    <a href="/" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="settings">Settings</a>
                    </div>
                </div>
            {/if}
        </div>
        <!-- make account & wallet a button-->
        <div id="wallet" class="relative inline-block text-left grow">
            <button type="button" class="inline-flex w-full justify-center align-middle font-material-symbols-outlined text-4xl font-thin" id="wallet-menu-button" aria-expanded="true" aria-haspopup="true">
            <!-- TODO: Add dropdown for wallet integration, i.e. remove wallet, add mutiwallet support -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
                <title>Wallet</title>
                <desc>Wallet: Pair with your cryto wallets via Hashpack and Blade, multi wallet pairing coming soon...</desc>
                <path d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z" />
            </svg>
            </button>
        </div> <!-- If adjust this param, change menu right param -->
        </div>
    </div>
    <!-- TODO: Add image for product name. -->
    <div class="md:hidden flex items-center">
        <button type="button" class="absolute top-0 right-0" on:click={() => toggleMenu('mobile')}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <title>Mobile Device Menu</title>
            <desc>View application options, like account, wallet, Search NFTs, etc...</desc>
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        </button>
        {#if showMobileMenu}
        <ul class="flex flex-col items-center justify-between min-h-60">
            <li>{$nftMarketPlace}</li>
            <li>Search</li><!-- mobile friendly search page -->
            <li>Launch Pad</li>
            <li>Explore</li>
            <li>Activity</li>
            <li>DAO</li>
            <li>Raffle</li>
            <li>Account</li> <!-- TODO: Menu within a menu -->
            <li>Wallet</li>
        </ul>
        {/if}
    </div>
    <div class="flex-grow">
        <slot />
    </div>
    <div class="text-stone-700 md:w-1/4 mx-auto">
        <div class="w-full">
            <img src="{nftMarketPlaceLogo}" alt="{$nftMarketPlace}" class="h-9 mx-auto" />
            <div class="w-5/6 mx-auto pt-4 text-center font-light text-sm">
                {$nftMarketPlace} MARKET IS THE LEADING NFT MARKETPLACE BUILT ON HEDERA.
                OUR MISSION IS TO MAKE NFTS SIMPLE. EXPLORE THE MARKET TO GET STARTED!
            </div>
            <div class="flex flex-row w-5/6 mx-auto pt-4 md:pt-8">
                <div class="w-1/3 float-left font-bold">
                    Resources
                </div>
                <button class="w-2/3 float-right text-right" on:click="{() => toggleMenu('resources')}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6 float-right transition duration-500 {showResourcesMenu === true ? 'rotate-180':''}">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
            </div>
            {#if showResourcesMenu}
                <ul class="w-5/6 mx-auto px-1" transition:slide={{ delay: 250, duration: 250, easing: linear }}>
                    <li><a href="/" class="block px-2 py-2 hover:font-bold hover:bg-mint-edge hover:text-white">About</a></li>
                    <li><a href="/" class="block px-2 py-2 hover:font-bold hover:bg-mint-edge hover:text-white">FAQ</a></li>
                    <li><a href="/" class="block px-2 py-2 hover:font-bold hover:bg-mint-edge hover:text-white">Blog</a></li>
                    <li><a href="/" class="block px-2 py-2 hover:font-bold hover:bg-mint-edge hover:text-white">Privacy Policy</a></li>
                    <li><a href="/" class="block px-2 py-2 hover:font-bold hover:bg-mint-edge hover:text-white">Terms and Conditions</a></li>
                </ul>
            {/if}
        </div>
        <div class="flex flex-row w-2/3 mx-auto pt-4 md:pt-8">
            <div class="w-1/4">
                <svg width="26" height="26" viewBox="0 0 26 26" class="mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.00521739 26L1.76282 19.5416C0.604696 17.5563 -0.00375782 15.2984 1.74619e-05 13C1.74619e-05 5.8201 5.82011 0 13 0C20.1799 0 26 5.8201 26 13C26 20.1799 20.1799 26 13 26C10.7026 26.0037 8.44566 25.3957 6.46101 24.2385L0.00521739 26ZM8.30831 6.9004C8.14043 6.91082 7.97639 6.95504 7.82601 7.0304C7.68499 7.11025 7.55626 7.21009 7.44381 7.3268C7.28781 7.4737 7.19941 7.60109 7.10451 7.72459C6.62405 8.34989 6.36561 9.11744 6.37001 9.90599C6.37261 10.543 6.53901 11.1631 6.79901 11.7429C7.33071 12.9155 8.20561 14.157 9.36131 15.3075C9.63951 15.5844 9.91121 15.8626 10.2037 16.1213C11.6381 17.3842 13.3474 18.2949 15.1957 18.7811L15.9354 18.8942C16.1759 18.9072 16.4164 18.889 16.6582 18.8773C17.0368 18.8577 17.4065 18.7552 17.7411 18.577C17.9113 18.4893 18.0775 18.3939 18.239 18.291C18.239 18.291 18.2949 18.2546 18.4015 18.174C18.577 18.044 18.6849 17.9517 18.8305 17.7996C18.9384 17.6878 19.032 17.5565 19.1035 17.407C19.2049 17.1951 19.3063 16.7908 19.3479 16.4541C19.3791 16.1967 19.37 16.0563 19.3661 15.9692C19.3609 15.8301 19.2452 15.6858 19.1191 15.6247L18.3625 15.2854C18.3625 15.2854 17.2315 14.7927 16.5412 14.4781C16.4684 14.4464 16.3904 14.4283 16.3111 14.4248C16.2222 14.4157 16.1323 14.4257 16.0475 14.4541C15.9628 14.4826 15.8851 14.5289 15.8197 14.5899V14.5873C15.8132 14.5873 15.7261 14.6614 14.7862 15.8002C14.7323 15.8727 14.658 15.9275 14.5728 15.9576C14.4876 15.9877 14.3953 15.9917 14.3078 15.9692C14.2231 15.9465 14.1401 15.9179 14.0595 15.8834C13.8983 15.8158 13.8424 15.7898 13.7319 15.7417L13.7254 15.7391C12.9817 15.4144 12.2931 14.9758 11.6844 14.4391C11.5206 14.2961 11.3685 14.1401 11.2125 13.9893C10.7011 13.4995 10.2553 12.9454 9.88651 12.3409L9.80981 12.2174C9.75472 12.1344 9.71018 12.0449 9.67721 11.9509C9.62781 11.7598 9.75651 11.6064 9.75651 11.6064C9.75651 11.6064 10.0724 11.2606 10.2193 11.0734C10.3416 10.9178 10.4557 10.756 10.5612 10.5885C10.7146 10.3415 10.7627 10.088 10.6821 9.89169C10.3181 9.00249 9.94111 8.11719 9.55371 7.23839C9.47701 7.0642 9.24951 6.93939 9.04281 6.91469C8.97261 6.9069 8.90241 6.8991 8.83221 6.8939C8.65763 6.88522 8.48269 6.88696 8.30831 6.8991V6.9004Z" fill="#434343"/>
                </svg>
            </div>
            <div class="w-1/4">
                <svg width="26" height="26" viewBox="0 0 20 20" class="mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.99731 6.66525C8.16111 6.66525 6.66262 8.16376 6.66262 10C6.66262 11.8362 8.16111 13.3348 9.99731 13.3348C11.8335 13.3348 13.332 11.8362 13.332 10C13.332 8.16376 11.8335 6.66525 9.99731 6.66525ZM19.9989 10C19.9989 8.61907 20.0114 7.25064 19.9338 5.87221C19.8563 4.27113 19.4911 2.85017 18.3203 1.67938C17.147 0.506085 15.7286 0.14334 14.1275 0.065788C12.7466 -0.0117644 11.3782 0.000744113 9.99981 0.000744113C8.61891 0.000744113 7.25051 -0.0117644 5.8721 0.065788C4.27105 0.14334 2.85012 0.508587 1.67935 1.67938C0.506076 2.85267 0.143338 4.27113 0.0657868 5.87221C-0.0117642 7.25314 0.000744099 8.62157 0.000744099 10C0.000744099 11.3784 -0.0117642 12.7494 0.0657868 14.1278C0.143338 15.7289 0.508578 17.1498 1.67935 18.3206C2.85262 19.4939 4.27105 19.8567 5.8721 19.9342C7.25301 20.0118 8.62141 19.9993 9.99981 19.9993C11.3807 19.9993 12.7491 20.0118 14.1275 19.9342C15.7286 19.8567 17.1495 19.4914 18.3203 18.3206C19.4936 17.1473 19.8563 15.7289 19.9338 14.1278C20.0139 12.7494 19.9989 11.3809 19.9989 10ZM9.99731 15.131C7.15795 15.131 4.86644 12.8394 4.86644 10C4.86644 7.16058 7.15795 4.86903 9.99731 4.86903C12.8367 4.86903 15.1282 7.16058 15.1282 10C15.1282 12.8394 12.8367 15.131 9.99731 15.131ZM15.3383 5.8572C14.6754 5.8572 14.14 5.32184 14.14 4.65889C14.14 3.99594 14.6754 3.46058 15.3383 3.46058C16.0013 3.46058 16.5366 3.99594 16.5366 4.65889C16.5368 4.81631 16.5059 4.97222 16.4458 5.1177C16.3856 5.26317 16.2974 5.39535 16.1861 5.50666C16.0748 5.61798 15.9426 5.70624 15.7971 5.76639C15.6516 5.82654 15.4957 5.8574 15.3383 5.8572Z" fill="#434343"/>
                </svg>
            </div>
            <div class="w-1/4">
                <svg width="26" height="26" viewBox="0 0 11 21" class="mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.2792 11.8118L10.8498 8.0115H7.28305V5.54531C7.28305 4.50581 7.78113 3.49191 9.37869 3.49191H11V0.256594C11 0.256594 9.52888 0 8.12195 0C5.18485 0 3.26508 1.82044 3.26508 5.11547V8.01216H0V11.8125H3.26508V21H7.28305V11.8125L10.2792 11.8118Z" fill="#434343"/>
                </svg>
            </div>
            <div class="w-1/4">
                <svg width="26" height="26" viewBox="0 0 24 17" class="mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.4991 2.65557C23.3625 2.14135 23.0946 1.6724 22.7223 1.29567C22.35 0.91894 21.8863 0.647638 21.3777 0.508917C19.5054 1.03264e-07 12 0 12 0C12 0 4.49464 -1.03264e-07 2.62232 0.50621C2.11345 0.644481 1.64953 0.915632 1.27716 1.29243C0.904787 1.66923 0.637069 2.13842 0.500893 2.65287C-1.02179e-07 4.54777 0 8.5 0 8.5C0 8.5 -1.02179e-07 12.4522 0.500893 14.3444C0.776786 15.3893 1.59107 16.2123 2.62232 16.4911C4.49464 17 12 17 12 17C12 17 19.5054 17 21.3777 16.4911C22.4116 16.2123 23.2232 15.3893 23.4991 14.3444C24 12.4522 24 8.5 24 8.5C24 8.5 24 4.54777 23.4991 2.65557ZM9.61607 12.1274V4.87261L15.8304 8.47293L9.61607 12.1274Z" fill="#434343"/>
                </svg>
            </div>
        </div>
        <div class="py-4 pb-8 font-light font-sm text-center">
            Copyright 2022 {$nftMarketPlace}
        </div>
    </div>
    <!--<div class="h-10"></div>-->
</div> 
