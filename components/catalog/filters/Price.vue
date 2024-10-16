<script setup lang="ts"> 
const props = defineProps<{
    minPrice: number;
    maxPrice: number;
}>();

const min = defineModel<number>('min', { required: true });
const max = defineModel<number>('max', { required: true });
  
// Local state for the slider values
const localRange = ref({
    min: min.value || props.minPrice,
    max: max.value || props.maxPrice,
})
  
// Function to apply the filter
const applyFilter = () => {
    min.value = localRange.value.min;
    max.value = localRange.value.max;
};
</script>

<template>
    <UPopover>
        <UButton color="white" label="Price" trailing-icon="i-heroicons-chevron-down-20-solid" />

        <template #panel>
            <div class="space-y-4 p-4">
                <!-- Slider -->
                <SharedRangeSlider v-model:min="min" v-model:max="max" :min-price="minPrice" :max-price="maxPrice" class="mb-6"/>
    
                <!-- Input fields for manual entry -->
                <div class="flex space-x-4">
                    <UInput
                        v-model="localRange.min"
                        type="number"
                        :min="minPrice"
                        :max="localRange.max - 1"
                        placeholder="Min Price" />
                    <UInput
                        v-model="localRange.max"
                        type="number"
                        :min="localRange.min + 1"
                        :max="maxPrice"
                        placeholder="Max Price" />
                </div>
    
                <!-- Confirm Button -->
                <UButton color="rose" label="Confirm" @click="applyFilter" />
            </div>
        </template>
    </UPopover>
</template>
  