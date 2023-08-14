<script>
    export let BtnValue = "Force Save";
    export let checkServer = () => {};
</script>
<div class="block rounded dark:text-zinc-600 text-black w-full mt-1 py-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0">
    <input type="submit" class="w-full cursor-pointer" value={BtnValue} on:click={checkServer} />
</div> 