<script type="ts">
    import { page } from "$app/stores";

    let collectionId: string;
    let serial: string;

    $: {
        collectionId = $page.params.id;
        serial = $page.params.serial;
    }
</script>

<h1>{collectionId}</h1>
<h2>{serial}</h2>
