<script lang="ts">
    import { toasts } from "src/stores/toasts";
    import Toast from "./toast.svelte";
</script>

{#if $toasts}
    <div class="fixed flex flex-col w-72 top-4 left-1/2 -translate-x-1/2 z-[999] space-y-1">
        {#each $toasts as toast (toast.id)}
            <Toast messageLevel={toast.messageLevel} messageContent={toast.messageContent} />
        {/each}
    </div>
{/if}