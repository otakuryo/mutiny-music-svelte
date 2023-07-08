import { c as create_ssr_component, v as validate_component, e as escape, d as add_attribute, f as each } from "../../../chunks/index.js";
import { I as Icon, S as ServerConfigPersistent, a as ServerConfigObj, L as Layout } from "../../../chunks/ServerConfigStore.js";
import { S as SubsonicAPI } from "../../../chunks/index3.js";
const Alert_circle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    [
      "line",
      {
        "x1": "12",
        "y1": "8",
        "x2": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "y1": "16",
        "x2": "12.01",
        "y2": "16"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "alert-circle" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const AlertCircle = Alert_circle;
const Check_circle_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
      }
    ],
    ["path", { "d": "m9 12 2 2 4-4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "check-circle-2" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const CheckCircle2 = Check_circle_2;
const InputText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { labelInput = "Label" } = $$props;
  let { typeInput = "text" } = $$props;
  let { phInput = "Placeholder" } = $$props;
  let { valueInput = "" } = $$props;
  let { nameInput = "name" } = $$props;
  let { idInput = "id" } = $$props;
  let { checkServer = () => {
  } } = $$props;
  let { keyLocal = void 0 } = $$props;
  if (keyLocal) {
    let keyOnLocalstorage = ServerConfigPersistent.get()[keyLocal];
    if (keyOnLocalstorage) {
      valueInput = keyOnLocalstorage;
      ServerConfigObj.setKey(keyLocal, keyOnLocalstorage);
    }
  }
  if ($$props.labelInput === void 0 && $$bindings.labelInput && labelInput !== void 0)
    $$bindings.labelInput(labelInput);
  if ($$props.typeInput === void 0 && $$bindings.typeInput && typeInput !== void 0)
    $$bindings.typeInput(typeInput);
  if ($$props.phInput === void 0 && $$bindings.phInput && phInput !== void 0)
    $$bindings.phInput(phInput);
  if ($$props.valueInput === void 0 && $$bindings.valueInput && valueInput !== void 0)
    $$bindings.valueInput(valueInput);
  if ($$props.nameInput === void 0 && $$bindings.nameInput && nameInput !== void 0)
    $$bindings.nameInput(nameInput);
  if ($$props.idInput === void 0 && $$bindings.idInput && idInput !== void 0)
    $$bindings.idInput(idInput);
  if ($$props.checkServer === void 0 && $$bindings.checkServer && checkServer !== void 0)
    $$bindings.checkServer(checkServer);
  if ($$props.keyLocal === void 0 && $$bindings.keyLocal && keyLocal !== void 0)
    $$bindings.keyLocal(keyLocal);
  {
    {
      if (keyLocal !== void 0) {
        ServerConfigPersistent.setKey(keyLocal, valueInput);
        ServerConfigObj.setKey(keyLocal, valueInput);
      }
    }
  }
  return `<label class="block"><span class="dark:text-zinc-200 text-black">${escape(labelInput)} *</span>
    <input type="text" class="dark:text-zinc-600 text-black mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"${add_attribute("placeholder", phInput, 0)}${add_attribute("name", nameInput, 0)}${add_attribute("id", idInput, 0)} required${add_attribute("value", valueInput, 0)}></label>`;
});
const InputSelect = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { labelSelect = "Label" } = $$props;
  let { nameSelect = "Name" } = $$props;
  let { valueSelect = "Option 1" } = $$props;
  let { idSelect = "Id" } = $$props;
  let { optionsSelect = ["Option 1", "Option 2", "Option 3"] } = $$props;
  let { checkServer = () => {
  } } = $$props;
  let { keyLocal = void 0 } = $$props;
  if (keyLocal) {
    let value = ServerConfigPersistent.get()[keyLocal];
    if (value) {
      valueSelect = value;
    }
  }
  if ($$props.labelSelect === void 0 && $$bindings.labelSelect && labelSelect !== void 0)
    $$bindings.labelSelect(labelSelect);
  if ($$props.nameSelect === void 0 && $$bindings.nameSelect && nameSelect !== void 0)
    $$bindings.nameSelect(nameSelect);
  if ($$props.valueSelect === void 0 && $$bindings.valueSelect && valueSelect !== void 0)
    $$bindings.valueSelect(valueSelect);
  if ($$props.idSelect === void 0 && $$bindings.idSelect && idSelect !== void 0)
    $$bindings.idSelect(idSelect);
  if ($$props.optionsSelect === void 0 && $$bindings.optionsSelect && optionsSelect !== void 0)
    $$bindings.optionsSelect(optionsSelect);
  if ($$props.checkServer === void 0 && $$bindings.checkServer && checkServer !== void 0)
    $$bindings.checkServer(checkServer);
  if ($$props.keyLocal === void 0 && $$bindings.keyLocal && keyLocal !== void 0)
    $$bindings.keyLocal(keyLocal);
  {
    {
      if (keyLocal !== void 0) {
        ServerConfigPersistent.setKey(keyLocal, valueSelect);
        ServerConfigObj.setKey(keyLocal, valueSelect);
      }
    }
  }
  return `<label class="block"><span class="dark:text-zinc-200 text-black">${escape(labelSelect)} *</span>
    <select class="dark:text-zinc-600 text-black block w-full mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"${add_attribute("name", nameSelect, 0)}${add_attribute("id", idSelect, 0)} required>${each(optionsSelect, (option) => {
    return `<option${add_attribute("value", option, 0)}>${escape(option)}</option>`;
  })}</select></label>`;
});
const ButtonSubmit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { BtnValue = "Enviar" } = $$props;
  let { checkServer = () => {
  } } = $$props;
  if ($$props.BtnValue === void 0 && $$bindings.BtnValue && BtnValue !== void 0)
    $$bindings.BtnValue(BtnValue);
  if ($$props.checkServer === void 0 && $$bindings.checkServer && checkServer !== void 0)
    $$bindings.checkServer(checkServer);
  return `<div class="block rounded dark:text-zinc-600 text-black w-full mt-1 py-2 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"><input type="submit" class="w-full cursor-pointer"${add_attribute("value", BtnValue, 0)}></div>`;
});
const LabelIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { group = "default" } = $$props;
  let { status = "waiting" } = $$props;
  let { label = "Label" } = $$props;
  if ($$props.group === void 0 && $$bindings.group && group !== void 0)
    $$bindings.group(group);
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  return `<div class="flex gap-2"${add_attribute("data-group", group, 0)}${add_attribute("data-status", status, 0)}><div class="h-8 w-8">${validate_component(CheckCircle2, "CheckCircle2").$$render(
    $$result,
    {
      fill: "none",
      class: "stroke-green-500 h-8 w-8",
      "data-type": "check"
    },
    {},
    {}
  )}
        ${validate_component(AlertCircle, "AlertCircle").$$render(
    $$result,
    {
      fill: "none",
      class: "stroke-red-500 h-8 w-8",
      "data-type": "exclamation"
    },
    {},
    {}
  )}</div>
    <div data-icon-label class="leading-8">${escape(label)}</div></div>`;
});
const FormRegister = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let statusData = {
    "status": "waiting",
    "label": "Waiting..."
  };
  let debounde = setTimeout(checkServerRemote, 1e3);
  function checkServer() {
    clearTimeout(debounde);
    debounde = setTimeout(checkServerRemote, 1e3);
    return;
  }
  async function checkServerRemote() {
    console.log("Run: checkServerRemote");
    let server = ServerConfigObj.get();
    console.log(server);
    if (!server || Object.keys(server).length === 0) {
      statusData.status = "error";
      statusData.label = "All fields are required";
      return;
    }
    try {
      const api = new SubsonicAPI({
        url: server.serverUrl,
        type: server.serverType
      });
      api.loginSync({
        username: server.username,
        password: server.password,
        serverName: server.serverName,
        version: server.serverVersion
      });
      const resPing = await api.ping();
      console.log(resPing);
      if (resPing.error) {
        console.log("error");
        statusData.status = "error";
        statusData.label = `${resPing.error.message} (ERROR: ${resPing.error.code}) (ver.: ${resPing.version})`;
        return;
      }
      console.log("pass");
      statusData.status = "pass";
      statusData.label = `Server conected (ver.: ${resPing.version})`;
      if (!ServerConfigPersistent.get().serverType) {
        ServerConfigObj.setKey("serverType", "subsonic");
        ServerConfigPersistent.setKey("serverType", "subsonic");
      }
      if (!ServerConfigPersistent.get().serverVersion) {
        ServerConfigObj.setKey("serverVersion", resPing.version);
        ServerConfigPersistent.setKey("serverVersion", resPing.version);
      }
    } catch (error) {
      console.log(`Error:`, error);
      statusData.status = "error";
      statusData.label = `Error: Network Error`;
    }
    return;
  }
  return `<div class="py-12 w-6/12 mx-auto"><h2 class="text-2xl font-bold">Configuration Server</h2>
    <form><div class="mt-8 max-w"><div class="grid grid-cols-1 gap-6">${validate_component(InputText, "InputText").$$render(
    $$result,
    {
      idInput: "userConfig",
      labelInput: "Username",
      nameInput: "user",
      keyLocal: "username",
      checkServer
    },
    {},
    {}
  )}
                ${validate_component(InputText, "InputText").$$render(
    $$result,
    {
      idInput: "passConfig",
      labelInput: "Password",
      nameInput: "password",
      typeInput: "password",
      keyLocal: "password",
      checkServer
    },
    {},
    {}
  )}
    
                ${validate_component(InputText, "InputText").$$render(
    $$result,
    {
      idInput: "urlConfig",
      labelInput: "Server URL",
      nameInput: "serverUrl",
      phInput: "https://255.255.255.255:8080",
      keyLocal: "serverUrl",
      checkServer
    },
    {},
    {}
  )}
                ${validate_component(InputText, "InputText").$$render(
    $$result,
    {
      idInput: "nameConfig",
      labelInput: "Server Name",
      nameInput: "serverName",
      valueInput: "Mutiny Server",
      keyLocal: "serverName",
      checkServer
    },
    {},
    {}
  )}

                ${validate_component(InputSelect, "InputSelect").$$render(
    $$result,
    {
      idSelect: "typeConfig",
      labelSelect: "Server type",
      nameSelect: "serverType",
      optionsSelect: ["subsonic", "navidrone", "generic"],
      keyLocal: "serverType",
      checkServer
    },
    {},
    {}
  )}
                ${validate_component(InputSelect, "InputSelect").$$render(
    $$result,
    {
      idSelect: "versionConfig",
      labelSelect: "Server Version",
      nameSelect: "serverVersion",
      optionsSelect: ["1.0.0", "1.9.0", "1.10.0", "1.16.1"],
      keyLocal: "serverVersion",
      checkServer
    },
    {},
    {}
  )}</div></div>
        <div class="mt-8 max-w">${validate_component(LabelIcon, "LabelIcon").$$render(
    $$result,
    {
      label: statusData.label,
      group: "config-form",
      status: statusData.status
    },
    {},
    {}
  )}</div>
        <div class="mt-8 max-w"><div class="grid gap-6">${validate_component(ButtonSubmit, "ButtonSubmit").$$render($$result, {}, {}, {})}</div></div></form></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(FormRegister, "FormRegister").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Page as default
};
