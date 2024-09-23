import { AnimatedHeightLayout } from "@/components/animated-height-layout";
import { AnimatedSharedLayout } from "@/components/animated-shared-layout";

export default function ReportsPage() {
  return (
    <main className="h-screen p-6">
      <h1>Reports</h1>

      <AnimatedSharedLayout />

      <AnimatedHeightLayout />
    </main>
  );
}
