<script>
    export let LabelInput = "Label";
</script>

<div class="block">
    <div class="mt-2">
        <div>
            <label class="inline-flex items-center">
                <input
                    type="checkbox"
                    class="dark:text-zinc-600 text-black rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 dark:text-zinc-600 text-black focus:ring-1 focus:ring-offset-2 focus:ring-gray-500"
                />
                <span class="ml-2 dark:text-zinc-200 text-black">{LabelInput}</span
                >
            </label>
        </div>
    </div>
</div>