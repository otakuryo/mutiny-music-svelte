<script lang="ts">
    import { page } from '$app/stores';
	import type { ServerConfig } from '$models/ServerConfig.model';
	import { ServerConfigPersistent } from '$stores/ServerConfigStore';
    import encBase64url from 'crypto-js/enc-base64url';
    import Utf8 from 'crypto-js/enc-utf8';
	import { CheckCircle2, XCircle } from 'lucide-svelte';

    let server: ServerConfig;

    page.subscribe(value => {
        if (value.url.searchParams.has('config')){
            let strConfigServer = value.url.searchParams.get('config');

            let configServerJSON = decryptFromString(strConfigServer);

            saveToLocalStorage(configServerJSON);

            getFromLocalStorage();
        }
    });

    function decryptFromString(strConfigServer: string|null){
        if (!strConfigServer) return;

        let decodedStr = encBase64url.parse(strConfigServer);
        let configServer = Utf8.stringify(decodedStr);
        let configServerJSON = JSON.parse(configServer);

        return configServerJSON;
    }

    function saveToLocalStorage(configServerJSON: any){
        Object.keys(configServerJSON).forEach(key => {
            // @ts-ignore
            ServerConfigPersistent.setKey(key, configServerJSON[key])
        });
    }

    function getFromLocalStorage(){
        server = ServerConfigPersistent.get();
    }
</script>

<div class="main-center-panel-full grid place-content-center">

    {#if server }
    
        <div class="w-full max-w-sm  border border-gray-200 rounded-lg shadow  dark:border-gray-700">

            <div class="flex flex-col items-center p-4">
                <CheckCircle2 class="w-20 h-20 my-4 text-success animate-pulse" />
                <h5 class="mb-1 text-xl font-medium text-zinc-900 dark:text-white">Share {server.serverName}</h5>
                <span class="text-sm text-zinc-500 dark:text-zinc-400 text-center break-all">Configuration saved</span>
                <div class="flex mt-4 space-x-3 md:mt-6">
                    <a href="/">
                        <div class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-zinc-800 dark:text-white dark:border-zinc-600 dark:hover:bg-zinc-700 dark:hover:border-zinc-700 dark:focus:ring-zinc-700 cursor-pointer">Go to home</div>
                    </a>
                </div>
            </div>

        </div>

    {:else}

        <div class="w-60 max-w-sm  border border-gray-200 rounded-lg shadow  dark:border-gray-700">

            <div class="flex flex-col items-center p-4">
                <XCircle class="w-20 h-20 my-4 text-danger animate-pulse" />
                <h5 class="mb-1 text-xl font-medium text-zinc-900 dark:text-white">Error</h5>
                <span class="text-sm text-zinc-500 dark:text-zinc-400 text-center break-all">Invalid config</span>
                <div class="flex mt-4 space-x-3 md:mt-6">
                    <a href="/">
                        <div class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-zinc-800 dark:text-white dark:border-zinc-600 dark:hover:bg-zinc-700 dark:hover:border-zinc-700 dark:focus:ring-zinc-700 cursor-pointer">Go to home</div>
                    </a>
                </div>
            </div>

        </div>

    {/if}

</div>