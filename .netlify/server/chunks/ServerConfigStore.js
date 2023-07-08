import { c as create_ssr_component, s as subscribe, d as add_attribute, e as escape, h as compute_rest_props, i as spread, j as escape_object, k as escape_attribute_value, f as each, l as is_void, v as validate_component } from "./index.js";
import { p as page } from "./stores.js";
import { map } from "nanostores";
import { persistentMap } from "@nanostores/persistent";
const app = "";
const global = "";
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let title = "Mutiny Music on SvelteKit", description = "Web client for subsonic api.", imageAlt = "Music icon", heroImage = "/banner.png", canonicalURL = $page.url.href, contentLanguage = "es-ES";
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1fhd2qo_START --><meta charset="UTF-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="Content-Language"${add_attribute("content", contentLanguage, 0)}>${$$result.title = `<title>${escape(title)}</title>`, ""}<link rel="sitemap" href="/sitemap-index.xml"><link rel="canonical"${add_attribute("href", canonicalURL, 0)}><meta name="title"${add_attribute("content", title, 0)}><meta name="description"${add_attribute("content", description, 0)}><meta property="og:type" content="website"><meta property="og:url"${add_attribute("content", canonicalURL, 0)}><meta property="og:title"${add_attribute("content", title, 0)}><meta property="og:description"${add_attribute("content", description, 0)}><meta property="og:image"${add_attribute("content", heroImage, 0)}><meta property="og:image:alt"${add_attribute("content", imageAlt, 0)}><meta property="og:site_name" content="NoFuss Astro"><meta property="og:locale" content="en_US"><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${add_attribute("content", canonicalURL, 0)}><meta property="twitter:title"${add_attribute("content", title, 0)}><meta property="twitter:description"${add_attribute("content", description, 0)}><meta property="twitter:image"${add_attribute("content", heroImage, 0)}><meta name="robots" content="follow, index"><meta name="author" content="Lance Ross"><!-- HEAD_svelte-1fhd2qo_END -->`, ""}`;
});
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["name", "color", "size", "strokeWidth", "iconNode"]);
  let { name } = $$props;
  let { color = "currentColor" } = $$props;
  let { size = 24 } = $$props;
  let { strokeWidth = 2 } = $$props;
  let { iconNode } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.iconNode === void 0 && $$bindings.iconNode && iconNode !== void 0)
    $$bindings.iconNode(iconNode);
  return `<svg${spread(
    [
      escape_object(defaultAttributes),
      escape_object($$restProps),
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      { stroke: escape_attribute_value(color) },
      {
        "stroke-width": escape_attribute_value(strokeWidth)
      },
      {
        class: escape_attribute_value(`lucide-icon lucide lucide-${name} ${$$props.class ?? ""}`)
      }
    ],
    {}
  )}>${each(iconNode, ([tag, attrs]) => {
    return `${((tag$1) => {
      return tag$1 ? `<${tag}${spread([escape_object(attrs)], {})}>${is_void(tag$1) ? "" : ``}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
    })(tag)}`;
  })}${slots.default ? slots.default({}) : ``}</svg>`;
});
const Icon$1 = Icon;
const Headphones = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M3 18v-6a9 9 0 0 1 18 0v6" }],
    [
      "path",
      {
        "d": "M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"
      }
    ]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "headphones" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Headphones$1 = Headphones;
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "4",
        "y1": "12",
        "x2": "20",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "4",
        "y1": "6",
        "x2": "20",
        "y2": "6"
      }
    ],
    [
      "line",
      {
        "x1": "4",
        "y1": "18",
        "x2": "20",
        "y2": "18"
      }
    ]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "menu" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Menu$1 = Menu;
const Moon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z"
      }
    ]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "moon" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Moon$1 = Moon;
const Sun = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "4" }],
    ["path", { "d": "M12 2v2" }],
    ["path", { "d": "M12 20v2" }],
    ["path", { "d": "m4.93 4.93 1.41 1.41" }],
    ["path", { "d": "m17.66 17.66 1.41 1.41" }],
    ["path", { "d": "M2 12h2" }],
    ["path", { "d": "M20 12h2" }],
    ["path", { "d": "m6.34 17.66-1.41 1.41" }],
    ["path", { "d": "m19.07 4.93-1.41 1.41" }]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "sun" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Sun$1 = Sun;
const ThemeToggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="theme-toggle text-lg not-italic font-normal leading-7 z-20 text-gray-900 box-border m-0 max-w-full p-0 align-baseline dark:bg-zinc-700 bg-zinc-300 w-12 h-12 fixed cursor-pointer flex justify-center items-center bottom-8 right-8 rounded-full left-unset border-none border-separate border-spacing-0"><button aria-label="theme toggle">${validate_component(Moon$1, "Moon").$$render(
    $$result,
    {
      class: "w-6 hover:text-slate-500 dark:hover:text-slate-400 dark:hidden"
    },
    {},
    {}
  )}
    ${validate_component(Sun$1, "Sun").$$render(
    $$result,
    {
      class: "w-6 dark:text-white hover:text-slate-500 dark:hover:text-slate-400 hidden dark:block"
    },
    {},
    {}
  )}</button></div>`;
});
const InputSearch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden transition duration-500"><div class="grid place-items-center h-full w-12 text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div>

    <input class="peer h-full w-full outline-none text-sm text-gray-700 pr-2 border-none" type="text" id="search" placeholder="Search..." autocomplete="off"></div>`;
});
const MenuRoute = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const navbar_ = [
    { name: "Home", href: "/" },
    { name: "Directory", href: `/directory` },
    { name: "Album", href: "/" },
    { name: "Artist", href: "/" },
    { name: "Settings", href: "/settings" }
  ];
  return `<header class="bg-white dark:bg-zinc-900 text-lg dark:text-zinc-300 mx-auto max-w-6xl flex flex-row justify-between"><a href="/" class="mx-8 my-5 flex items-center" aria-label="Website Logo">${validate_component(Headphones$1, "Headphones").$$render($$result, { class: "w-8 h-8" }, {}, {})}
        <span class="self-center sm:hidden text-2xl whitespace-nowrap dark:text-white ml-3 mt-1">NoFuss
        </span></a>

    ${each(navbar_, ({ name, href }) => {
    return `<nav class="pt-6 flex flex-row space-x-6"><a${add_attribute("href", href, 0)} class="dark:text-zinc-300 text-black hover:text-zinc-500 dark:hover:text-zinc-400 hidden sm:block cursor-pointer">${escape(name)}</a>
        </nav>`;
  })}

    <div class="flex items-center justify-center">${validate_component(InputSearch, "InputSearch").$$render($$result, {}, {}, {})}</div>

    <button class="nav-toggle mx-8 my-5 sm:invisible display-none sm:hidden" aria-label="menu button">${validate_component(Menu$1, "Menu").$$render($$result, { class: "w-8 h-8" }, {}, {})}</button></header>

<header class="nav-menu hidden bg-white dark:bg-zinc-900">${each(navbar_, ({ name, href }) => {
    return `<nav class="m-6 flex flex-col space-y-3"><a${add_attribute("href", href, 0)} class="dark:text-zinc-300 text-black hover:text-zinc-500 dark:hover:text-zinc-400 sm:hidden cursor-pointer">${escape(name)}</a>
        </nav>`;
  })}</header>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
${validate_component(MenuRoute, "MenuRoute").$$render($$result, {}, {}, {})}
<main class="m-auto p-6 md:p-8 min-h-screen flex flex-row">${slots.default ? slots.default({}) : ``}
  ${validate_component(ThemeToggle, "ThemeToggle").$$render($$result, {}, {}, {})}</main>`;
});
const ServerConfigObj = map({
  username: "",
  password: "",
  serverUrl: "",
  serverName: "",
  serverType: "subsonic",
  serverVersion: "1.0.0"
});
const ServerConfigPersistent = persistentMap("settings:", {});
export {
  Icon$1 as I,
  Layout as L,
  ServerConfigPersistent as S,
  ServerConfigObj as a
};
