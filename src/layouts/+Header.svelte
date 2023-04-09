<script>
    import "../app.css";
    // @ts-ignore
    import { page } from '$app/stores';
  
    let title = "Mutiny Music on SvelteKit",
    description = "Web client for subsonic api.",
    imageAlt = "Music icon",
    heroImage = "/banner.png",
    canonicalURL = $page.url.href,
    contentLanguage = "es-ES";
    
</script>
  
<svelte:head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="Content-Language" content={contentLanguage} />
    <title>{title}</title>
    <link rel="sitemap" href="/sitemap-index.xml" />
    <link rel="canonical" href={canonicalURL} />
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={heroImage} />
    <meta property="og:image:alt" content={imageAlt} />
    <meta property="og:site_name" content="NoFuss Astro" />
    <meta property="og:locale" content="en_US" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={canonicalURL} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={heroImage} />
    <meta name="robots" content="follow, index" />
    <meta name="author" content="Lance Ross" />

    <!-- <script src="/js/theme-settings.js"></script> -->

</svelte:head>