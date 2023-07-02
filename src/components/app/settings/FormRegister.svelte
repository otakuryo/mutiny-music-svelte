<script lang="ts">
    import InputText from "$components/global/+InputText.svelte";
    import InputSelect from "$components/global/+InputSelect.svelte";
    import ButtonSubmit from "$components/global/+ButtonSubmit.svelte";
    import LabelIcon from "$components/global/+LabelIcon.svelte";

    import { SubsonicAPI } from '$models/servers/subsonic';
    import { ServerConfigObj, ServerConfigPersistent } from '$stores/ServerConfigStore';

    // Objeto para almacenar el estado de la conexion con el servidor
    let statusData = {
        "status": "waiting",
        "label": "Waiting..."
    }

    // Debounce, para evitar que se ejecute la funcion checkServerRemote() cada vez que se modifica un campo
    let debounde = setTimeout(checkServerRemote, 1000);   
    function checkServer() {
        clearTimeout(debounde);
        debounde = setTimeout(checkServerRemote, 1000);
        return;
    }

    // Ejecuta la funcion checkServerRemote() para verificar la conexion con el servidor
    async function checkServerRemote() {

        console.log("Run: checkServerRemote");
        
        // Obtenemos los valores de estado
        let server = ServerConfigObj.get();

        console.log(server);
        
        // Cancela la ejecucion si es un objeto null o si es un objeto {} vacio
        if (!server || Object.keys(server).length === 0) {
            statusData.status = "error";
            statusData.label = "All fields are required";
            return
        }

        try {
            const api = new SubsonicAPI({
                url: server.serverUrl,
                type: server.serverType, // or "generic" or "navidrome"
            });

            api.loginSync({
                username: server.username,
                password: server.password,
                serverName: server.serverName,
                version: server.serverVersion
            });

            const resPing = await api.ping()

            console.log(resPing);

            if (resPing.error) {
                console.log("error");
                statusData.status = "error";
                statusData.label = `${resPing.error.message} (ERROR: ${resPing.error.code}) (ver.: ${resPing.version})`;
                return
            }
            console.log("pass");

            statusData.status = "pass";
            statusData.label = `Server conected (ver.: ${resPing.version})`;

            // Si no existe el tipo de servidor en el almacenamiento local, lo agregamos
            if (!ServerConfigPersistent.get().serverType) {
                ServerConfigObj.setKey("serverType", "subsonic")
                ServerConfigPersistent.setKey("serverType", "subsonic")
            }

            // Si no existe la version del servidor en el almacenamiento local, lo agregamos
            if (!ServerConfigPersistent.get().serverVersion) {
                ServerConfigObj.setKey("serverVersion", resPing.version)
                ServerConfigPersistent.setKey("serverVersion", resPing.version)
            }

        } catch (error) {
            console.log(`Error:`,error);

            // Obtenemos los valores de estado
            statusData.status = "error";
            statusData.label = `Error: Network Error`;
        }

        return
    }

</script>

<div class="py-12">
    <h2 class="text-2xl font-bold">Configuration Server</h2>
    <form on:submit|preventDefault={checkServer}>
        <div class="mt-8 max-w">
            <div class="grid grid-cols-1 gap-6">
                <InputText idInput="userConfig" labelInput="Username" nameInput="user" keyLocal="username" checkServer={checkServer} />
                <InputText idInput="passConfig" labelInput="Password" nameInput="password" typeInput="password" keyLocal="password" checkServer={checkServer} />
    
                <InputText idInput="urlConfig"  labelInput="Server URL"  nameInput="serverUrl"  phInput="https://255.255.255.255:8080" keyLocal="serverUrl" checkServer={checkServer} />
                <InputText idInput="nameConfig" labelInput="Server Name" nameInput="serverName" valueInput="Mutiny Server" keyLocal="serverName" checkServer={checkServer}/>

                <InputSelect idSelect="typeConfig" labelSelect="Server type" nameSelect="serverType"  optionsSelect={['subsonic','navidrone','generic']} keyLocal="serverType" checkServer={checkServer}/>
                <InputSelect idSelect="versionConfig" labelSelect="Server Version" nameSelect="serverVersion" optionsSelect={['1.0.0','1.9.0','1.10.0','1.16.1',]} keyLocal="serverVersion" checkServer={checkServer}/>
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
    </form>
</div>