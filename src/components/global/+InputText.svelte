<script>
    export let LabelInput = "Label";
    export let TypeInput = "text";
    export let PHInput = "Placeholder";
    export let ValueInput = "";
    export let NameInput = "name";
    export let IdInput = "id";

    
</script>

<label class="block">
    <span class="dark:text-zinc-200 text-black">{LabelInput} *</span>
    <input
        type={TypeInput}
        class="dark:text-zinc-600 text-black mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        placeholder={PHInput}
        value={ValueInput}
        name={NameInput}
        id={IdInput}
        required
    />
</label>