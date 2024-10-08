import type { Cart } from "~/types/cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cart = ref<Cart[]>([]);

    const addToCart = (data: Cart) => {
      const cartItem = cart.value.find(
        (item) =>
          item.product.id === data.product.id &&
          item.options?.size === data.options?.size &&
          item.options?.color === data.options?.color
      );

      if (cartItem) {
        cartItem.quantity += data.quantity;
      } else {
        cart.value.push(data);
      }
    };
    const removeFromCart = (data: Cart) => {
      const cartItem = cart.value.find(
        (item) =>
          item.product.id === data.product.id &&
          item.options?.size === data.options?.size &&
          item.options?.color === data.options?.color
      );
      if (!cartItem) return;

      if (cartItem.quantity > 1) {
        cartItem.quantity -= data.quantity;
      } else {
        cart.value = cart.value.filter(
          (item) => item.product.id !== data.product.id
        );
      }
    };

    const productsNumber = computed(() =>
      cart.value.reduce((total, item) => (total += item.quantity), 0)
    );
    const totalCost = computed(() =>
      cart.value.reduce(
        (total, item) => (total += item.quantity * item.product.price),
        0
      )
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
