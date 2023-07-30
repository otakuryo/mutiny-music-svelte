import { SubsonicAPI } from "$models/servers/subsonic";
import { ServerConfigPersistent } from "$stores/ServerConfigStore";

/**
 * Devuelve la duración en formato mm:ss
 * 
 * @param {number | undefined} duration
 */
let getDurationHuman = (duration) => {

    // Si no hay duración, se devuelve 00:00
    if (duration === undefined) return "00:00";

    // Si hay duración, se devuelve en formato mm:ss
    let minutes = Math.floor(duration / 60);
    let seconds = Math.round(duration - minutes * 60);

    let mmStr = minutes.toString().padStart(2, "0");
    let ssStr = seconds.toString().padStart(2, "0");
    return `${mmStr}:${ssStr}`;
}

let MainServerSubsonicAPI = () => {

    // Obtenemos los datos del servidor desde la memoria persistente
    let server = ServerConfigPersistent.get();

    const api = new SubsonicAPI({
        url: server.serverUrl,
        type: server.serverType, // or "generic" or "navidrome"
    });

    api.loginSync({
        username: server.username,
        password: server.password,
        serverName: server.serverName,
        version: server.serverVersion,
    });

    return api;
}

export { 
    getDurationHuman,
    MainServerSubsonicAPI,
};