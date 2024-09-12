import { AnimatedHeightLayout } from "@/components/animated-height-layout";
import { AnimatedSharedLayout } from "@/components/animated-shared-layout";

export default function CategoriesPage() {
  return (
    <main className="flex flex-col gap-6 p-6">
      <h1>Categories</h1>

      <AnimatedHeightLayout />

      <AnimatedSharedLayout />
    </main>
  );
}
