<script setup lang="ts">
const modelValue = defineModel<number>({ required: true })

const decreaseQuantity = () => {
    if (modelValue.value < 2) return

    modelValue.value--
}
</script>

<template>
    <UInput
        v-model="modelValue"
        :ui="{ icon: { trailing: { pointer: '' }, leading: { pointer: '' } } }"
        minlength="1"
        color="rose"
        autocomplete="off">
        <template #leading>
            <UButton color="rose" variant="ghost" icon="i-heroicons-minus-20-solid" :disabled="modelValue < 2" :padded="false" @click="decreaseQuantity" />
        </template>
        <template #trailing>
            <UButton color="rose" variant="link" icon="i-heroicons-plus-20-solid" :padded="false" @click="modelValue++" />
        </template>
    </UInput>
  </template>
