import { type Readable, readable } from "svelte/store";

export type NFTcard = {
    name: string;
    creator: string;
    src: string;
    fp: number;
};

export type MostFireCard = {
    name: string;
    src: string;
    fireStrength: number;
    owner: string;
    ownerImg: string;
    price: number;
};

export type TopCollectionsCell = {
    name: string;
    verified: boolean;
    src: string;
    size: number;
    fp: number;
    volume: number;
    volumeIncrease: number;
};

export type PopularCollection = {
    name: string;
    verified: boolean;
    itemOneSrc: string;
    itemTwoSrc: string;
    itemThreeSrc: string;
    size: number;
};

export const nftMarketPlace: Readable<string> = readable("QNTUM");
export const nftMarketPlaceLogo: string = "/temp_demo/QNTUM.png";

// populate with real data!
export const homepageLaunchPadFeed: NFTcard[] = [
    {
        name: "Monke 1",
        creator: "The Doc",
        src: "/temp_demo/monke.png",
        fp: 200,
    },
    {
        name: "Monke 2",
        creator: "The Doc",
        src: "/temp_demo/monke.png",
        fp: 200,
    },
    {
        name: "Monke 3",
        creator: "The Doc",
        src: "/temp_demo/monke.png",
        fp: 200,
    },
    {
        name: "Monke 4",
        creator: "The Doc",
        src: "/temp_demo/monke.png",
        fp: 200,
    },
    {
        name: "Funk",
        creator: "Spacebar",
        src: "/temp_demo/spacebar.jpg",
        fp: 200,
    },
    {
        name: "Monke 6",
        creator: "The Doc",
        src: "/temp_demo/monke.png",
        fp: 200,
    },
    {
        name: "Funk 2",
        creator: "Spacebar",
        src: "/temp_demo/spacebar2.jpg",
        fp: 200,
    },
    {
        name: "Funk 3",
        creator: "Spacebar",
        src: "/temp_demo/spacebar3.jpg",
        fp: 200,
    },
    {
        name: "Monke 9",
        creator: "The Doc",
        src: "/temp_demo/monke.png",
        fp: 200,
    },
    {
        name: "Monke 10",
        creator: "The Doc",
        src: "/temp_demo/monke.png",
        fp: 200,
    },
    {
        name: "Monke 11",
        creator: "The Doc",
        src: "/temp_demo/monke.png",
        fp: 200,
    },
];

export const mostFireNfts: MostFireCard[] = [
    {
        name: "NFTName #01",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
    },
    {
        name: "NFTName #02",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
    },
    {
        name: "NFTName #03",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
    },
    {
        name: "NFTName #04",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
    },
    {
        name: "NFTName #05",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
    },
    {
        name: "NFTName #06",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
    },
    {
        name: "NFTName #07",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
    },
    {
        name: "NFTName #08",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
    },
    {
        name: "NFTName #09",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
    },
    {
        name: "NFTName #10",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
    },
    {
        name: "NFTName #11",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
    },
    {
        name: "NFTName #12",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
    },
    {
        name: "NFTName #13",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
    },
    {
        name: "NFTName #14",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
    },
    {
        name: "NFTName #015",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
    },
    {
        name: "NFTName #16",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
    },
];

export const homepageTopCollectionFeed: TopCollectionsCell[] = [
    {
        name: "Board Ape Yacht Club",
        verified: true,
        src: "/temp_demo/doc1.png",
        size: 6969,
        fp: 2401,
        volume: 500000,
        volumeIncrease: 12000,
    },
    {
        name: "Wen Moon",
        verified: true,
        src: "/temp_demo/doc1.png",
        size: 6969,
        fp: 2402,
        volume: 500000,
        volumeIncrease: 12000,
    },
    {
        name: "Wen Moon",
        verified: true,
        src: "/temp_demo/doc1.png",
        size: 6969,
        fp: 2403,
        volume: 500000,
        volumeIncrease: 12000,
    },
    {
        name: "Wen Moon",
        verified: true,
        src: "/temp_demo/doc1.png",
        size: 6969,
        fp: 2404,
        volume: 500000,
        volumeIncrease: 12000,
    },
    {
        name: "Wen Moon",
        verified: true,
        src: "/temp_demo/doc1.png",
        size: 6969,
        fp: 2405,
        volume: 500000,
        volumeIncrease: 12000,
    },
    {
        name: "Wen Moon",
        verified: true,
        src: "/temp_demo/doc1.png",
        size: 6969,
        fp: 2406,
        volume: 500000,
        volumeIncrease: 12000,
    },
    {
        name: "Wen Moon",
        verified: true,
        src: "/temp_demo/doc1.png",
        size: 6969,
        fp: 2407,
        volume: 500000,
        volumeIncrease: 12000,
    },
    {
        name: "Wen Moon",
        verified: true,
        src: "/temp_demo/doc1.png",
        size: 6969,
        fp: 2408,
        volume: 500000,
        volumeIncrease: 12000,
    },
];

export const homepagePopularCollections: PopularCollection[] = [
    {
        name: "Wen Moon",
        verified: true,
        itemOneSrc: "/temp_demo/spacebar2.jpg",
        itemTwoSrc: "/temp_demo/spacebar.jpg",
        itemThreeSrc: "/temp_demo/spacebar3.jpg",
        size: 4206,
    },
    {
        name: "Wen Moon",
        verified: true,
        itemOneSrc: "/temp_demo/monke.png",
        itemTwoSrc: "/temp_demo/doc1.png",
        itemThreeSrc: "/temp_demo/charlieGo.png",
        size: 4206,
    },
    {
        name: "Wen Moon",
        verified: true,
        itemOneSrc: "/temp_demo/spacebar2.jpg",
        itemTwoSrc: "/temp_demo/spacebar.jpg",
        itemThreeSrc: "/temp_demo/spacebar3.jpg",
        size: 4206,
    },
    {
        name: "Wen Moon",
        verified: true,
        itemOneSrc: "/temp_demo/monke.png",
        itemTwoSrc: "/temp_demo/doc1.png",
        itemThreeSrc: "/temp_demo/charlieGo.png",
        size: 4206,
    },
    {
        name: "Wen Moon",
        verified: true,
        itemOneSrc: "/temp_demo/spacebar2.jpg",
        itemTwoSrc: "/temp_demo/spacebar.jpg",
        itemThreeSrc: "/temp_demo/spacebar3.jpg",
        size: 4206,
    },
    {
        name: "Wen Moon",
        verified: true,
        itemOneSrc: "/temp_demo/monke.png",
        itemTwoSrc: "/temp_demo/doc1.png",
        itemThreeSrc: "/temp_demo/charlieGo.png",
        size: 4206,
    },
    {
        name: "Wen Moon",
        verified: true,
        itemOneSrc: "/temp_demo/spacebar2.jpg",
        itemTwoSrc: "/temp_demo/spacebar.jpg",
        itemThreeSrc: "/temp_demo/spacebar3.jpg",
        size: 4206,
    },
    {
        name: "Wen Moon",
        verified: true,
        itemOneSrc: "/temp_demo/monke.png",
        itemTwoSrc: "/temp_demo/doc1.png",
        itemThreeSrc: "/temp_demo/charlieGo.png",
        size: 4206,
    },
    {
        name: "Wen Moon",
        verified: true,
        itemOneSrc: "/temp_demo/spacebar2.jpg",
        itemTwoSrc: "/temp_demo/spacebar.jpg",
        itemThreeSrc: "/temp_demo/spacebar3.jpg",
        size: 4206,
    },
    {
        name: "Wen Moon",
        verified: true,
        itemOneSrc: "/temp_demo/monke.png",
        itemTwoSrc: "/temp_demo/doc1.png",
        itemThreeSrc: "/temp_demo/charlieGo.png",
        size: 4206,
    },
];

export const SearchDummyData = [
    {
        value: "Doctor Satoshi",
        type: "user",
    },
    {
        value: "SpaceBar",
        type: "user",
    },
    {
        value: "Uriah",
        type: "user",
    },
    {
        value: "CharlieGo_",
        type: "user",
    },
    {
        value: "Don Hector",
        type: "user",
    },
    {
        value: "Wen Moon",
        author: "Uriah",
        type: "collection",
    },
    {
        value: "Space",
        author: "SpaceBar",
        type: "collection",
    },
    {
        value: "Satoshi",
        author: "Doctor Satoshi",
        type: "collection",
    },
    {
        value: "0.0.12345",
        type: "token_id",
    },
    {
        value: "0.0.12346",
        type: "token_id",
    },
    {
        value: "0.0.12347",
        type: "token_id",
    },
];
