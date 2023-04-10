import { map } from 'nanostores'
import { persistentMap } from '@nanostores/persistent'
import type { ServerConfig } from '$models/ServerConfig.model'

export const ServerConfigObj = map<ServerConfig>({
    username: "",
    password: "",
    serverUrl: "",
    serverName: "",
    serverType: "subsonic",
    serverVersion: "1.0.0",
})

export const ServerConfigPersistent = persistentMap<ServerConfig>('settings:', {})