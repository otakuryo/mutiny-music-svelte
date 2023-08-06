<script>
	import { X } from "lucide-svelte";
    import { ShowImageCoverStore, ImageCoverStore, TitleStore } from '$stores/ImageCoverStore.js';
	import { get } from "svelte/store";

    function toggleModal() {
        ShowImageCoverStore.set(!get(ShowImageCoverStore));
    }

</script>

<!-- Main modal -->
<div
	id="staticModal"
	aria-hidden="true"
    class:hidden={!$ShowImageCoverStore}
    on:click|self={toggleModal}
	class="fixed bottom-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full flex justify-center items-center"
>
	<div class="relative w-full max-w-2xl">
		<!-- Modal content -->
		<div class="relative rounded-sm shadow border border-white main-color">
			<!-- Modal header -->
			<div class="flex items-start justify-between p-4 border-b rounded-sm-t">
				<h3 class="text-xl font-semibold text-gray-900 dark:text-white min-h-8">{$TitleStore}</h3>
				<button
					type="button"
					class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-sm text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    on:click={toggleModal}
				>
                    <X class="w-6" />
					<span class="sr-only">Close modal</span>
				</button>
			</div>
			<!-- Modal body -->
			<div class="p-2">
                <img
                    loading="lazy"
                    src={$ImageCoverStore}
                    class="w-auto h-full max-h-[80vh] mx-auto rounded-sm dark:border-cover-dark-border object-cover"
                    alt={$TitleStore}
                />
			</div>
		</div>
	</div>
</div>
