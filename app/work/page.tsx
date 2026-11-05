import type { Metadata } from "next";
import { PageAnimations } from "@/components/motion/page-animations";
import { WorkArchive } from "@/components/work/work-archive";

export const metadata: Metadata = {
  title: "Work — Mrutunjay Yadav",
  description:
    "Client analytics platforms, products, and side projects by Mrutunjay Yadav — MERN stack developer in Mumbai.",
};

export default function WorkPage() {
  return (
    <main id="top" className="px-(--pad)">
      <PageAnimations />
      <WorkArchive />
    </main>
  );
}
