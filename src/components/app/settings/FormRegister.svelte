<script lang="ts">
    import ButtonSubmit from "$components/global/+ButtonSubmit.svelte";
    import LabelIcon from "$components/global/+LabelIcon.svelte";

    import type { SubsonicConfigType } from '$models/servers/subsonic';
    import { SubsonicAPI, SubsonicConfigTypeArray, SubsonicConfigVersionArray } from '$models/servers/subsonic';
    import { ServerConfigObj, ServerConfigPersistent } from '$stores/ServerConfigStore';
	import type { ServerConfig } from "$models/ServerConfig.model";
	import InputSelectSimple from "$components/global/InputSelectSimple.svelte";
	import InputTextSimple from "$components/global/InputTextSimple.svelte";

    // Server config object
    let server: ServerConfig = ServerConfigPersistent.get();
    
    // Object to store the status of the connection to the server
    let statusData = {
        "status": "waiting",
        "label": "Waiting..."
    }

    // Debounce, to avoid the function checkServerRemote() from being executed every time a field is modified
    let debounde = setTimeout(checkServerRemote, 1000);   
    function checkServer() {
        clearTimeout(debounde);
        debounde = setTimeout(checkServerRemote, 1000);
        return;
    }

    // Run the checkServerRemote() function to verify the connection to the server
    async function checkServerRemote() {

        console.log("Run: checkServerRemote");
        
        // Obtenemos los valores de estado
        server = ServerConfigPersistent.get();

        console.log(server);
        
        // Cancels execution if it is a null object or if it is an empty {} object
        if (!server || Object.keys(server).length === 0) {
            statusData.status = "error";
            statusData.label = "All fields are required";
            return
        }

        try {
            const api = new SubsonicAPI({
                url: server.serverUrl,
                type: server.serverType as SubsonicConfigType, // or "generic" or "navidrome"
            });

            api.loginSync({
                username: server.username,
                password: server.password,
                serverName: server.serverName,
                version: server.serverVersion
            });

            const resPing = await api.ping()

            console.log(resPing);

            // If the server type does not exist in the local storage, we add it
            if (!ServerConfigPersistent.get().serverType) {
                ServerConfigObj.setKey("serverType", "subsonic")
                ServerConfigPersistent.setKey("serverType", "subsonic")
            }

            // If the server version does not exist in the local storage, we add it
            if (!ServerConfigPersistent.get().serverVersion) {
                console.log("set version");
                
                ServerConfigObj.setKey("serverVersion", resPing.version)
                ServerConfigPersistent.setKey("serverVersion", resPing.version)
            }

            if (resPing.error) {
                console.log("error");
                statusData.status = "error";
                statusData.label = `${resPing.error.message} (ERROR: ${resPing.error.code}) (ver.: ${resPing.version})`;
                server = ServerConfigPersistent.get();

                return
            }

            statusData.status = "pass";
            statusData.label = `Server conected (ver.: ${resPing.version})`;

            server = ServerConfigPersistent.get();

        } catch (error) {
            console.log(`Error:`,error);

            // Get status values
            statusData.status = "error";
            statusData.label = `Error: Network Error`;
        }

        return
    }

</script>

<div class="py-12 w-6/12 mx-auto">
    <h2 class="text-2xl font-bold">Configuration Server</h2>
    <form on:submit|preventDefault={checkServer}>
        <div class="mt-8 max-w">
            <div class="grid grid-cols-1 gap-6">
                
                <InputTextSimple
                    bind:valueInput={server.username}
                    typeInput="text"
                    labelInput="Username"
                    keyLocal="username"
                    checkServer={checkServer} />

                <InputTextSimple
                    bind:valueInput={server.password}
                    typeInput="password"
                    labelInput="Password"
                    keyLocal="password"
                    checkServer={checkServer} />

                <InputTextSimple
                    bind:valueInput={server.serverUrl}
                    typeInput="text"
                    labelInput="Server URL"
                    phInput="https://IP:PORT"
                    keyLocal="serverUrl"
                    checkServer={checkServer} />

                <InputTextSimple
                    bind:valueInput={server.serverName}
                    typeInput="text"
                    labelInput="Server Name"
                    phInput="Mutiny Server"
                    defaultValueInput="Mutiny Server"
                    keyLocal="serverName"
                    checkServer={checkServer} />

                <InputSelectSimple
                    required={true}
                    labelSelect="Server type"
                    optionsSelect={SubsonicConfigTypeArray}
                    keyLocal="serverType"
                    valueSelect={server.serverType} />

                <InputSelectSimple 
                    labelSelect="Server Version" 
                    optionsSelect={SubsonicConfigVersionArray}
                    keyLocal="serverVersion"
                    valueSelect={server.serverVersion} />

            </div>
        </div>
        <div class="mt-8 max-w">
            <LabelIcon label={statusData.label} group="config-form" status={statusData.status} />
        </div>
        <div class="mt-8 max-w">
            <div class="grid gap-6">
                <ButtonSubmit />
            </div>
        </div>

        <div class="my-4">

            <div class="block rounded dark:text-zinc-600 text-black w-full mt-1 py-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-center">
                <a href="/server-share">Share server configuration</a>
            </div>

        </div>
    </form>
</div>