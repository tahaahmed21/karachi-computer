import type { Category, Product } from "./products";
import { categories as fallbackCategories, products as fallbackProducts } from "./products";
import type { Json } from "@/utils/supabase-types";
import { supabase } from "@/utils/supabase";

export type Catalog = {
  categories: Category[];
  products: Product[];
};

function specsFromJson(value: Json): [string, string][] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((entry): [string, string][] => {
    if (Array.isArray(entry) && typeof entry[0] === "string" && typeof entry[1] === "string") {
      return [[entry[0], entry[1]]];
    }

    return [];
  });
}

export async function fetchCatalog(): Promise<Catalog | null> {
  if (!supabase) return null;

  const [categoryResult, productResult] = await Promise.all([
    supabase.from("categories").select("*").order("sort_order").order("name"),
    supabase.from("products").select("*").eq("is_active", true).order("sort_order").order("name"),
  ]);

  if (categoryResult.error) {
    throw new Error("Could not fetch catalog categories from Supabase", {
      cause: categoryResult.error,
    });
  }
  if (productResult.error) {
    throw new Error("Could not fetch catalog products from Supabase", {
      cause: productResult.error,
    });
  }

  const categoryRows = categoryResult.data;
  const categoryIds = new Set(categoryRows.map((category) => category.id));
  const mappedCategories = categoryRows.map((category): Category => {
    const fallback = fallbackCategories.find((item) => item.id === category.id);
    return {
      id: category.id,
      name: category.name,
      label: category.label,
      image: category.image_url || fallback?.image || fallbackCategories[0]?.image || "",
    };
  });
  const mappedProducts = productResult.data.map((product): Product => {
    if (!categoryIds.has(product.category_id)) {
      throw new Error(
        `Product "${product.id}" references missing category "${product.category_id}"`,
      );
    }

    const fallback = fallbackProducts.find((item) => item.id === product.id);
    const categoryImage =
      mappedCategories.find((category) => category.id === product.category_id)?.image ?? "";

    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category_id,
      price: product.price,
      spec: product.spec,
      description: product.description,
      specs: specsFromJson(product.specs),
      images: product.image_urls.length
        ? product.image_urls
        : (fallback?.images ?? [categoryImage]),
      featured: product.featured,
      deal: product.deal,
    };
  });

  return { categories: mappedCategories, products: mappedProducts };
}
