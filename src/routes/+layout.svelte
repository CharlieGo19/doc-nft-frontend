<script lang="ts">
    import "src/app.postcss";
    import { nftMarketPlace, nftMarketPlaceLogo, SearchDummyData } from "src/stores";
    import { slide } from "svelte/transition";
    import { linear } from "svelte/easing";
    import WalletOverlay from "$lib/components/overlays/wallets/walletOverlay.svelte";
    import { onMount } from "svelte";
    import { setAccountInfo } from "$lib/wallet-pairing/common";
    import { accountId, isWalletPaired } from "src/stores/wallet";
    import { pairWalletOverlay } from "src/stores/overlays";
    import Toasts from "$lib/components/toast/toasts.svelte";

    onMount(async() => {
        await setAccountInfo();
    });

    let showAccountMenu: boolean = false;
    let showMobileMenu: boolean = false;
    let showMobileSearch: boolean = false;
    let showDesktopSearch: boolean = false;
    let showResourcesMenu: boolean = false;
    let showUserResults: boolean = false;
    let showCollectionResults: boolean = false;
    let showNftResults: boolean = false;

    let searchValue: string = "";
    const searchResults: SearchBox = {
        users: [],
        tokens: [],
        collections: []
    };

    function closeMenu(event: KeyboardEvent): void {
        if (event.key === "Escape") {
            showAccountMenu = false;
        }
    }

    $: {
        if (searchValue.length > 0) {
            searchResults.users = SearchDummyData.filter(x => x.type === "user" && x.value.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
            searchResults.collections = SearchDummyData.filter(x => x.type === "collection" && x.value.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
            searchResults.tokens = SearchDummyData.filter(x => x.type === "token_id" && x.value.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
        } else {
            searchResults.users = [];
            searchResults.collections = [];
            searchResults.tokens = [];
        }

        showUserResults = (searchResults.users.length > 0) ? true : false;
        showCollectionResults = (searchResults.collections.length > 0) ? true : false;
        showNftResults = (searchResults.tokens.length > 0) ? true : false;
    };

    const toggleMenu = (menu: string): any => {
        if (menu === "account") {
            showAccountMenu = !showAccountMenu;
        } else if (menu === "mobile") {
            if (showMobileSearch) {
                showMobileSearch = false;
                setTimeout(() => {
                    showMobileMenu = !showMobileMenu;
                },300);
            } else {
                showMobileMenu = !showMobileMenu;
            }
        } else if (menu === "mobileSearch") {
            // TODO: Is there a better way of cleaning this up - does it even need cleaning up?
            searchValue = "";
            searchResults.users = [];
            searchResults.tokens = [];
            searchResults.collections = [];

            if (showMobileMenu) {
                showMobileMenu = false;
                setTimeout(() => {
                    showMobileSearch = !showMobileSearch;
                },300);
            } else {
                showMobileSearch = !showMobileSearch;
            }
        } else if (menu === "desktopSearch") {
            searchValue = "";
            searchResults.users = [];
            searchResults.tokens = [];
            searchResults.collections = [];

            showDesktopSearch = !showDesktopSearch;
        } else if (menu === "resources") {
            showResourcesMenu = !showResourcesMenu;
        }
    }

    type SearchBox = {
        users: Array<any>,
        tokens: Array<any>,
        collections: Array<any>
    };

    let iwp: boolean;
    let accId: string | null;

    isWalletPaired.subscribe(val => {
        iwp = val;
    });

    accountId.subscribe(val => {
        accId = val;
    });

</script>

<svelte:window on:keydown={closeMenu} />
<!-- TODO: Change h-screen to h-full when content added -->
<div class="relative h-screen w-full flex flex-col overflow-x-hidden space-y-14 md:overflow-y-auto bg-gradient-to-b from-light-mint to-white z-0">
    <div>
        <Toasts />
        <div class="w-full flex flex-col fixed bg-black/60 backdrop-blur-lg z-40 md:hidden">
            <div class="flex flex-row h-14">
                <div class="relative w-2/3 px-4 my-auto">
                    <svg width="121" height="36" viewBox="0 0 121 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_101_4251)">
                            <path d="M2.23366 10.1263C-0.972025 14.9521 -1.17744 23.9471 4.61188 30.1386C10.2334 36.1536 19.0201 36.8364 23.9964 34.1168C22.2952 31.2583 22.489 28.8106 24.549 27.0718C26.609 25.333 28.967 25.5876 31.7039 27.7922C36.281 21.6441 35.3378 12.0618 29.6092 6.23488C23.6695 0.190952 14.7208 0.156234 10.4562 2.73409C11.4109 5.10652 11.2373 7.31405 9.25838 9.13966C7.15501 11.081 4.76522 11.2344 2.23366 10.1263Z" fill="white"/>
                            <path d="M9.87753 4.76802C9.88303 4.14568 9.76591 3.52834 9.53284 2.95126C9.29977 2.37418 8.95531 1.84866 8.51914 1.4047C7.63826 0.508079 6.43728 -0.0018869 5.18039 -0.0130132C4.55805 -0.0185223 3.94071 0.0986025 3.36363 0.331674C2.78655 0.564746 2.26103 0.909199 1.81707 1.34537C0.920448 2.22625 0.410482 3.42724 0.399356 4.68412C0.38823 5.941 0.876854 7.15083 1.75774 8.04745C2.63862 8.94406 3.83961 9.45403 5.09649 9.46516C6.35337 9.47628 7.5632 8.98766 8.45982 8.10677C9.35643 7.22589 9.8664 6.02491 9.87753 4.76802V4.76802Z" fill="white"/>
                            <path d="M31.8745 28.475L24.6848 34.4582C26.2616 35.9858 28.8308 36.0957 30.7345 34.5681C32.7135 32.9827 33.1127 30.3788 31.8745 28.475Z" fill="white"/>
                            <path d="M2.23366 10.1262C4.76522 11.2344 7.15212 11.081 9.25838 9.13966C11.2373 7.31405 11.4109 5.10652 10.4562 2.73409C14.7208 0.156234 23.6695 0.190952 29.6179 6.23488C35.3465 12.0618 36.2897 21.6441 31.7126 27.7922C28.9756 25.5876 26.6032 25.3474 24.5577 27.0718C22.5122 28.7962 22.3039 31.2467 24.0138 34.1168C19.0288 36.8364 10.2421 36.142 4.62924 30.1386C-1.17744 23.9471 -0.97202 14.9521 2.23366 10.1262Z" fill="#33B3A6"/>
                            <path d="M108.496 22.3617L108.206 22.2778C108.588 16.4682 108.97 10.6586 109.364 4.77381C107.659 4.77381 106.181 4.81142 104.685 4.75934C103.858 4.72752 103.528 4.99659 103.337 5.83851C102.22 10.8872 101.022 15.9185 99.8651 20.9556C99.0955 24.2799 98.3317 27.61 97.5505 31.0095H101.182C102.492 25.3677 103.785 19.778 105.087 14.1883L105.336 14.2346C104.977 19.7925 104.619 25.3504 104.251 31.076C105.17 31.0346 106.09 31.0414 107.008 31.0963C107.957 31.1975 108.319 30.7896 108.632 29.939C110.469 25.0205 112.37 20.1021 114.256 15.1836C114.363 14.8943 114.516 14.6484 114.647 14.3793L114.843 14.4545C113.582 19.9516 112.32 25.4487 111.047 30.9777H114.976L121.026 4.76224C119.183 4.76224 117.476 4.71884 115.772 4.79985C115.483 4.81431 115.075 5.2888 114.93 5.63599C114.291 7.17228 113.729 8.74041 113.133 10.2941C111.585 14.3233 110.039 18.3459 108.496 22.3617Z" fill="#2F8C82"/>
                            <path d="M52.7925 31.0818C53.7906 31.0818 54.6007 31.0268 55.3964 31.0818C56.2904 31.157 56.6289 30.833 56.814 29.9245C57.4621 26.7998 58.223 23.6983 58.9463 20.591C59.5134 18.1491 60.0843 15.7092 60.6591 13.2712L60.9485 13.3117C61.1857 19.1791 61.4229 25.0466 61.666 30.9805H65.9595C67.9674 22.2749 69.9695 13.6212 72.0121 4.75065C71.066 4.75065 70.2617 4.79694 69.4661 4.73619C68.5981 4.66964 68.2017 4.94739 68.0195 5.86454C67.5826 8.11257 67.0097 10.3346 66.489 12.5681C65.945 14.9 65.3992 17.231 64.8514 19.561L64.6547 19.5147C64.4521 14.6281 64.2496 9.74145 64.0442 4.75933C62.5513 4.75933 61.2059 4.79116 59.8606 4.74487C59.0968 4.71883 58.7612 4.95607 58.5905 5.74881C57.8787 9.04418 57.0831 12.3222 56.3251 15.606C55.1765 20.7067 54.0105 25.7843 52.7925 31.0818Z" fill="#2F8C82"/>
                            <path d="M51.7654 4.60889C47.1102 3.74092 43.6065 5.87033 42.4029 10.4358C41.4858 13.9077 40.7364 17.4316 39.9466 20.9382C39.5213 22.8217 39.0207 24.6994 38.8298 26.6205C38.5405 29.5744 40.0739 31.1888 43.0597 31.3335C43.7793 31.401 44.5045 31.3767 45.218 31.2612C46.1438 31.0615 46.8151 30.9892 47.5326 31.8948C47.9463 32.4127 48.9792 32.5342 49.743 32.6383C50.0468 32.6788 50.611 32.2507 50.7238 31.9208C50.9941 31.0128 51.2086 30.0891 51.3661 29.1549L50.2725 28.7441C50.88 26.8085 51.5021 25.0813 51.9534 23.3135C52.7028 20.3972 53.3508 17.4548 54.0221 14.5181C54.3895 12.8979 54.8003 11.2777 55.0492 9.63729C55.4629 6.90031 54.2101 5.06023 51.7654 4.60889ZM49.6909 15.2733C48.9676 18.4211 48.2704 21.5776 47.4892 24.7109C47.3081 25.4947 46.9597 26.2299 46.4679 26.8664C45.7764 27.7112 44.6365 27.9369 43.7945 27.3322C43.3172 26.9879 43.0481 25.9058 43.1725 25.252C43.7743 22.1244 44.5381 19.0287 45.2498 15.9242C45.6607 14.1305 46.0455 12.3309 46.5113 10.5515C46.9163 8.99789 47.8074 8.27459 49.1152 8.2688C50.3159 8.2688 50.8251 8.79247 50.7932 10.3201C50.4779 11.7754 50.0902 13.5258 49.6909 15.2733Z" fill="#2F8C82"/>
                            <path d="M88.5121 4.84325C87.404 9.6402 86.2901 14.359 85.2312 19.0952C84.6525 21.7223 83.9524 24.3493 83.663 27.0168C83.3737 29.6207 84.9447 31.1368 87.5631 31.3567C92.0852 31.7241 94.9061 29.8088 96.0952 25.4371C96.7577 23.0126 97.2756 20.5476 97.8311 18.0942C98.8437 13.7225 99.8419 9.34798 100.872 4.86929H96.9545C96.1068 8.53499 95.2735 12.1631 94.4316 15.7883C93.6794 19.0258 92.9676 22.2778 92.1402 25.4979C91.7235 27.1239 90.4042 27.8935 88.9894 27.5521C87.9218 27.2946 87.6875 26.5018 88.1215 24.5981C89.5392 18.4259 90.9568 12.2537 92.3745 6.08154C92.4584 5.70832 92.496 5.32641 92.5712 4.8635L88.5121 4.84325Z" fill="#2F8C82"/>
                            <path d="M86.8456 4.78249C82.6967 4.78249 78.6896 4.78249 74.6941 4.80852C74.5322 4.8317 74.3784 4.89383 74.2459 4.98958C74.1133 5.08533 74.006 5.21185 73.9332 5.35824C73.6438 6.33325 73.4731 7.34298 73.2128 8.54077H77.5063C75.7443 16.1528 74.046 23.5421 72.3303 31.0095H76.4647C76.5978 30.4656 76.7164 29.9882 76.8293 29.5079C78.3569 22.8969 79.9077 16.2917 81.3919 9.67491C81.5915 8.7838 81.9445 8.47133 82.8385 8.51763C83.8656 8.57838 84.9013 8.53209 85.9921 8.53209L86.8456 4.78249Z" fill="#2F8C82"/>
                            <path d="M108.495 22.3617C110.039 18.3478 111.582 14.3339 113.125 10.3201C113.721 8.76644 114.282 7.19832 114.921 5.66202C115.066 5.31483 115.462 4.84035 115.763 4.82588C117.467 4.74487 119.174 4.78827 121.017 4.78827L114.968 31.0037H111.021C112.294 25.4603 113.556 19.9632 114.817 14.4805L114.62 14.4053C114.49 14.6744 114.331 14.9319 114.23 15.2096C112.343 20.1281 110.443 25.0263 108.605 29.965C108.293 30.8041 107.931 31.212 106.982 31.1223C106.064 31.0674 105.144 31.0607 104.225 31.1021C104.593 25.3764 104.951 19.8185 105.31 14.2607L105.061 14.2144C103.762 19.8041 102.457 25.3937 101.155 31.0355H97.5244C98.3114 27.6302 99.0752 24.3059 99.839 20.9816C100.996 15.9445 102.194 10.9132 103.311 5.86454C103.496 5.02262 103.832 4.75355 104.659 4.78537C106.143 4.83745 107.633 4.79984 109.337 4.79984C108.95 10.6846 108.568 16.4942 108.18 22.3038L108.495 22.3617Z" fill="white"/>
                            <path d="M52.7925 31.0818C54.0105 25.7843 55.1765 20.7067 56.3511 15.6263C57.1092 12.3425 57.9048 9.06445 58.6165 5.76908C58.7872 4.97633 59.1228 4.73909 59.8866 4.76513C61.232 4.81142 62.5773 4.7796 64.0702 4.7796C64.2756 9.77039 64.4782 14.657 64.6807 19.535L64.8774 19.5813C65.4233 17.2493 65.9691 14.9184 66.515 12.5884C67.0358 10.3548 67.6086 8.13283 68.0455 5.8848C68.222 4.96765 68.6241 4.68991 69.4921 4.75645C70.2877 4.81721 71.0921 4.77092 72.0381 4.77092C69.9955 13.6299 67.9876 22.2951 65.9855 31.0008H61.6862C61.4432 25.0668 61.2059 19.1994 60.9687 13.3319L60.6794 13.2914C60.1007 15.7294 59.5298 18.1694 58.9666 20.6113C58.2433 23.7186 57.4824 26.8201 56.8343 29.9448C56.6491 30.8388 56.3106 31.1628 55.4166 31.1021C54.6007 31.0268 53.7906 31.0818 52.7925 31.0818Z" fill="white"/>
                            <path d="M51.7654 4.60889C47.1102 3.74092 43.6065 5.87033 42.4029 10.4358C41.4858 13.9077 40.7364 17.4316 39.9466 20.9382C39.5213 22.8217 39.0207 24.6994 38.8298 26.6205C38.5405 29.5744 40.0739 31.1888 43.0597 31.3335C43.7793 31.401 44.5045 31.3767 45.218 31.2612C46.1438 31.0615 46.8151 30.9892 47.5326 31.8948C47.9463 32.4127 48.9792 32.5342 49.743 32.6383C50.0468 32.6788 50.611 32.2507 50.7238 31.9208C50.9941 31.0128 51.2086 30.0891 51.3661 29.1549L50.2725 28.7441C50.88 26.8085 51.5021 25.0813 51.9534 23.3135C52.7028 20.3972 53.3508 17.4548 54.0221 14.5181C54.3895 12.8979 54.8003 11.2777 55.0492 9.63729C55.4629 6.90031 54.2101 5.06023 51.7654 4.60889ZM49.6909 15.2733C48.9676 18.4211 48.2704 21.5776 47.4892 24.7109C47.3081 25.4947 46.9597 26.2299 46.4679 26.8664C45.7764 27.7112 44.6365 27.9369 43.7945 27.3322C43.3172 26.9879 43.0481 25.9058 43.1725 25.252C43.7743 22.1244 44.5381 19.0287 45.2498 15.9242C45.6607 14.1305 46.0455 12.3309 46.5113 10.5515C46.9163 8.99789 47.8074 8.27459 49.1152 8.2688C50.3159 8.2688 50.8251 8.79247 50.7932 10.3201C50.4779 11.7754 50.0902 13.5258 49.6909 15.2733Z" fill="white"/>
                            <path d="M88.5121 4.84325H92.5626C92.4874 5.30616 92.4498 5.68807 92.3659 6.06129C90.9675 12.2431 89.5537 18.4201 88.1244 24.5923C87.6876 26.4961 87.9219 27.2888 88.9924 27.5463C90.3956 27.8877 91.7265 27.1181 92.1431 25.4921C92.9706 22.272 93.6823 19.02 94.4345 15.7825C95.2765 12.1573 96.1097 8.5292 96.9574 4.8635H100.886C99.8564 9.34219 98.8612 13.7167 97.8456 18.0884C97.267 20.5418 96.7607 23.0068 96.1097 25.4314C94.8975 29.8001 92.0853 31.7154 87.5632 31.348C84.9593 31.1339 83.3796 29.6121 83.6631 27.0082C83.9524 24.3406 84.6439 21.7136 85.2312 19.0865C86.2901 14.359 87.404 9.6402 88.5121 4.84325Z" fill="white"/>
                            <path d="M86.8456 4.78249L85.9776 8.54367C84.8869 8.54367 83.8511 8.58996 82.824 8.5292C81.956 8.47423 81.5886 8.7867 81.3774 9.68649C79.8932 16.3033 78.3424 22.9085 76.8148 29.5195C76.702 29.9997 76.5833 30.4771 76.4503 31.0211H72.3303C74.0489 23.5537 75.7472 16.1644 77.4976 8.56392H73.1983C73.4587 7.35456 73.6352 6.34483 73.9187 5.38139C73.9915 5.235 74.0988 5.10848 74.2314 5.01273C74.3639 4.91698 74.5177 4.85485 74.6796 4.83168C78.6954 4.77381 82.6967 4.78249 86.8456 4.78249Z" fill="white"/>
                            <path d="M9.87753 4.76802C9.8664 6.02491 9.35643 7.22589 8.45982 8.10677C7.5632 8.98766 6.35337 9.47628 5.09649 9.46516C3.83961 9.45403 2.63862 8.94406 1.75774 8.04745C0.876854 7.15083 0.38823 5.941 0.399356 4.68412C0.410482 3.42724 0.920448 2.22625 1.81707 1.34537C2.26103 0.909199 2.78655 0.564746 3.36363 0.331674C3.94071 0.0986025 4.55805 -0.0185223 5.18039 -0.0130132C5.80274 -0.00750399 6.4179 0.120531 6.99077 0.363782C7.56363 0.607033 8.08297 0.960737 8.51914 1.4047C8.95531 1.84866 9.29977 2.37418 9.53284 2.95126C9.76591 3.52834 9.88303 4.14568 9.87753 4.76802V4.76802Z" fill="#2F8C82"/>
                            <path d="M31.8745 28.475C33.1127 30.3643 32.7135 32.9827 30.7345 34.5681C28.8308 36.0957 26.2616 35.9858 24.6848 34.4582L31.8745 28.475Z" fill="#2F8C82"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_101_4251">
                            <rect width="121" height="35.6589" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                        
                </div>
                <div class="relative flex w-1/6 h-full items-center">
                    <button type="button" class="w-full h-full" on:click={() => toggleMenu('mobileSearch')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="relative w-8 h-8 mr-2 ml-auto">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </div>
                <div class="relative w-1/6 ml-auto mr-0">
                    <button type="button" class="w-full h-full float-right" on:click={() => toggleMenu('mobile')}>
                        <div class="relative flex items-center justify-center">
                            <span class="absolute h-1 w-1/3 right-4 bg-light-mint rounded-md -translate-y-2 {showMobileMenu === true ? 'opacity-0':''} transition duration-300"></span>
                            <span class="absolute h-1 w-1/3 right-4 bg-light-mint rounded-md {showMobileMenu === true ? '-rotate-45': ''} transform duration-300"></span>
                            <span class="absolute h-1 w-1/3 right-4 bg-light-mint rounded-md {showMobileMenu === true ? 'rotate-45': ''} transform duration-300"></span>
                            <span class="absolute h-1 w-1/3 right-4 bg-light-mint rounded-md translate-y-2 {showMobileMenu === true ? 'opacity-0':''} transition duration-300}"></span>
                        </div>
                    </button>
                </div>
            </div>
            <div class="flex flex-row">
                {#if showMobileMenu}
                    <!-- TODO: Add Darkmode slider, HP & Blade Icons -->
                    <!--  If hP|B connected -> show AccId ~ icons -->
                    <div class="grid grid-cols-2 w-full text-white p-2" transition:slide={{ duration: 300, easing: linear }}>
                        <span class="p-2 hover:rounded-md hover:font-bold hover:bg-light-mint hover:text-black">LightModeSwitch</span>
                        <span class="p-2 hover:rounded-md hover:font-bold hover:bg-light-mint hover:text-black">Launch Pad</span>
                        <span class="p-2 hover:rounded-md hover:font-bold hover:bg-light-mint hover:text-black">Explore</span>
                        <span class="p-2 hover:rounded-md hover:font-bold hover:bg-light-mint hover:text-black">Activity</span>
                        <span class="p-2 hover:rounded-md hover:font-bold hover:bg-light-mint hover:text-black">DAO</span>
                        <span class="p-2 hover:rounded-md hover:font-bold hover:bg-light-mint hover:text-black">Raffle</span>
                        <span class="p-2 hover:rounded-md hover:font-bold hover:bg-light-mint hover:text-black">Account</span>
                        <button class="p-2 hover:rounded-md hover:font-bold hover:bg-light-mint hover:text-black text-left {iwp === true ? 'font-bold':''}" on:click={() => { pairWalletOverlay.set(true); toggleMenu('mobile')}}>
                            {#if iwp} 
                                {accId}
                            {:else}
                                Pair Wallet
                            {/if}
                        </button>
                    </div>
                {/if} 
                {#if showMobileSearch}
                    <div class="flex flex-col w-full pt-0 pb-2 px-4 z-40" transition:slide={{ duration: 300, easing: linear }}> 
                        <input type="search" class="w-full mx-auto px-2 py-1 font-Poppins text-sm" placeholder="Search items, collections, creators and collectors" bind:value={searchValue}>
                        {#if showUserResults}
                            <div class="w-full flex flex-col py-2 text-white">
                                <span class="p-1"></span>
                                <span class="w-full mx-auto px-2 rounded-md text-center text-black font-semibold bg-light-mint">Creators and Users</span>
                                <span class="p-1"></span>
                                {#each searchResults.users as user}
                                    <!-- TODO: Convert these to links. -->
                                    <span class="px-2 hover:rounded-md hover:font-bold hover:bg-light-mint hover:text-black">{user.value}</span>
                                {/each}
                            </div>
                        {/if}
                        {#if showCollectionResults}
                            <div class="w-full flex flex-col py-2 text-white">
                                <span class="w-full mx-auto px-2 rounded-md text-center text-black font-semibold bg-light-mint">Collections</span>
                                <span class="p-1"></span>
                                {#each searchResults.collections as collection}
                                    <!-- TODO: Convert these to links. -->
                                    <a href="/collection/{collection.value}" class="px-2 hover:rounded-md hover:font-bold hover:bg-light-mint hover:text-black" on:click={() => { toggleMenu('mobileSearch')}}>{collection.value}</a>
                                {/each}
                            </div>
                        {/if}
                        {#if showNftResults}
                            <div class="w-full flex flex-col py-2 text-white">
                                <span class="w-full mx-auto px-2 rounded-md text-center text-black font-semibold bg-light-mint">Tokens</span>
                                <span class="p-1"></span>
                                {#each searchResults.tokens as token}
                                    <!-- TODO: Convert these to links. -->
                                    <span class="px-2 hover:rounded-md hover:font-bold hover:bg-light-mint hover:text-black">{token.value}</span>
                                {/each}
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
        </div>
        <div class="hidden md:flex w-full items-center md:px-6 md:py-2">
            <div class="flex flex-row w-full h-11 justify-between text-sm px-6 place-items-center text-center max-w-7xl m-auto">
            <div id="{$nftMarketPlace}" class="grow z-0">
                <a href="/">{$nftMarketPlace}</a>
            </div>
            <div id="search" class="grow-2">
                <!-- TODO: Provide drop down with options of filtered NFTs / Projects-->
                <input class="border-none w-full bg-white h-10 px-2 rounded-lg text-sm focus:outline-none"
                    type="search" placeholder="Search items, collections & accounts" on:focus="{() => toggleMenu('desktopSearch')}" bind:value={searchValue} on:keydown={() => { showDesktopSearch = true;}}>
                    {#if showDesktopSearch}
                    <div class="absolute w-4/5 max-w-4xl inset-x-auto z-10 mt-2 rounded-md bg-black/60 text-white backdrop-blur-lg" tabindex="-1" on:mouseleave="{() => toggleMenu('desktopSearch')}" transition:slide>
                        {#if showUserResults}
                        <!-- TODO: Could extract these out in to components? -->
                        <!-- TODO: Add more button to list full results / paginated. -->
                            <div class="w-full flex flex-col p-2 text-white">
                                <span class="w-full mx-auto px-2 rounded-md text-black font-semibold bg-light-mint">Creators and Users</span> <!-- px-2 pb-2 text-left text-lg font-bold -->
                                <!-- <hr class="w-[98%] h-px mx-auto bg-white border-0" /> -->
                                <div class="grid grid-cols-5 md:grid-cols-3 py-2">
                                    {#each searchResults.users as user}
                                        <!-- TODO: Convert these to links. -->
                                        <span class="px-2 hover:rounded-md hover:font-bold hover:bg-light-mint hover:text-black">{user.value}</span>
                                    {/each}
                                </div>
                            </div>
                        {/if}
                        {#if showCollectionResults}
                            <div class="w-full flex flex-col px-2 text-white">
                                <span class="w-full mx-auto px-2 rounded-md text-black font-semibold bg-light-mint">Collections</span>
                                <div class="grid grid-cols-5 md:grid-cols-3 py-2">
                                    {#each searchResults.collections as collection}
                                    <!-- TODO: Convert these to links. -->
                                        <span class="px-2 hover:rounded-md hover:font-bold hover:bg-light-mint hover:text-black">{collection.value}</span>
                                    {/each}
                                </div>
                            </div>
                        {/if}
                        {#if showNftResults}
                            <div class="w-full flex flex-col p-2 text-white">
                                <span class="w-full mx-auto px-2 rounded-md text-black font-semibold bg-light-mint">NFTs</span>
                                <div class="grid grid-cols-5 md:grid-cols-3 py-2">
                                    {#each searchResults.tokens as nft}
                                    <!-- TODO: Convert these to links. -->
                                        <span class="px-2 hover:rounded-md hover:font-bold hover:bg-light-mint hover:text-black">{nft.value}</span>
                                    {/each}
                                </div>
                            </div>
                        {/if}
                    </div>
                {/if}
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
                <button type="button" class="inline-flex w-full justify-center align-middle font-material-symbols-outlined text-4xl font-thin" id="wallet-menu-button" aria-expanded="true" aria-haspopup="true" on:click={() => pairWalletOverlay.set(true)}>
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
    </div>
    {#if $pairWalletOverlay}
        <WalletOverlay />
    {/if}
    <div class="flex-grow">
        <!--<slot />-->
    </div>
    <div class="text-stone-700 md:w-1/4 mx-auto">
        <div class="w-full">
            <img src="{nftMarketPlaceLogo}" alt="{$nftMarketPlace}" class="h-9 mx-auto" />
            <div class="w-5/6 mx-auto pt-4 text-center font-light text-sm">
                {$nftMarketPlace} MARKET IS THE NEWEST NFT MARKETPLACE BUILT FOR HEDERA.
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
</div> 