<script>
    import InputText from "$components/global/+InputText.svelte";
    import InputSelect from "$components/global/+InputSelect.svelte";
    import ButtonSubmit from "$components/global/+ButtonSubmit.svelte";
    import LabelIcon from "$components/global/+LabelIcon.svelte";
</script>

<div class="py-12">
    <h2 class="text-2xl font-bold">Configuration Server</h2>
    <form action="">
        <div class="mt-8 max-w">
            <div class="grid grid-cols-1 gap-6">
                <InputText IdInput="userConfig" LabelInput="Username" NameInput="user" />
                <InputText IdInput="passConfig" LabelInput="Password" NameInput="password" TypeInput="password" />
    
                <InputText IdInput="urlConfig"  LabelInput="Server URL"  NameInput="serverUrl"  PHInput="https://255.255.255.255:8080" />
                <InputText IdInput="nameConfig" LabelInput="Server Name" NameInput="serverName" ValueInput="Mutiny Server" />

                <InputSelect IdSelect="typeConfig" LabelSelect="Server type" NameSelect="serverType"  OptionsSelect={['subsonic','navidrone','generic']} />
                <InputSelect IdSelect="versionConfig" LabelSelect="Server Version" NameSelect="serverVersion" OptionsSelect={['1.0.0','1.9.0','1.10.0','1.16.1',]} />
            </div>
        </div>
        <div class="mt-8 max-w">
            <LabelIcon label="Waiting..." group="config-form" status="waiting" />
        </div>
        <div class="mt-8 max-w">
            <div class="grid gap-6">
                <ButtonSubmit />
            </div>
        </div>
    </form>
</div>