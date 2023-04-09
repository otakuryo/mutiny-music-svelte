<script>
    export let LabelSelect = "Label";
    export let NameSelect = "Name";
    export let ValueSelect = "Value";
    export let IdSelect = "Id";
    export let OptionsSelect = ["Option 1", "Option 2", "Option 3"];
</script>

<label class="block">
    <span class="dark:text-zinc-200 text-black">{LabelSelect} *</span>
    <select
        class="dark:text-zinc-600 text-black block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        name={NameSelect}
        id={IdSelect}
        required
    >
        {#each OptionsSelect as option}
            <option value={option} selected={option === ValueSelect}>{option}</option>
        {/each}
        
    </select>
</label>