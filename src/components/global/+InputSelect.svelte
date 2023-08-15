<script>
    import { ServerConfigObj, ServerConfigPersistent } from '$stores/ServerConfigStore';

    export let labelSelect = "Label";
    export let nameSelect = "Name";
    export let valueSelect = "";
    export let idSelect = "Id";
    export let optionsSelect = ["", "Option 2", "Option 3"];

    // Función que se ejecuta al cambiar el valor del select
    export let checkServer = () => {};

    /**
	 * @type {string | undefined}
	 */
     export let keyLocal = undefined;

    // Si existe una keyLocal, se busca en el localStorage y se asigna el valor al listado
    if (keyLocal) {
        // @ts-ignore
        let value = ServerConfigPersistent.get()[keyLocal]
        if (value) {
            valueSelect = value
        }
    }

    // Al actualizar el valor del select
    // Y si existe una keyLocal, se guarda en el localStorage el valor del select
    $: {
        if (keyLocal !== undefined) {
            ServerConfigPersistent.setKey(keyLocal, valueSelect)
            ServerConfigObj.setKey(keyLocal, valueSelect)
        }
    }
</script>

<label class="block">
    <span class="dark:text-zinc-200 text-black">{labelSelect} *</span>
    <select
        class="dark:text-zinc-600 text-black block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        name={nameSelect}
        id={idSelect}
        required
        bind:value={valueSelect} 
        on:change={checkServer}
    >
        {#each optionsSelect as option}
            <option value={option}>{option}</option>
        {/each}
        
    </select>
</label>