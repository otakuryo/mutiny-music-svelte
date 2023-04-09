<script>
    import { ServerConfigPersistent } from '$stores/ServerConfigStore.ts';

    export let labelInput = "Label";
    export let typeInput = "text";
    export let phInput = "Placeholder";
    export let valueInput = "";
    export let nameInput = "name";
    export let idInput = "id";

    function typeAction(node) {
        node.type = typeInput;
    }

    /**
	 * @type {string | undefined}
	 */
     export let keyLocal = undefined;

    // Si existe una keyLocal, se busca en el localStorage y se asigna el valor al input
    if (keyLocal) {
        let keyOnLocalstorage = ServerConfigPersistent.get()[keyLocal]
        if (keyOnLocalstorage) { valueInput = keyOnLocalstorage }
    }

    // Al actualizar el valor del input
    // Y si existe una keyLocal, se guarda en el localStorage el valor del input
    $: {
        if (keyLocal !== undefined) { ServerConfigPersistent.setKey(keyLocal, valueInput) }
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
        name={nameInput}
        id={idInput}
        required
    />
</label>