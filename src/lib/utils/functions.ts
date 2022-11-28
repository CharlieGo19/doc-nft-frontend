export function scrollLeft(x: number, eleId: HTMLUListElement): void {
    eleId.scrollLeft -= x; // width of NFT - maybe extract this out to global?s
}

export function scrollRight(x: number, eleId: HTMLUListElement): void {
    eleId.scrollLeft += x;
}