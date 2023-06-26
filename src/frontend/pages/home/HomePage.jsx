import { FeaturedCategory, FeaturedProducts, Hero } from "../../components";
import { useProductContext } from "../../context";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedCategory />
      <FeaturedProducts />
    </main>
  );
}
