import { createClient } from "@supabase/supabase-js";
import data from "../server/products.json";

// Create client directly — can't import from lib/supabase/admin.ts
// because its "server-only" import throws outside of Next.js.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } },
);

async function seed() {
  console.log("Seeding categories...");
  const { error: catError } = await supabase
    .from("categories")
    .upsert(data.categories, { onConflict: "id" });

  if (catError) {
    console.error("Failed to seed categories:", catError.message);
    process.exit(1);
  }
  console.log(`  ${data.categories.length} categories seeded.`);

  console.log("Seeding products...");
  const products = data.products.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    discount_percentage: p.discountPercentage,
    rating: p.rating,
    stock: p.stock,
    brand: p.brand,
    sku: p.sku,
    weight: p.weight,
    dimensions: p.dimensions,
    warranty_information: p.warrantyInformation,
    shipping_information: p.shippingInformation,
    availability_status: p.availabilityStatus,
    return_policy: p.returnPolicy,
    minimum_order_quantity: p.minimumOrderQuantity,
    thumbnail: p.thumbnail,
    images: p.images || [],
    tags: p.tags || [],
    category_id: p.categoryId,
    created_at: p.meta?.createdAt,
    updated_at: p.meta?.updatedAt,
  }));

  // Insert in batches of 50 to avoid payload limits
  for (let i = 0; i < products.length; i += 50) {
    const batch = products.slice(i, i + 50);
    const { error: prodError } = await supabase
      .from("products")
      .upsert(batch, { onConflict: "id" });

    if (prodError) {
      console.error(`Failed to seed products batch ${i}:`, prodError.message);
      process.exit(1);
    }
  }
  console.log(`  ${products.length} products seeded.`);

  console.log("Seeding reviews...");
  const reviews: {
    product_id: number;
    rating: number;
    comment: string;
    reviewer_name: string;
    reviewer_email: string;
    date: string;
  }[] = [];

  for (const p of data.products) {
    if (p.reviews) {
      for (const r of p.reviews) {
        reviews.push({
          product_id: p.id,
          rating: r.rating,
          comment: r.comment,
          reviewer_name: r.reviewerName,
          reviewer_email: r.reviewerEmail,
          date: r.date,
        });
      }
    }
  }

  // Insert reviews in batches
  for (let i = 0; i < reviews.length; i += 50) {
    const batch = reviews.slice(i, i + 50);
    const { error: revError } = await supabase.from("reviews").insert(batch);

    if (revError) {
      console.error(`Failed to seed reviews batch ${i}:`, revError.message);
      process.exit(1);
    }
  }
  console.log(`  ${reviews.length} reviews seeded.`);

  console.log("Done!");
}

seed();
