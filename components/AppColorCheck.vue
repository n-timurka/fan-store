<script setup lang="ts">
const modelValue = defineModel<string>()

const props = defineProps<{
    options: string[],
}>()

const colors: Record<string,string> = {
    "Red": "#dc2626",
    "White": "#f8fafc",
    "Black": "#000000",
    "Blue": "#2563eb",
    "Green": "#16a34a",
    "Gray": "#9ca3af",
}

const optionsList = computed(() => props.options.map(option => ({
    value: option,
    label: colors[option],
})))
</script>

<template>
    <div class="flex space-x-1 items-center">
        <URadio v-for="color of optionsList" :key="color.value" v-model="modelValue" :value="color.value" :ui="{ container: 'hidden' }">
            <template #label>
                <span
                    class="ring-2 ring-offset-2 h-6 w-6 rounded-full inline-flex cursor-pointer border-1"
                    :class="[color.value === modelValue ? 'ring-rose-600' : 'ring-transparent' ]"
                    :style="{ backgroundColor: color.label }" />
            </template>
        </URadio>
    </div>
    <!-- <URadioGroup v-model="modelValue" :options="optionsList" :ui="{ container: 'hidden', fieldset: 'flex space-x-2 items-center' }">
        <template #label="{ option }">
            <span
                class="ring-2 ring-offset-2 h-5 w-5 rounded-full inline-flex cursor-pointer"
                :class="[option.selected ? 'ring-rose-600' : 'ring-transparent' ]"
                :style="{ backgroundColor: option.label }" />
        </template>
    </URadioGroup> -->
</template>
