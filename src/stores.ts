import { type Readable, readable } from "svelte/store";
// TODO: Refactor these to all extend NFT - includes tokenId & serial.
export type NFTcard = {
    name: string;
    creator: string;
    src: string;
    fp: number;
    serial: number;
};

// TODO: New NFTCard
export type NFT = {
    tokenId: string;
    name: string;
    creator: string;
    src: string;
    serial: number;
};

// TODO: Slap traits here.
export type Collection = {
    tokenId: string;
    maxSerial: number;
    creator: string;
    floorPrice: number;
};

export type MostFireCard = {
    name: string;
    src: string;
    fireStrength: number;
    owner: string;
    ownerImg: string;
    price: number;
    serial: number;
};

export type TopCollectionsCell = {
    name: string;
    verified: boolean;
    src: string;
    size: number;
    fp: number;
    volume: number;
    volumeIncrease: number;
    collectionId: number;
};

export type PopularCollection = {
    name: string;
    verified: boolean;
    itemOneSrc: string;
    itemTwoSrc: string;
    itemThreeSrc: string;
    size: number;
};

export type DummySaleHistory = {
    price: number;
    from: string;
    to: string;
    date: string;
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
        serial: 3,
    },
    {
        name: "Monke 2",
        creator: "The Doc",
        src: "/temp_demo/monke.png",
        fp: 200,
        serial: 3,
    },
    {
        name: "Monke 3",
        creator: "The Doc",
        src: "/temp_demo/monke.png",
        fp: 200,
        serial: 3,
    },
    {
        name: "Monke 4",
        creator: "The Doc",
        src: "/temp_demo/monke.png",
        fp: 200,
        serial: 3,
    },
    {
        name: "Funk",
        creator: "Spacebar",
        src: "/temp_demo/spacebar.jpg",
        fp: 200,
        serial: 3,
    },
    {
        name: "Monke 6",
        creator: "The Doc",
        src: "/temp_demo/monke.png",
        fp: 200,
        serial: 3,
    },
    {
        name: "Funk 2",
        creator: "Spacebar",
        src: "/temp_demo/spacebar2.jpg",
        fp: 200,
        serial: 3,
    },
    {
        name: "Funk 3",
        creator: "Spacebar",
        src: "/temp_demo/spacebar3.jpg",
        fp: 200,
        serial: 3,
    },
    {
        name: "Monke 9",
        creator: "The Doc",
        src: "/temp_demo/monke.png",
        fp: 200,
        serial: 3,
    },
    {
        name: "Monke 10",
        creator: "The Doc",
        src: "/temp_demo/monke.png",
        fp: 200,
        serial: 3,
    },
    {
        name: "Monke 11",
        creator: "The Doc",
        src: "/temp_demo/monke.png",
        fp: 200,
        serial: 3,
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
        serial: 1,
    },
    {
        name: "NFTName #02",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
        serial: 1,
    },
    {
        name: "NFTName #03",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
        serial: 1,
    },
    {
        name: "NFTName #04",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
        serial: 1,
    },
    {
        name: "NFTName #05",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
        serial: 1,
    },
    {
        name: "NFTName #06",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
        serial: 1,
    },
    {
        name: "NFTName #07",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
        serial: 1,
    },
    {
        name: "NFTName #08",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
        serial: 1,
    },
    {
        name: "NFTName #09",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
        serial: 1,
    },
    {
        name: "NFTName #10",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
        serial: 1,
    },
    {
        name: "NFTName #11",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
        serial: 1,
    },
    {
        name: "NFTName #12",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
        serial: 1,
    },
    {
        name: "NFTName #13",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
        serial: 1,
    },
    {
        name: "NFTName #14",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
        serial: 1,
    },
    {
        name: "NFTName #015",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
        serial: 1,
    },
    {
        name: "NFTName #16",
        src: "/temp_demo/doc1.png",
        fireStrength: 420,
        owner: "CharlieGo_",
        ownerImg: "/temp_demo/charlieGo.png",
        price: 1000,
        serial: 1,
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
        collectionId: 1,
    },
    {
        name: "Wen Moon",
        verified: true,
        src: "/temp_demo/charlieGo.png",
        size: 6969,
        fp: 2402,
        volume: 500000,
        volumeIncrease: 12000,
        collectionId: 2,
    },
    {
        name: "Monke",
        verified: true,
        src: "/temp_demo/monke.png",
        size: 6969,
        fp: 2403,
        volume: 500000,
        volumeIncrease: 12000,
        collectionId: 3,
    },
    {
        name: "Wen Moon",
        verified: true,
        src: "/temp_demo/doc1.png",
        size: 6969,
        fp: 2404,
        volume: 500000,
        volumeIncrease: 12000,
        collectionId: 3,
    },
    {
        name: "Wen Moon",
        verified: true,
        src: "/temp_demo/doc1.png",
        size: 6969,
        fp: 2405,
        volume: 500000,
        volumeIncrease: 12000,
        collectionId: 3,
    },
    {
        name: "Wen Moon",
        verified: true,
        src: "/temp_demo/doc1.png",
        size: 6969,
        fp: 2406,
        volume: 500000,
        volumeIncrease: 12000,
        collectionId: 3,
    },
    {
        name: "Wen Moon",
        verified: true,
        src: "/temp_demo/doc1.png",
        size: 6969,
        fp: 2407,
        volume: 500000,
        volumeIncrease: 12000,
        collectionId: 3,
    },
    {
        name: "Wen Moon",
        verified: true,
        src: "/temp_demo/doc1.png",
        size: 6969,
        fp: 2408,
        volume: 500000,
        volumeIncrease: 12000,
        collectionId: 3,
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

export const dummyHistoryForNftPage: DummySaleHistory[] = [
    {
        price: 1000,
        from: "The Doc",
        to: "SpaceBar",
        date: "25/12/2022",
    },
    {
        price: 800,
        from: "The Doc",
        to: "Uriah",
        date: "25/12/2022",
    },
    {
        price: 1400,
        from: "Uriah",
        to: "SpaceBar",
        date: "25/12/2022",
    },
    {
        price: 10000,
        from: "The Doc",
        to: "The Doc",
        date: "25/12/2022",
    },
    {
        price: 8000,
        from: "The Doc",
        to: "Sevvo",
        date: "25/12/2022",
    },
    {
        price: 600,
        from: "Sevvo",
        to: "SpaceBar",
        date: "25/12/2022",
    },
    {
        price: 15000,
        from: "Sevvo",
        to: "Leemonade",
        date: "25/12/2022",
    },
];

export const dummyCollection: Collection = {
    tokenId: "0.0.12345",
    maxSerial: 24,
    creator: "Studio Ennui",
    floorPrice: 10000,
};

export const dummyNft: NFT[] = [
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 1,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 2,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 3,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 4,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 5,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 6,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 7,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 8,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 9,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 10,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 11,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 12,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 13,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 14,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 14,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 15,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 16,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 17,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 18,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 19,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 20,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 21,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 22,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 23,
    },
    {
        tokenId: "0.0.12345",
        name: "WenMoon",
        creator: "Studio Ennui",
        src: "/temp_demo/wenMoon.gif",
        serial: 24,
    },
];
