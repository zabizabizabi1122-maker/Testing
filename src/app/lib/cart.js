export const CART_STORAGE_KEY = "ecomapp-cart";

export const getCartItems = () => {
  if (typeof window === "undefined") return [];

  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

export const saveCartItems = (items) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const getCartCount = () => {
  const items = getCartItems();
  return items.reduce((sum, item) => sum + (item.quantity || 1), 0);
};

export const getCartTotal = () => {
  const items = getCartItems();
  return items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0);
};

export const updateCartEvent = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cart:update"));
    window.dispatchEvent(new CustomEvent("cart:open"));
  }
};

export const addToCart = (product) => {
  if (typeof window === "undefined") return;

  const current = getCartItems();
  const existingItem = current.find((item) => item.id === product.id);

  const nextCart = existingItem
    ? current.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    : [...current, { ...product, quantity: 1 }];

  saveCartItems(nextCart);
  updateCartEvent();
};

export const removeFromCart = (id) => {
  const nextCart = getCartItems().filter((item) => item.id !== id);
  saveCartItems(nextCart);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cart:update"));
  }
};

export const changeQuantity = (id, change) => {
  const current = getCartItems();
  const nextCart = current
    .map((item) => {
      if (item.id !== id) return item;
      const updatedQty = (item.quantity || 1) + change;
      return updatedQty > 0 ? { ...item, quantity: updatedQty } : null;
    })
    .filter(Boolean);

  saveCartItems(nextCart);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cart:update"));
  }
};

export const clearCart = () => {
  saveCartItems([]);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cart:update"));
  }
};
