import type { BreadcrumbItem } from "$lib/types/global";
import { SubsonicAPI, type SubsonicConfigType } from "$models/servers/subsonic";
import BreadcrumbStore from "$stores/BreadcrumbStore";
import { ServerConfigObj, ServerConfigPersistent } from "$stores/ServerConfigStore";

/**
 * Returns the duration in mm:ss format
 * 
 * @param {number | undefined} duration
 */
let getDurationHuman = (duration: number|undefined) => {

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

    // Retrieve the server configuration
    let server = getServerSubsonicConfiguration()

    const api = new SubsonicAPI({
        url: server.serverUrl,
        type: server.serverType as SubsonicConfigType, // or "generic" or "navidrome"
    });

    api.loginSync({
        username: server.username,
        password: server.password,
        serverName: server.serverName,
        version: server.serverVersion,
    });

    return api;
}
/**
 * Return the server configuration
 * 
 * @returns MapStore<ServerConfig>
 */
let getServerSubsonicConfiguration = () => {

    // Retrieve the server configuration
    let server = ServerConfigObj.get();

    if (server === undefined || server && server.serverUrl == "") {

        console.log(`* MainServerSubsonicAPI -> Loading from localStorage`);

        // Retrieve the data from the persistent memory
        let serverLS = ServerConfigPersistent.get();
        Object.keys(serverLS).forEach((key) => {
            // @ts-ignore
            ServerConfigObj.setKey(key, serverLS[key]);
        });

        // Refresh the server variable
        server = ServerConfigObj.get();

    }

    return server;
}

/**
 * Add a new item to the breadcrumbs
 * 
 * @param name Text show on breadcrumbs
 * @param currentPath Url relative to the root of the app
 * 
 * @example
 * ```
 * addItemToBreadcrumbs("Home", "/serach?query=hello")
 * ```
 */
function AddItemToBreadcrumbs(name: string, currentPath: string) {
    console.log('onGoLink');

    let breadItem: BreadcrumbItem = {
        name: name,
        path: currentPath
    };

    BreadcrumbStore.addItem(breadItem);
}

/**
 * Remove the last item from the breadcrumbs
 */
function RemoveItemOnBreadcrumbs() {
    console.log('onGoBack');
    BreadcrumbStore.removeLastItem();
}

/**
 * Remove all items from the breadcrumbs
 */
function RemoveAllItemsOnBreadcrumbs() {
    console.log('onResetBack');
    BreadcrumbStore.clear();
}

export { 
    getDurationHuman,
    MainServerSubsonicAPI,
    AddItemToBreadcrumbs,
    RemoveItemOnBreadcrumbs,
    RemoveAllItemsOnBreadcrumbs
};