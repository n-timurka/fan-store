<template>
    <UCard>
        <template #header>
            <USkeleton class="h-6 w-[250px]" />
        </template>

        <section class="space-y-4">
            <USkeleton class="h-[318px] w-[318px]" />

            <div class="flex justify-between items-center space-x-4">
                <div class="flex space-x-2">
                    <USkeleton class="h-8 w-10 rounded" />
                    <USkeleton class="h-8 w-10 rounded" />
                    <USkeleton class="h-8 w-10 rounded" />
                </div>
        
                <div class="flex space-x-2">
                    <USkeleton class="h-8 w-8 rounded-full" />
                    <USkeleton class="h-8 w-8 rounded-full" />
                    <USkeleton class="h-8 w-8 rounded-full" />
                </div>
            </div>

            <USkeleton class="h-5 w-[150px]" />
        </section>

        <template #footer>
            <div class="flex justify-between items-center">
                <USkeleton class="h-6 w-[60px]" />
                <USkeleton class="h-10 w-28" />
            </div>
        </template>
    </UCard>
</template>