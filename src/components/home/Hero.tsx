import { heroSlides } from "@/data/heroSlides";
import { HeroSlider } from "./HeroSlider";

export function Hero() {
  return <HeroSlider slides={heroSlides} />;
}
