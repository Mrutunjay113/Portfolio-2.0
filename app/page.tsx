import { PageAnimations } from "@/components/motion/page-animations";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Profile } from "@/components/sections/profile";
import { Stack } from "@/components/sections/stack";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <main id="top" className="px-(--pad)">
      <PageAnimations />
      <Hero />
      <Profile />
      <Experience />
      <Work />
      <Stack />
      <Education />
      <Contact />
    </main>
  );
}
