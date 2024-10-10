<template>
  <div class="min-h-screen flex flex-col">
    <NuxtLoadingIndicator class="bg-primary" />

    <TheHeader />

    <div class="flex-1 bg-slate-50">
      <NuxtPage />
    </div>
    
    <TheFooter />
    
    <UNotifications />
  </div>
</template>
