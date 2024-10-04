<script setup lang="ts">
const { locale } = useI18n()
</script>

<template>
    <header class="w-full bg-rose-600 text-rose-50">
      <div class="container py-4 px-4 md:px-0 md:mx-auto flex justify-between items-center">
        <NuxtLink
          to="/"
          class="font-semibold text-xl text-white hover:text-rose-100"
        >
          FanStore
        </NuxtLink>

        <div class="flex space-x-4 items-center">
          <UAvatar :icon="locale === 'en' ? 'i-flag-us-4x3' : 'i-flag-es-4x3'" />

          <UButton color="pink" variant="soft" size="lg">
            {{  $t('card') }}
          </UButton>
        </div>
      </div>
    </header>
</template>
