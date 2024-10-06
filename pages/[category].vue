<script setup lang="ts">
const { category } = useRoute().params

useHead({
  title: `${category} - Sports Merchandise | Sports Team Fan Store`,
  meta: [
    { name: 'description', content: `Browse the best ${category} including kits, scarves, and other official sports merchandise.` },
    { property: 'og:title', content: `${category} - Sports Merchandise | Sports Team Fan Store` },
    { property: 'og:description', content: `Check out the latest ${category} from your favorite team. Get the best gear for supporting your club!` },
    // { property: 'og:image', content: `https://your-site.com/images/${category}-og-image.jpg` }, // Use a generic or category-specific image
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${category} - Sports Merchandise | Sports Team Fan Store` },
    { name: 'twitter:description', content: `Shop official ${category} merchandise. Find the best gear to support your favorite teams.` },
    // { name: 'twitter:image', content: `https://your-site.com/images/${category}-twitter-card.jpg` } // Category image
  ]
});
</script>

<template>
    <main>{{ category }}</main>
</template>
