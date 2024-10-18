<script setup lang="ts">
import { Amplify } from "aws-amplify";
import outputs from "./amplify_outputs.json";

Amplify.configure(outputs);

const { FetchCategories } = useCategoriesStore()
await FetchCategories()
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NuxtLoadingIndicator class="bg-primary" />

    <TheHeader />

    <div class="flex-1 bg-slate-50">
      <NuxtPage />
    </div>
    
    <TheFooter />
    
    <UNotifications color="rose" />
  </div>
</template>
