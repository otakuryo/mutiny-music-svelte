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
})

export const ServerConfigPersistent = persistentMap<ServerConfig>('settings:', {})