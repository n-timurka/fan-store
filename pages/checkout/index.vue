<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

useHead({
  title: 'Secure Checkout | Sports Team Fan Store',
  meta: [
    { name: 'description', content: 'Complete your purchase securely and quickly. We offer secure payment options and fast shipping.' },
    { property: 'og:title', content: 'Secure Checkout | Sports Team Fan Store' },
    { property: 'og:description', content: 'Complete your purchase securely and quickly. Shop with confidence at our secure online store.' },
    // { property: 'og:image', content: 'https://your-site.com/images/checkout-og-image.jpg' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Secure Checkout | Sports Team Fan Store' },
    { name: 'twitter:description', content: 'Complete your purchase securely and quickly with our trusted payment methods.' },
    // { name: 'twitter:image', content: 'https://your-site.com/images/checkout-twitter-card.jpg' }
  ]
});

const stripe = await useClientStripe()
const cartStore = useCartStore()
const { cart, totalCost } = storeToRefs(cartStore)

const schema = object({
  // Personal
  email: string().email('Invalid email address').required('Email is required'),
  name: string().required('Name is required').min(2, 'Name must be at least 2 characters').max(50, 'Name must be at most 50 characters'),
  phone: string().matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  // Delivery
  country: string().required('Country is required'),
  city: string().required('City is required'),
  street: string().required('Street is required'),
  building: string().required('Building is required'),
  apartment: string().nullable(), // Optional field
  zip: string().matches(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code').required('ZIP code is required'),
})
type Schema = InferType<typeof schema>

const state = reactive({
  name: undefined,
  email: undefined,
  phone: undefined,
  country: undefined,
  city: undefined,
  street: undefined,
  building: undefined,
  appartment: undefined,
  zip: undefined,
})

const isLoading = ref(false)
const error = ref<string|null>(null)
const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  error.value = null
  isLoading.value = true

  try {
    const order = await $fetch<{ sessionId: string }>('/api/checkout', {
      body: {
        products: cart.value,
        data: event.data,
      },
      method: 'POST',
    });

    await stripe.value.redirectToCheckout({ sessionId: order.sessionId })
  } catch (e) {
    console.log(e, typeof e)
    error.value = e as string
  } finally {
    isLoading.value = false
  } 
}
</script>

<template>
    <main class="container mx-auto my-8 px-4 md:px-0">
      <h1 class="text-2xl font-semibold mb-4">Checkout</h1>

      <UAlert v-if="!cart.length" icon="i-heroicons-exclamation-circle-20-solid" title="You have nothing in your cart. Put something there first" />
      <div v-else class="flex justify-between space-x-6">
        <UCard class="flex-1">
          <UForm id="checkout-form" :schema="schema" :state="state" @submit.prevent="onSubmit">
            <div class="flex space-x-8">
              <fieldset class="space-y-4 flex-1">
                <legend class="font-semibold">Personal data</legend>

                <UFormGroup label="Name" name="name" required>
                  <UInput v-model="state.name" autofocus />
                </UFormGroup>

                <UFormGroup label="Email" name="email" required>
                  <UInput v-model="state.email" type="email" />
                </UFormGroup>

                <UFormGroup label="Phone number" name="phone">
                  <UInput v-model="state.phone" type="tel" />
                </UFormGroup>
              </fieldset>

              <fieldset class="space-y-4 flex-1">
                <legend class="font-semibold">Delivery</legend>

                <UFormGroup label="Country" name="country" required>
                  <UInput v-model="state.country" />
                </UFormGroup>
                <UFormGroup label="City" name="city" required>
                  <UInput v-model="state.city" />
                </UFormGroup>
                <UFormGroup label="Street" name="street" required>
                  <UInput v-model="state.street" />
                </UFormGroup>

                <div class="flex space-x-4 justify-between">
                  <UFormGroup label="Building" name="building" required>
                    <UInput v-model="state.building" />
                  </UFormGroup>
                  <UFormGroup label="Appartment" name="appartment">
                    <UInput v-model="state.appartment" />
                  </UFormGroup>
                  <UFormGroup label="Zip code" name="zip" required>
                    <UInput v-model="state.zip" />
                  </UFormGroup>
                </div>
              </fieldset>
            </div>
          </UForm>

          <template #footer>
            <div class="flex justify-end items-center space-x-4">
              <div v-if="error" class="text-sm text-red-600">{{ error }}</div>
              <UButton type="submit" form="checkout-form" :loading="isLoading" color="rose" variant="solid" size="lg">
                Go to Payment
              </UButton>
            </div>
          </template>
        </UCard>

        <div class="basis-1/4">
          <UCard
              class="flex flex-col"
              :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
          >
            <template #header>
              Products
            </template>

            <div class="space-y-4">
              <div v-for="item in cart" :key="item.product.id" class="w-full flex space-x-4">
                <NuxtImg :src="item.product.images[0]" width="128px" height="128px" format="webp" densities="x1" />
                <div class="grow space-y-2 flex flex-col my-4">
                    <div class="grow">
                        <h4 class="font-semibold">{{ item.product.name }}</h4>
                        <div v-if="item.options" class="text-sm">
                            <div v-if="item.options.size">Size: {{ item.options.size }}</div>
                            <div v-if="item.options.color">Color: {{ item.options.color }}</div>
                        </div>
                    </div>
                    
                    <div class="flex justify-between items-center space-x-2 text-lg">
                        <span>&euro;{{ item.product.price }}</span>
                        <div class="flex items-center space-x-2">
                            <small>x{{ item.quantity }}</small>
                        </div>
                        <strong>&euro;{{ item.product.price * item.quantity }}</strong>
                    </div>
                </div>
              </div>
          </div>

            <template #footer>
              <div class="pt-2 flex justify-between">
                <div>Total:</div>
                <div class="font-semibold">&euro;{{ totalCost.toFixed(2) }}</div>
              </div>
            </template>
          </UCard>
        </div>
      </div>
    </main>
</template>
