<script lang="ts">
    export let title: string = '';
    export let subtitle: string = '';

</script>

<li class="py-1 sm:py-2">
    <div class="flex items-center space-x-4">

        <div class="flex-shrink-0 pl-4">
            <slot name="icon" />
        </div>

        <div class="flex-1 min-w-0">
            <p class="text font-medium text-zinc-900 dark:text-white">
                {title}
            </p>
            <p class="text-sm text-zinc-500 truncate dark:text-zinc-400">
                {subtitle}
            </p>
        </div>
        
        <div class="inline-flex items-center text-base font-semibold text-zinc-900 dark:text-white">
            <slot name="action"/>
        </div>
    </div>
</li>