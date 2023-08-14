<script lang="ts">
	import type { ServerConfig } from '$models/ServerConfig.model';
    import { ServerConfigObj, ServerConfigPersistent } from '$stores/ServerConfigStore';

    export let labelInput = "Label";
    export let typeInput = "";
    export let phInput = "";
    export let valueInput = "";
    export let defaultValueInput: string | undefined = undefined;
    export let keyLocal: keyof ServerConfig;

    // Update server check
    export let checkServer = () => {};

    function setDefaultValue() {
        if (defaultValueInput && !valueInput) {
            valueInput = defaultValueInput;
        }
    }
    setDefaultValue();

    // Set the type of input
    function typeAction(node: HTMLInputElement) {
        node.type = typeInput;
    }


    // Save in localStorage on update valueInput
    $: {
        if (valueInput) {
            ServerConfigPersistent.setKey(keyLocal, valueInput);
            ServerConfigObj.setKey(keyLocal, valueInput);
        }
    }

</script>

<label class="block">
    <span class="dark:text-zinc-200 text-black">{labelInput} *</span>
    <input
        type="text"
        use:typeAction
        class="dark:text-zinc-600 text-black mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        placeholder={phInput}
        bind:value={valueInput}
        on:change={checkServer}
        required
    />
</label>