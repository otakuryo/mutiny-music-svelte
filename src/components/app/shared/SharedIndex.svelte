<script lang="ts">
	import { ServerConfigPersistent } from "$stores/ServerConfigStore";
    import Utf8 from 'crypto-js/enc-utf8';
    import encBase64url from "crypto-js/enc-base64url";
	import { Send } from "lucide-svelte";

    let configServer = '';
    let serverTitle = '';
    let buildUrl = '';
    let copyUrl = false;

    function getServerSettings() {
        
        // Obtenemos los valores de estado
        let server = ServerConfigPersistent.get();
        serverTitle = server.serverName;

        let strServer = JSON.stringify(server);
        let encodedStr = Utf8.parse(strServer);
        let encodedStrBase64 = encBase64url.stringify(encodedStr);
        configServer = encodedStrBase64;

        buildUrl = window.location.origin + '/server-config?config=' + configServer;
    }
    getServerSettings();

    /**
     * Copies the text passed as param to the system clipboard
     * Check if using HTTPS and navigator.clipboard is available
     * Then uses standard clipboard API, otherwise uses fallback
    */
    function copyToClipboard(){
        console.log('Copied to clipboard');
        if (window.isSecureContext && navigator.clipboard) {
            navigator.clipboard.writeText(buildUrl);
        } else {
            unsecuredCopyToClipboard(buildUrl);
        }
        copyUrl = true;
    };

    function unsecuredCopyToClipboard(text: string) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Unable to copy to clipboard', err);
        }
        document.body.removeChild(textArea);
    }
</script>

<div class="main-center-panel-full grid place-content-center">

    <div class="w-full max-w-sm  border border-gray-200 rounded-lg shadow  dark:border-gray-700">

        <div class="flex flex-col items-center p-4">
            <Send class="w-20 h-20 my-4 text-zinc-700 dark:text-zinc-300 {copyUrl ? 'animate-pulse' : ''}" />
            <h5 class="mb-1 text-xl font-medium text-zinc-900 dark:text-white">Share {serverTitle}</h5>
            <span class="text-sm text-zinc-500 dark:text-zinc-400 text-center break-all">{buildUrl}</span>
            <div class="flex mt-4 space-x-3 md:mt-6">
                <div on:click={copyToClipboard} on:keypress={copyToClipboard} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-zinc-800 dark:text-white dark:border-zinc-600 dark:hover:bg-zinc-700 dark:hover:border-zinc-700 dark:focus:ring-zinc-700 cursor-pointer">{copyUrl ? 'URL copied!' : 'Copy'}</div>
            </div>
        </div>

    </div>

</div>