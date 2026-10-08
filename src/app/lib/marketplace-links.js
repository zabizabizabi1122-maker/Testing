export function getMarketplaceSearchLinks(productTitle) {
  const query = encodeURIComponent(productTitle);
  return [
    {
      name: "Daraz",
      href: `https://www.daraz.pk/catalog/?q=${query}`,
    },
    {
      name: "Amazon",
      href: `https://www.amazon.com/s?k=${query}`,
    },
  ];
}
