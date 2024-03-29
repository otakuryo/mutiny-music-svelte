import { map, type MapStore } from 'nanostores'
import { persistentMap } from '@nanostores/persistent'
import type { ServerConfig } from '$models/ServerConfig.model'

export const ServerConfigObj: MapStore<ServerConfig>  = map<ServerConfig>({
    username: "",
    password: "",
    serverUrl: "",
    serverName: "",
    serverType: "",
    serverVersion: "",

    defaultPlaylistId: "0",
    defaultPlaylistName: "None"
})

export const ServerConfigPersistent = persistentMap<ServerConfig>('settings:', {})