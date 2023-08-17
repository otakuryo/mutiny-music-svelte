import { writable } from "svelte/store"
import type { Writable } from "svelte/store"

export let ShowModal: Writable<Boolean> = writable(false)
export let ShowSongId: Writable<string> = writable('')