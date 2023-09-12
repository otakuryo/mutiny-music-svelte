import type { BreadcrumbItem } from "$lib/types/global";
import { writable } from "svelte/store";

const BreadcrumbStoreFunction = () => {
    
    let list: Array<BreadcrumbItem> = [];

    let { subscribe, set, update } = writable(list);
    
    let methods = {
        addItem: (item: BreadcrumbItem) => {
            update((items) => {
                

                if(items.find((i) => i.path == item.path)) {
                    return items;  
                }else {
                    return [...items, item];
                }

            });
            return;
        },
        removeItem: (item: BreadcrumbItem) => {
            update((items) => items.filter((i) => i.path !== item.path));
            return;
        },
        clear: () => {
            set([]);
            return;
        },
        removeLastItem: () => {
            update((items) => items.slice(0, -1));
            return;
        },
        removeFromIndex: (index: number) => {
            update((items) => items.slice(0, index));
            return;
        },
        getLastItem: () => {
            let lastItem = null;

            if (list.length > 0) {
                lastItem = list[list.length - 1];
            }

            return lastItem;
        },
    };

    return {
        subscribe,
        set,
        update,
        ...methods,
    };
}

export default BreadcrumbStoreFunction();