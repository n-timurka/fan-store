<template>
    <footer class="w-full">
      <section class="bg-slate-200">
        <div class="mx-4 md:container md:mx-auto py-4 md:py-8 md:flex md:justify-between">
          <div class="md:basis-1/2 mb-6 md:mb-0 text-pretty">
            <NuxtLink
              to="/"
              class="flex items-center space-x-2 mb-2"
            >
            <UIcon name="i-ph-beach-ball-fill" class="w-8 h-8 text-slate-900" />
              <span class="font-semibold text-xl text-black">FanStore</span>
            </NuxtLink>
            <p class="text-slate-400 text-sm">Specializes in providing high-quality products for you</p>
          </div>

          <nav class="flex-1 grid md:grid-cols-4 grid-cols-2 gap-4">
            <div class="basis-1/2 md:flex-1">
              <h4 class="header-4">Shop</h4>
              <ul class="text-slate-400 text-sm space-y-1">
                <li>
                  <UButton color="gray" :padded="false" variant="link" to="/">Kits</UButton>
                </li>
                <li>
                  <UButton color="gray" :padded="false" variant="link" to="/">Accessories</UButton>
                </li>
                <li>
                  <UButton color="gray" :padded="false" variant="link" to="/">Clothing</UButton>
                </li>
                <li>
                  <UButton color="gray" :padded="false" variant="link" to="/">Equipment</UButton>
                </li>
              </ul>
            </div>
            <div class="flex-1">
              <h4 class="header-4">Company</h4>
              <ul class="text-slate-400 text-sm space-y-1">
                <li>
                  <UButton color="gray" :padded="false" variant="link" to="/">About Us</UButton>
                </li>
                <li>
                  <UButton color="gray" :padded="false" variant="link" to="/">Contact</UButton>
                </li>
                <li>
                  <UButton color="gray" :padded="false" variant="link" to="/">Delivery</UButton>
                </li>
              </ul>
            </div>
            <div class="flex-1">
              <h4 class="header-4">Support</h4>
              <ul class="text-slate-400 text-sm space-y-1">
                <li>
                  <UButton color="gray" :padded="false" variant="link" to="/">FAQs</UButton>
                </li>
                <li>
                  <UButton color="gray" :padded="false" variant="link" to="/">Cookie Policy</UButton>
                </li>
                <li>
                  <UButton color="gray" :padded="false" variant="link" to="/">Terms of Use</UButton>
                </li>
              </ul>
            </div>
            <div class="flex-1">
              <h4 class="header-4">Payment</h4>
              <div class="space-x-4 text-slate-600">
                <UIcon name="i-fa6-brands-cc-visa" class="h-8 w-8" />
                <UIcon name="i-fa6-brands-cc-mastercard" class="h-8 w-8" />
                <UIcon name="i-fa6-brands-cc-paypal" class="h-8 w-8" />
              </div>
            </div>
          </nav>
        </div>
      </section>

      <section class="bg-slate-600 text-slate-50 py-2">
        <div class="container mx-auto md:flex text-center md:justify-between text-sm">
          <p>Copyright &copy; {{ new Date().getFullYear() }} FanStore. All right reserved</p>
          <p>
            Created by
            <a
              class="text-rose-400 hover:text-rose-400/80 transition-colors"
              href="https://www.linkedin.com/in/mykola-timurka/"
              target="_blank"
            >Mykola Timurka</a>
          </p>
        </div>
      </section>
    </footer>
  </template>
