import type { CartItem } from "~/types/cartItem";
import type { Product } from "~/types/product";

export const useCartStore = defineStore("cartStore", () => {
  const cart = ref<CartItem[]>([]);
  const isLoading = ref(false);

  watch(
    cart,
    () => {
      const data = cart.value.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        options: item.options,
      }));

      localStorage.setItem("cart", JSON.stringify(data));
    },
    { deep: true }
  );

  const initCart = async () => {
    if (!import.meta.client) return;

    const storedCart = localStorage.getItem("cart");
    if (!storedCart) return;

    const data: {
      productId: number;
      quantity: number;
      options?: Record<string, string>;
    }[] = JSON.parse(storedCart);
    const productIds = [...new Set(data.map((item) => item.productId))];

    if (!productIds.length) return;

    try {
      isLoading.value = true;
      const products = await $fetch<Product[]>("/api/cart", {
        query: { ids: productIds },
      });
      cart.value = data
        .map((item) => {
          const product = products.find(
            (product) => product.id === item.productId
          );
          if (!product) return;

          return {
            quantity: item.quantity,
            options: item.options,
            product,
          };
        })
        .filter((item) => item !== undefined);
    } finally {
      isLoading.value = false;
    }
  };

  const addToCart = (data: CartItem) => {
    const cartItem = cart.value.find(
      (item) =>
        item.product.id === data.product.id &&
        JSON.stringify(item.options) === JSON.stringify(data.options)
    );

    if (cartItem) {
      cartItem.quantity += data.quantity;
    } else {
      cart.value = [...cart.value, data];
    }
  };

  const removeFromCart = (data: CartItem) => {
    const cartItem = cart.value.find(
      (item) =>
        item.product.id === data.product.id &&
        JSON.stringify(item.options) === JSON.stringify(data.options)
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

  const clearCart = () => {
    cart.value = [];
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

  const productItemsNumber = (productId: number) =>
    cart.value.filter((item) => item.product.id === productId).length;
  const isProductInCart = (productId: number) =>
    productItemsNumber(productId) > 0;

  return {
    cart,
    isLoading,
    initCart,
    addToCart,
    removeFromCart,
    isProductInCart,
    clearCart,
    productItemsNumber,
    productsNumber,
    totalCost,
  };
});
