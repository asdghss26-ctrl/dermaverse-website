/** gallery.ts — Clinic photo placeholders. Replace with actual images. */

export interface GalleryItem {
  id: string;
  caption: string;
  alt: string;
  imageUrl: string | null; // TODO: replace with actual photos
  placeholder: true;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "reception",
    caption: "Reception area with curved white desk",
    alt: "Clinic reception area",
    imageUrl: null,
    placeholder: true,
  },
  {
    id: "waiting",
    caption: "Comfortable waiting lounge with emerald velvet sofas",
    alt: "Clinic waiting area",
    imageUrl: null,
    placeholder: true,
  },
  {
    id: "consultation",
    caption: "Private consultation room",
    alt: "Consultation room",
    imageUrl: null,
    placeholder: true,
  },
  {
    id: "treatment",
    caption: "Treatment room with modern equipment",
    alt: "Treatment room",
    imageUrl: null,
    placeholder: true,
  },
  {
    id: "exterior",
    caption: "Clinic entrance with watercolor floral signboard",
    alt: "Clinic exterior",
    imageUrl: null,
    placeholder: true,
  },
  {
    id: "laser-room",
    caption: "Laser treatment suite",
    alt: "Laser treatment room",
    imageUrl: null,
    placeholder: true,
  },
];
