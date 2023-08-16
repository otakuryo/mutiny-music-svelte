<script>
    export let title = '';
    export let customClass = '';
</script>

<div class="marquee">
    <div class="{customClass} text-bg-player-light-text dark:text-cover-dark-text marquee__content" class:marquee__animation={title.length > 30}>{title}</div>
    <div class="{customClass} text-bg-player-light-text dark:text-cover-dark-text marquee__content" class:marquee__animation={title.length > 30} aria-hidden="true">{title}</div>
</div>