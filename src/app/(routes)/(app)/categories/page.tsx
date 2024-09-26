import { CreateCategoryDrawer } from "@/features/categories/components/create-category-drawer";

export default function CategoriesPage() {
  return (
    <main className="flex h-[calc(100vh-64px)] flex-col gap-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="inline w-fit bg-gradient-to-b from-[#5EA2EF] to-[#0072F5] bg-clip-text text-4xl font-bold tracking-tight text-primary text-transparent lg:text-3xl">
          Categories
        </h1>

        <CreateCategoryDrawer />
      </div>

      {/* <CategoriesCard /> */}
    </main>
  );
}
