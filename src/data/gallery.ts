/** gallery.ts: Clinic photo placeholders. Replace with actual images. */

export interface GalleryItem {
  id: string;
  caption: string;
  alt: string;
  imageUrl: string;
  placeholder: boolean;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "reception",
    caption: "Reception area",
    alt: "Warm minimalist clinic reception counter with arched architecture",
    imageUrl: "/images/reception-square.jpg",
    placeholder: false,
  },

  {
    id: "consultation",
    caption: "Private consultation room",
    alt: "Serene private consultation desk and patient chairs",
    imageUrl: "/images/consultation-square.jpg",
    placeholder: false,
  },
  {
    id: "treatment",
    caption: "Treatment room",
    alt: "Clinical procedure bed and soothing natural light",
    imageUrl: "/images/treatment-room.jpg",
    placeholder: false,
  },
  {
    id: "exterior",
    caption: "Clinic entrance & foyer",
    alt: "Arched foyer and clinic entrance",
    imageUrl: "/images/clinic-entrance.jpg",
    placeholder: false,
  },
  {
    id: "laser-room",
    caption: "Laser treatment suite",
    alt: "Modern aesthetic laser treatment equipment and procedure setup",
    imageUrl: "/images/laser-suite.jpg",
    placeholder: false,
  },
];
