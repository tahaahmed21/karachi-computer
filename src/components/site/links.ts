import type { CategoryId } from "@/lib/products";

const dedicated: Partial<Record<CategoryId, string>> = {
  "desktop-computers": "/desktop-computers",
  "gaming-pcs": "/gaming-pcs",
  laptops: "/laptops",
  components: "/components",
  accessories: "/accessories",
};

/** Link props for a category: its own page when one exists, otherwise the filtered shop. */
export function categoryLink(id: CategoryId) {
  const to = dedicated[id];
  return to ? ({ to } as { to: "/laptops" }) : ({ to: "/shop", search: { category: id } } as const);
}
