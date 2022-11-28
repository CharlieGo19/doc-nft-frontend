<script lang="ts">
    import { nftMarketPlace, homepageLaunchPadFeed, homepagePopularCollections, homepageTopCollectionFeed, mostFireNfts, type MostFireCard, type NFTcard, type PopularCollection, type TopCollectionsCell } from "../stores";
    import Carousel from "$lib/carousel.svelte";
    import FireCarousel from "$lib/fireCarousel.svelte";
    import PopularCollectionsCarousel from "$lib/popularCollectionsCarousel.svelte";
    import TopCollectionsCarousel from "$lib/topCollectionsCarousel.svelte";
    import JustSoldCarousel from "$lib/justSoldCarousel.svelte";
    import Catagories from "$lib/catagories.svelte";

    let nfts: NFTcard[] = homepageLaunchPadFeed;
    let nftsFire: MostFireCard[] = mostFireNfts;
    let topNftCollections: TopCollectionsCell[] = homepageTopCollectionFeed;
    let popularCollections: PopularCollection[] = homepagePopularCollections;
    let nftsSold: MostFireCard[] = mostFireNfts; // TODO: make all cards a component & reuse some code. 152

</script>
<!-- TODO: Price Transparency, i.e. show a breakdown of fees, fallback/royalty/service charge (us) -->
<!-- TODO: Stop snap-x center if list exhausted. -->
<!-- TODO: Add on:hover show full image -->
<!-- TODO: Request -->
<div class="flex flex-col w-full items-center space-y-20">
    <div class="flex items-center justify-center md:max-w-7xl w-4/5 text-center">
        <h1 class="font-orbitron md:text-4xl text-lg">DISCOVER, COLLECT AND SELL <span class="text-teal-600">NFTS</span>.</h1>
    </div>
    <!-- use this for upcoming Launchpad events?-->
    <Carousel {nfts} />
    <div class="font-orbitron md:max-w-7xl w-full h-36 md:text-4xl text-lg bg-black/25 rounded-xl grid content-center text-center">
        <p>BANNER: QNTM OR ADVERTISE HERE.</p>
    </div>
    <div class="flex flex-col md:max-w-7xl w-full">
        <div class="flex flex-row text-stone-700">
            <div class="w-1/2 float-left font-orbitron font-bold text-3xl">
                Most 🔥
            </div>
            <div class="float-right w-1/2">
                <button type="button" class="flex flex-row align-middle h-8 w-32 mt-[2px] float-right border-2 border-mint-edge bg-white font-Poppins font-semibold text-sm 
                rounded-md hover:bg-mint-edge hover:text-white">
                    <p class="w-5/6 leading-7 align-middle">EXPLORE ALL</p>
                    <p class="text-xl"> > </p>
                </button>
            </div>
        </div>
        <FireCarousel {nftsFire} />
    </div>
    <div class="flex flex-col md:max-w-7xl w-full">
        <div class="flex flex-row text-stone-700">
            <div class="w-1/2 float-left font-orbitron font-bold text-3xl">
                TOP COLLECTIONS
            </div>
            <div class="float-right w-1/2">
                <button type="button" class="flex flex-row align-middle h-8 w-32 mt-[2px] float-right border-2 border-mint-edge bg-white font-Poppins font-semibold text-sm 
                rounded-md hover:bg-mint-edge hover:text-white">
                    <p class="w-5/6 leading-7 align-middle">EXPLORE ALL</p>
                    <p class="text-xl"> > </p>
                </button>
            </div>
        </div>
        <TopCollectionsCarousel {topNftCollections} />
    </div>
    <div class="flex flex-col md:max-w-7xl w-full">
        <div class="flex flex-row text-stone-700">
            <div class="w-1/2 float-left font-orbitron font-bold text-3xl">
                POPULAR COLLECTIONS
            </div>
            <div class="float-right w-1/2">
                <button type="button" class="flex flex-row align-middle h-8 w-32 mt-[2px] float-right border-2 border-mint-edge bg-white font-Poppins font-semibold text-sm 
                rounded-md hover:bg-mint-edge hover:text-white">
                    <p class="w-5/6 leading-7 align-middle">EXPLORE ALL</p>
                    <p class="text-xl"> > </p>
                </button>
            </div>
        </div>
        <PopularCollectionsCarousel {popularCollections} />
    </div>
    <div class="flex flex-col md:max-w-7xl w-full">
        <div class="flex flex-row text-stone-700">
            <div class="w-1/2 float-left font-orbitron font-bold text-3xl">
                JUST SOLD
            </div>
            <div class="float-right w-1/2">
                <button type="button" class="flex flex-row align-middle h-8 w-32 mt-[2px] float-right border-2 border-mint-edge bg-white font-Poppins font-semibold text-sm 
                rounded-md hover:bg-mint-edge hover:text-white">
                    <p class="w-5/6 leading-7 align-middle">EXPLORE ALL</p>
                    <p class="text-xl"> > </p>
                </button>
            </div>
        </div>
        <JustSoldCarousel {nftsSold} />
    </div>
    <div class="flex flex-col md:max-w-7xl w-full font-orbitron text-stone-700">
        <div class="float-left font-bold text-3xl">
            CREATE AND SELL YOUR ART
        </div>
        <div class="grid lg:grid-cols-4 md:grid-cols-2 place-items-center grid-cols-1 gap-4 lg:w-full w-2/3 m-auto pt-12">
            <div class="max-w-[305px] aspect-square border-2 border-mint-edge rounded-2xl bg-white shadow-xl">
                <div class="flex items-center justify-center h-2/5">
                    <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M84.0001 35.5964C84.0001 33.308 82.145 31.4529 79.8566 31.4529H56.1257C53.8373 31.4529 51.9822 33.308 51.9822 35.5964V48.0269C51.9822 50.3152 53.8373 52.1704 56.1257 52.1704H79.8566C82.145 52.1704 84.0001 50.3152 84.0001 48.0269V35.5964ZM63.8533 46.6961C61.1856 46.6961 59.0231 44.5335 59.0231 41.8659C59.0231 39.1982 61.1856 37.0357 63.8533 37.0357C66.521 37.0357 68.6835 39.1982 68.6835 41.8659C68.6835 44.5331 66.521 46.6961 63.8533 46.6961Z" fill="#33B3A6"/>
                        <path d="M46.5236 25.8026H77.2197V13.3721C77.2197 10.2566 74.8109 7.72192 71.6949 7.72192H5.77566C2.66013 7.72192 0 10.2566 0 13.3721V70.6278C0 73.7433 2.66013 76.278 5.77566 76.278H71.6949C74.8105 76.278 77.2197 73.7433 77.2197 70.6278V57.8206H46.5797L46.5236 25.8026Z" fill="#33B3A6"/>
                    </svg>
                </div>
                <div class="flex flex-col h-3/5 w-full">
                    <p class="w-full font-bold text-center text-lg">Set up Your Wallet</p>
                    <p class="w-full mt-1 p-3 font-Poppins text-center">
                        Login using your Hashpack or Blade Wallet to take advantage of all of <b>{$nftMarketPlace}'s </b> features.
                    </p>
                </div>
            </div>
            <div class="max-w-[305px] aspect-square border-2 border-mint-edge rounded-2xl bg-white shadow-xl">
                <div class="flex items-center justify-center h-2/5">
                    <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_101_4129)">
                        <path d="M32.3571 6H12.0714C9.27065 6 7 8.27065 7 11.0714V31.3571C7 34.1579 9.27065 36.4286 12.0714 36.4286H32.3571C35.1579 36.4286 37.4286 34.1579 37.4286 31.3571V11.0714C37.4286 8.27065 35.1579 6 32.3571 6Z" fill="#33B3A6"/>
                        <path d="M32.3571 46.5715H12.0714C9.27065 46.5715 7 48.8422 7 51.643V71.9287C7 74.7295 9.27065 77.0001 12.0714 77.0001H32.3571C35.1579 77.0001 37.4286 74.7295 37.4286 71.9287V51.643C37.4286 48.8422 35.1579 46.5715 32.3571 46.5715Z" fill="#33B3A6"/>
                        <path d="M72.9287 6H52.643C49.8422 6 47.5715 8.27065 47.5715 11.0714V31.3571C47.5715 34.1579 49.8422 36.4286 52.643 36.4286H72.9287C75.7295 36.4286 78.0001 34.1579 78.0001 31.3571V11.0714C78.0001 8.27065 75.7295 6 72.9287 6Z" fill="#33B3A6"/>
                        <path d="M72.9287 46.5715H52.643C49.8422 46.5715 47.5715 48.8422 47.5715 51.643V71.9287C47.5715 74.7295 49.8422 77.0001 52.643 77.0001H72.9287C75.7295 77.0001 78.0001 74.7295 78.0001 71.9287V51.643C78.0001 48.8422 75.7295 46.5715 72.9287 46.5715Z" fill="#33B3A6"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_101_4129">
                        <rect width="71" height="71" fill="white" transform="translate(7 6)"/>
                        </clipPath>
                        </defs>
                    </svg>
                </div>
                <div class="flex flex-col h-3/5 w-full">
                    <p class="w-full font-bold text-center text-lg">Create Your Collection</p>
                    <p class="w-full mt-1 p-3 font-Poppins text-center">
                        Once signed in, you can create a Collection for your NFT project.
                    </p>
                </div>
            </div>
            
            <div class="max-w-[305px] aspect-square border-2 border-mint-edge rounded-2xl bg-white shadow-xl">
                <div class="flex items-center justify-center h-2/5">
                    <svg width="87" height="87" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M72.8492 79.4007H0L14.1508 28.0352H87L72.8492 79.4007Z" fill="#33B3A6"/>
                        <path d="M11.0437 23.9516H72.8492V16.0861H36.4512L32.7937 7.59912H0V64.0781L11.0437 23.9516Z" fill="#33B3A6"/>
                    </svg>
                </div>
                <div class="h-3/5 w-full">
                    <p class="w-full font-bold text-center text-lg">Mint Your NFTs</p>
                    <p class="w-full mt-1 p-3 font-Poppins text-center">
                        Now you're ready to mint your NFTs! All NFTs are <a href="https://hips.hedera.com/hip/hip-412" class="font-bold">HIP-412</a> compliant.
                    </p>
                </div>
            </div>
            <div class="max-w-[305px] aspect-square border-2 border-mint-edge rounded-2xl bg-white shadow-xl">
                <div class="flex items-center justify-center h-2/5">
                    <svg height="85" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg" class="block">
                        <path d="M0.445312 30.3049L37.789 76.6642L20.8503 30.3049H0.445312Z" fill="#33B3A6"/>
                        <path d="M24.179 30.3049L42.2257 79.6975L60.6272 30.3049H24.179Z" fill="#33B3A6"/>
                        <path d="M46.2468 77.8612L84.5532 30.3049H63.9623L46.2468 77.8612Z" fill="#33B3A6"/>
                        <path d="M69.9413 5.30078H45.7842L62.3479 25.687L69.9413 5.30078Z" fill="#33B3A6"/>
                        <path d="M59.5317 27.1793L42.4992 6.21802L25.4683 27.1793H59.5317Z" fill="#33B3A6"/>
                        <path d="M39.2158 5.30078H15.0415L22.5412 25.8245L39.2158 5.30078Z" fill="#33B3A6"/>
                        <path d="M12.438 7.2793L0 27.1795H19.7079L12.438 7.2793Z" fill="#33B3A6"/>
                        <path d="M85.0001 27.1795L72.5496 7.25903L65.1265 27.1795H85.0001Z" fill="#33B3A6"/>
                    </svg>
                </div>
                <div class="h-3/5 w-full">
                    <p class="w-full font-bold text-center text-lg">Sell Your NFTs</p>
                    <p class="w-full mt-1 p-3 font-Poppins text-center">
                        Whether you minted your NFTs with us or not, you can still sell your NFTs on our platform!
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col md:max-w-7xl w-full">
        <div class="float-left font-orbitron font-bold text-3xl text-stone-700">
            EXPLORE {$nftMarketPlace}
        </div>
        <Catagories />
    </div>
</div>
