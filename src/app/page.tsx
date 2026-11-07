import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { MotionProvider, ScrollProgress } from "@/components/motion";
import {
  About,
  Blog,
  Contact,
  Footer,
  Journey,
  Projects,
  Skills,
} from "@/components/Sections";

export default function Home() {
  return (
    <MotionProvider>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Journey />
        <Skills />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  );
}
