import Header from "@/components/admin-ui/header";
import ProductTable from "@/components/admin-ui/product-table";
import Sidebar from "@/components/admin-ui/sidebar";
import { getProducts } from "@/lib/db";
import InventoryWidget from "../../components/admin-ui/dashboard-widget";
import SearchWidget from "../../components/admin-ui/search-widget";

export default async function Home(params: PageProps<"/">) {
  const { total } = await getProducts(1, 6);

  return (
    <main className="flex flex-row min-h-screen">
      <Sidebar />

      <section className="flex flex-col w-full gap-4 bg-gray-100">
        <Header />
        <div className="pr-4 pl-4 pb-4 flex flex-col gap-4">
          <InventoryWidget />
          <SearchWidget />
          <ProductTable searchParams={params.searchParams} total={total} />
        </div>
      </section>

      {/* <h1>Products</h1>
      <div>{products.map((product) => <h2 key={product.id}>{product.title} - {product.category?.name}</h2>)}</div> */}
    </main>
  );
}
