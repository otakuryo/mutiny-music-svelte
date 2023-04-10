<script>
    // @ts-nocheck

    /**
     * Notes: 
     * - use global.css
     */

    import { CheckCircle2, AlertCircle } from "lucide-svelte";
    export let group = "default";
    export let status = "waiting";
    export let label = "Label";

</script>

<div class="flex gap-2" data-group={group} data-status={status}>
    <div class="h-8 w-8">
        <CheckCircle2 fill="none" class="stroke-green-500 h-8 w-8" data-type="check"/>
        <AlertCircle fill="none" class="stroke-red-500 h-8 w-8" data-type="exclamation" />
    </div>
    <div data-icon-label class="leading-8">
        {label}
    </div>
</div>