<template>
  <div class="min-h-screen flex flex-col">
    <NuxtLoadingIndicator class="bg-rose-600" />

    <TheHeader />

    <div class="flex-1 bg-slate-50">
      <NuxtPage />
    </div>
    
    <TheFooter />
    
    <UNotifications />
  </div>
</template>

<style>
body {
  font-family: Montserrat;
}
</style>
