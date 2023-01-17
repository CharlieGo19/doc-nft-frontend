<script lang="ts">
    const traits = [
        {
            id: 0,
            trait: "Face",
            traits: [
                { id: 0, value: "Ugly" },
                { id: 1, value: "Handsom" },
                { id: 2, value: "Gigachad" },
            ],
        },
        {
            id: 1,
            trait: "Arms",
            traits: [
                { id: 0, value: "Short" },
                { id: 1, value: "Normal" },
                { id: 2, value: "Long" },
            ],
        },
        {
            id: 2,
            trait: "Torso",
            traits: [
                { id: 0, value: "Skinny" },
                { id: 1, value: "Slender" },
                { id: 2, value: "Chonky" },
            ],
        },
    ];

    let selectedTraits: string[] = []; // TODO: Should this be a store? We'll see.Carousel
    let showFilterMenu = false; // TODO: Set to false
</script>

<div class="flex flex-col md:flex-row h-10 md:h-0 w-full max-w-7xl">
    <div
        class="flex flex-col w-full p-2 bg-black/60 backdrop-blur-lg text-white fixed top-14 md:top-[3.76rem] justify-center font-Poppins">
        <span
            on:click={() => (showFilterMenu = !showFilterMenu)}
            class="md:w-3/4 md:mx-auto">
            <span class="md:px-8">
                <!-- TODO: Add transition. -->
                Filter Traits
                <button class="inline-block align-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 22 26"
                        stroke-width="2.5"
                        stroke="currentColor"
                        class="w-6 h-6 transition duration-500 {showFilterMenu ===
                        true
                            ? 'rotate-180 -translate-y-0.5'
                            : ''}">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
            </span>
        </span>
        <span
            class="{showFilterMenu === true
                ? ''
                : 'hidden'} flex flex-col w-full pt-2">
            {#each traits as trait}
                <span
                    class="w-full max-w-7xl mx-auto px-2 rounded-md text-center text-black dark:text-white font-semibold bg-light-mint dark:bg-dark-mint">
                    {trait.trait}
                </span>
                {#each trait.traits as subType}
                    <label class="w-full max-w-7xl mx-auto px-2 pt-1">
                        <input
                            type="checkbox"
                            name="trait"
                            id={subType.id.toString()}
                            value={subType.value}
                            bind:group={selectedTraits}
                            class="w-4 h-4" />
                        {subType.value}
                    </label>
                {/each}
            {/each}
        </span>
    </div>
</div>
<slot />
