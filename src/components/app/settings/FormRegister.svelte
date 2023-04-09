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
                <InputText idInput="userConfig" labelInput="Username" nameInput="user" keyLocal="username" />
                <InputText idInput="passConfig" labelInput="Password" nameInput="password" typeInput="password" keyLocal="password" />
    
                <InputText idInput="urlConfig"  labelInput="Server URL"  nameInput="serverUrl"  phInput="https://255.255.255.255:8080" keyLocal="serverUrl" />
                <InputText idInput="nameConfig" labelInput="Server Name" nameInput="serverName" valueInput="Mutiny Server" keyLocal="serverName"/>

                <InputSelect idSelect="typeConfig" labelSelect="Server type" nameSelect="serverType"  optionsSelect={['subsonic','navidrone','generic']} keyLocal="serverType" />
                <InputSelect idSelect="versionConfig" labelSelect="Server Version" nameSelect="serverVersion" optionsSelect={['1.0.0','1.9.0','1.10.0','1.16.1',]} keyLocal="serverVersion" />
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