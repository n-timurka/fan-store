<template>
    <main class="min-h-[60vh] mx-4 my-8 md:auto flex justify-center items-center">
        <div class="md:flex space-x-8 w-[42rem]">
            <div class="text-center">
                <UIcon name="i-heroicons-exclamation-circle-20-solid" class="w-32 h-32 text-rose-600" />
            </div>
            
            <div>
                <h1 class="header-1">Payment Canceled!</h1>
                <p>Your payment was not completed, and your order has been canceled. If you wish to try again, please return to the cart and proceed with checkout. For any issues or assistance, don’t hesitate to reach out to our support team.</p>
                <UButton color="rose" icon="i-heroicons-arrow-left-20-solid" class="mt-8" :to="{ name: 'checkout' }">
                    Back to checkout
                </UButton>
            </div>
        </div>
    </main>
</template>
