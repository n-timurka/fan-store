<template>
    <section class="relative bg-cover bg-center h-96 md:h-[80vh] text-white" :style="{ backgroundImage: 'url(/images/hero.webp)' }">
        <div class="absolute inset-0 bg-slate-600/65 flex items-center justify-center">
          <div class="text-center max-w-2xl">
            <!-- Main Heading -->
            <h1 class="text-4xl md:text-6xl font-bold mb-4">
              Gear Up for the Game!
            </h1>

            <!-- Subheading -->
            <p class="text-lg md:text-2xl mb-6">
              Official Merchandise for Your Favorite Team
            </p>

            <!-- Call to Action Button -->
            <UButton :to="{ name: 'categories-slug', params: { slug: 'kits' } }" color="rose" size="xl">Shop Now</UButton>
          </div>
        </div>
      </section>
</template>
