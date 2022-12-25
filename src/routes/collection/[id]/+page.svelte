<script type="ts">
    import { page } from "$app/stores";

    let collectionId: string;

    $: collectionId = $page.params.id;
</script>

<h1>{collectionId}</h1>
