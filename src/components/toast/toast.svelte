<script lang="ts">
  import { TOAST_LEVEL_ERROR, TOAST_LEVEL_SUCCESS, TOAST_LEVEL_WARNING } from "../../stores/constants";
  import { fade, fly } from "svelte/transition";



    export let messageLevel: string;
    export let messageContent: string;

    function setToastStyling(level: string): string[] {
        switch(level) {
            case TOAST_LEVEL_SUCCESS:
                return ["border-[#02d43a]", "shadow-green-600", "/toast/success.svg"]; // TODO: Change to green.
            case TOAST_LEVEL_WARNING:
                return ["border-[#ffd503]", "shadow-yellow-800", "/toast/warning.svg"];
            case TOAST_LEVEL_ERROR:
            default:
                return ["border-[#de040f]", "shadow-red-900", "/toast/error.svg"];
            
        }
    }
</script>

<!-- TODO: Set min height & allow body to grow. -->
<div in:fly={{x: 400, duration:800}} out:fade class="relative flex-col h-24 rounded-lg bg-[#031b1f]/95 backdrop-blur-lg text-white">
    <div class="flex flex-row h-[92px] items-center">
        <img src="{setToastStyling(messageLevel)[2]}" alt="{messageLevel}" class="h-10 w-1/5"/>    
        <span class="w-4/5 pr-2 text-center">{messageContent}</span>
    </div>
    <span class="absolute w-full h-0 right-0 bottom-0 border-4 rounded-lg {setToastStyling(messageLevel)[0]} shadow-toast {setToastStyling(messageLevel)[1]}"></span>
</div>