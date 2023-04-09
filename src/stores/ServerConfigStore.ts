import { map } from 'nanostores'
import { persistentMap } from '@nanostores/persistent'
import { ServerConfig } from '$models/ServerConfig.model'

export const ServerConfigObj = map<ServerConfig>({})

export const ServerConfigPersistent = persistentMap<ServerConfig>('settings:', {})