const PRODUCTS_API = "https://dummyjson.com/products";
export const PRODUCTS_PER_PAGE = 12;

export function normalizeProduct(product) {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    category: product.category,
    rating: Math.max(1, Math.min(5, Math.round(product.rating || 4))),
    description: product.description,
    image: product.thumbnail || product.images?.[0] || "/images/sunglasses.svg",
  };
}

export async function getFeaturedProducts(limit = 8) {
  const response = await fetch(
    `${PRODUCTS_API}?limit=0&select=id,title,price,category,rating,description,thumbnail,images`
  );
  if (!response.ok) {
    const error = new Error("Could not load featured products.");
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  const products = (data.products || [])
    .filter((product) => Number.isFinite(product.rating))
    .sort((first, second) => second.rating - first.rating);

  const featured = [];
  const categories = new Set();

  for (const product of products) {
    if (!categories.has(product.category)) {
      featured.push(product);
      categories.add(product.category);
    }
    if (featured.length === limit) break;
  }

  if (featured.length < limit) {
    for (const product of products) {
      if (!featured.some((item) => item.id === product.id)) {
        featured.push(product);
      }
      if (featured.length === limit) break;
    }
  }

  return featured.map(normalizeProduct);
}

export function getProductPageUrl({ category, query, skip = 0 }) {
  const params = new URLSearchParams({
    limit: String(PRODUCTS_PER_PAGE),
    skip: String(skip),
  });

  if (query) {
    const searchParams = new URLSearchParams({
      q: query,
      limit: "0",
    });
    return `${PRODUCTS_API}/search?${searchParams.toString()}`;
  }

  if (category) {
    return `${PRODUCTS_API}/category/${encodeURIComponent(category)}?${params.toString()}`;
  }

  return `${PRODUCTS_API}?${params.toString()}`;
}

export async function getProductCategories() {
  const response = await fetch(`${PRODUCTS_API}/category-list`);
  if (!response.ok) {
    const error = new Error("Could not load product categories.");
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export async function getCategoryImages() {
  const response = await fetch(
    `${PRODUCTS_API}?limit=0&select=category,thumbnail`
  );
  if (!response.ok) {
    const error = new Error("Could not load category images.");
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return (data.products || []).reduce((images, product) => {
    if (product.category && product.thumbnail && !images[product.category]) {
      images[product.category] = product.thumbnail;
    }
    return images;
  }, {});
}

export async function getProduct(id) {
  const response = await fetch(`${PRODUCTS_API}/${encodeURIComponent(id)}`);
  if (!response.ok) {
    const error = new Error("Could not load this product.");
    error.status = response.status;
    throw error;
  }
  return normalizeProduct(await response.json());
}

export async function getRelatedProducts(category, productId) {
  const response = await fetch(
    getProductPageUrl({ category, skip: 0 })
  );
  if (!response.ok) {
    throw new Error("Could not load related products.");
  }

  const data = await response.json();
  return (data.products || [])
    .filter((item) => String(item.id) !== String(productId))
    .slice(0, 4)
    .map(normalizeProduct);
}
