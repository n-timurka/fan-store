import type { Product } from "~/types/product";

type Cart = {
  product: Product;
  quantity: number;
}[];

export const useCartStore = defineStore(
  "cart",
  () => {
    const cart = ref<Cart>([]);

    const addToCart = (product: Product, quantity = 1) => {
      const cartItem = cart.value.find(
        (item) => item.product.id === product.id
      );

      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        cart.value.push({ product, quantity });
      }
    };
    const removeFromCart = (product: Product, quantity = 1) => {
      const cartItem = cart.value.find(
        (item) => item.product.id === product.id
      );
      if (!cartItem) return;

      if (cartItem.quantity > 1) {
        cartItem.quantity -= quantity;
      } else {
        cart.value = cart.value.filter(
          (item) => item.product.id !== product.id
        );
      }
    };

    const productsNumber = computed(() =>
      cart.value.reduce((total, item) => (total += item.quantity), 0)
    );
    const totalCost = computed(() =>
      cart.value
        .reduce(
          (total, item) => (total += item.quantity * item.product.price),
          0
        )
        .toFixed(2)
    );

    const isProductInCart = (productId: number) =>
      cart.value.some((item) => item.product.id === productId);

    return {
      cart,
      addToCart,
      removeFromCart,
      isProductInCart,
      productsNumber,
      totalCost,
    };
  },
  { persist: true }
);
