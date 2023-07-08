import { c as create_ssr_component, v as validate_component } from "../../chunks/index.js";
import { L as Layout } from "../../chunks/ServerConfigStore.js";
import "crypto-js";
import { w as writable } from "../../chunks/index2.js";
const currentPage = writable("home");
const Main = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  currentPage.subscribe((value) => {
  });
  return ``;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Main, "Main").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Page as default
};
