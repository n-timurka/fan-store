<script setup lang="ts"> 
// Define props for minPrice, maxPrice, and v-model values for min/max
const props = defineProps<{
    minPrice: number;
    maxPrice: number;
}>();

const min = defineModel<number>('min', { required: true });
const max = defineModel<number>('max', { required: true });
  
// Local state for the slider values
const localMinPrice = ref(min.value);
const localMaxPrice = ref(max.value);
  
// Watch for external changes to min/max values
watch(
    () => [min.value, max.value],
    () => {
        localMinPrice.value = min.value;
        localMaxPrice.value = max.value;
    },
);
  
// Function to ensure proper min/max bounds
const checkMin = () => {
    if (localMinPrice.value >= localMaxPrice.value) {
      localMinPrice.value = localMaxPrice.value - 1;
    }

    min.value = localMinPrice.value;
    max.value = localMaxPrice.value;
};

const checkMax = () => {
    if (localMaxPrice.value <= localMinPrice.value) {
      localMaxPrice.value = localMinPrice.value + 1;
    }
    
    min.value = localMinPrice.value;
    max.value = localMaxPrice.value;
};
  
// Style the range track based on min/max values
const rangeStyle = computed(() => {
    const minPercent = ((localMinPrice.value - props.minPrice) / (props.maxPrice - props.minPrice)) * 100;
    const maxPercent = ((localMaxPrice.value - props.minPrice) / (props.maxPrice - props.minPrice)) * 100;
    return `left: ${minPercent}%; right: ${100 - maxPercent}%`;
});
</script>

<template>
    <div class="slider-container my-4 relative">
      <input
        v-model="localMinPrice"
        type="range"
        :min="minPrice"
        :max="maxPrice"
        class="slider-range"
        @input="checkMin"
      >
      <input
        v-model="localMaxPrice"
        type="range"
        :min="minPrice"
        :max="maxPrice"
        class="slider-range"
        @input="checkMax"
      >
      <div class="track"/>
      <div class="range-track" :style="rangeStyle"/>
    </div>
</template>
  
<style scoped>
  .slider-container {
    position: relative;
    height: 10px;
  }
  
  .slider-range {
    position: absolute;
    width: 100%;
    height: 10px;
    background: transparent;
    -webkit-appearance: none;
  }
  
  .slider-range::-webkit-slider-thumb {
    width: 20px;
    height: 20px;
    background: #e11d48;
    border-radius: 50%;
    -webkit-appearance: none;
    cursor: pointer;
  }
  
  .track {
    position: absolute;
    width: 100%;
    height: 10px;
    background-color: #ddd;
    border-radius: 5px;
    z-index: 1;
  }
  
  .range-track {
    position: absolute;
    height: 10px;
    background-color: #e11d48;
    border-radius: 5px;
    z-index: 2;
  }
</style>
  