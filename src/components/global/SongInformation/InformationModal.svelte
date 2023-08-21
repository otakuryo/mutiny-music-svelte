<script lang="ts">
	import { Clock, Disc, Folder, FolderSymlink, Info, Loader, User, X } from 'lucide-svelte';
	import { ShowSongId, ShowModal } from '$stores/SongInformationStore';
	import { get } from 'svelte/store';
	import { MainServerSubsonicAPI, getDurationHuman, getMegabytesFromBytes } from '$lib/ts/Helpers';
	import type { Child } from '$models/servers/subsonic';
	import LineInformationModal from '$components/global/SongInformation/partials/LineInformationModal.svelte';

	let songInformation: Child | undefined = undefined;
	let loading = false;

	async function getInformationSong() {
		
		let songId = get(ShowSongId);

		if (!songId) return;
		loading = true;
		try {
			let api = MainServerSubsonicAPI();
			let responseSongInfo = await api.getSong({ id: songId });
			
			if (responseSongInfo.error) throw new Error('Error al obtener la información de la canción');

			if (!responseSongInfo.song) throw new Error('No se encontro la canción');

			songInformation = responseSongInfo.song;
		} catch (error) {
            let e: Error = error as Error;
            throw new Error(e.message);
        }
	}

	function toggleModal() {
		ShowSongId.set('');
		ShowModal.set(!get(ShowModal));
	}

	ShowModal.subscribe((value) => {
		getInformationSong();
	});
</script>

<!-- Main modal -->
<div
	id="staticModal"
	aria-hidden="true"
	class:hidden={!$ShowModal}
	on:click|self={toggleModal}
	class="fixed bottom-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full flex justify-center items-center"
>
	<div class="relative w-full max-w-2xl">
		<!-- Modal content -->
		<div class="relative rounded-sm shadow border border-white main-color">
			<!-- Modal header -->
			<div class="flex items-start justify-between p-4 border-b rounded-sm-t">
				<h3 class="text-xl font-semibold text-gray-900 dark:text-white min-h-8">{songInformation?.title}</h3>
				<button
					type="button"
					class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-sm text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
					on:click={toggleModal}
				>
					<X class="w-6" />
					<span class="sr-only">Close modal</span>
				</button>
			</div>

			{#if songInformation}
				<div class="px-2">
					<div class="w-full main-color">
						<div class="flow-root overflow-x-scroll h-[60vh]" >
							<ul class="divide-y divide-zinc-200 dark:divide-zinc-700">

								<LineInformationModal title={getMegabytesFromBytes(songInformation.size, true)} subtitle="Size">
									<div slot="icon">
										<Info class="w-8 h-8" />
									</div>
								</LineInformationModal>

								<LineInformationModal title={songInformation.year?.toString()} subtitle="Year">
									<div slot="icon">
										<Info class="w-8 h-8" />
									</div>
								</LineInformationModal>

								<LineInformationModal title={songInformation.bitRate?.toString()} subtitle="BitRate">
									<div slot="icon">
										<Info class="w-8 h-8" />
									</div>
								</LineInformationModal>


								<LineInformationModal title={songInformation.discNumber?.toString()} subtitle="DiscNumber">
									<div slot="icon">
										<Info class="w-8 h-8" />
									</div>
								</LineInformationModal>

								<LineInformationModal title={getDurationHuman(songInformation.duration)} subtitle="Duration">
									<div slot="icon">
										<Clock class="w-8 h-8" />
									</div>
								</LineInformationModal>

								<LineInformationModal title={songInformation.genre} subtitle="Genre">
									<div slot="icon">
										<Info class="w-8 h-8" />
									</div>
								</LineInformationModal>

								<LineInformationModal title={songInformation.created?.toString()} subtitle="Created">
									<div slot="icon">
										<Info class="w-8 h-8" />
									</div>
								</LineInformationModal>

								<LineInformationModal title={songInformation.isDir ? 'True' : 'False'} subtitle="Is Directory">
									<div slot="icon">
										<Info class="w-8 h-8" />
									</div>
								</LineInformationModal>

								<LineInformationModal title={songInformation.isVideo ? 'True' : 'False'} subtitle="Is Video">
									<div slot="icon">
										<Info class="w-8 h-8" />
									</div>
								</LineInformationModal>

								<LineInformationModal title={songInformation.suffix} subtitle="Suffix">
									<div slot="icon">
										<Info class="w-8 h-8" />
									</div>
								</LineInformationModal>

								<LineInformationModal title={songInformation.track?.toString()} subtitle="Track">
									<div slot="icon">
										<Info class="w-8 h-8" />
									</div>
								</LineInformationModal>

								<LineInformationModal title={songInformation.type} subtitle="Type">
									<div slot="icon">
										<Info class="w-8 h-8" />
									</div>
								</LineInformationModal>

								<LineInformationModal title={songInformation.album} subtitle="Album">
									<div slot="icon">
										<Disc class="w-8 h-8" />
									</div>

									<div slot="action">
										{#if songInformation.albumId}
											<a type="button" on:click={toggleModal} href="/albums?id={songInformation.albumId}" class="btn-small-control-list">
												<FolderSymlink class="w-6 h-6" />
											</a>
										{/if}
									</div>
								</LineInformationModal>

								<LineInformationModal title={songInformation.artist} subtitle="Artist">
									<div slot="icon">
										<User class="w-8 h-8" />
									</div>

									<div slot="action">
										{#if songInformation.artistId}
											<a type="button" on:click={toggleModal} href="/artists?id={songInformation.artistId}" class="btn-small-control-list">
												<FolderSymlink class="w-6 h-6" />
											</a>
										{/if}
									</div>
								</LineInformationModal>

								<LineInformationModal title={songInformation.path} subtitle="Directory">
									<div slot="icon">
										<Folder class="w-8 h-8" />
									</div>

									<div slot="action">
										{#if songInformation.artistId}
											<a type="button" on:click={toggleModal} href="/directory?id={songInformation.parent}" class="btn-small-control-list">
												<FolderSymlink class="w-6 h-6" />
											</a>
										{/if}
									</div>
								</LineInformationModal>

							</ul>
						</div>
					</div>
				</div>

			{:else if loading}
				<div class="divide-y p-2 border-theme m-2">
					<Loader class="animate-spin-slow h-8 w-8 text-theme mx-auto" />
				</div>
			{/if}

		</div>
	</div>
</div>
