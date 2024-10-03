<script setup lang="ts">
defineProps<{
    product: object;
}>();
</script>

<template>
    <section class="rounded shadow-md p-4">
        <h3>
            <NuxtLink :to="{ name: 'products-slug', params: { slug: product.slug } }">{{ product.name }}</NuxtLink>
        </h3>
    </section>
</template>
