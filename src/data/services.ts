/** services.ts: All services grouped under Skin, Hair, Laser. */

export type ServiceCategory = "skin" | "hair" | "laser";

export interface Service {
  slug: string;
  title: string;
  category: ServiceCategory;
  shortDescription: string;
  icon: string; // lucide-react icon name
  imageUrl?: string;
  whatItIs: string;
  whoItSuits: string;
  whatToExpect: string;
  placeholder: boolean;
}

export const serviceCategories: {
  id: ServiceCategory;
  label: string;
  description: string;
}[] = [
  {
    id: "skin",
    label: "Skin",
    description:
      "Comprehensive care for acne, pigmentation, ageing concerns and paediatric skin conditions.",
  },
  {
    id: "hair",
    label: "Hair",
    description:
      "Care for hair fall and scalp health.",
  },
  {
    id: "laser",
    label: "Laser",
    description:
      "Energy-based treatments for skin rejuvenation, pigmentation and cosmetic concerns.",
  },
];

export const services: Service[] = [
  {
    slug: "acne-treatment",
    title: "Acne Treatment",
    category: "skin",
    shortDescription:
      "Personalised treatment plans for acne, including topical therapy, oral medication and procedural options.",
    icon: "ScanFace",
    imageUrl: "/images/consultation-square.jpg",
    whatItIs:
      "Acne treatment at our clinic involves a thorough assessment of your skin type, acne severity and contributing factors. We create a personalised plan that may include topical treatments, oral medications, chemical peels or light-based therapies.",
    whoItSuits:
      "Suitable for teenagers and adults experiencing acne breakouts, whether mild, moderate or severe. Also helpful for those with acne scarring concerns.",
    whatToExpect:
      "Your first visit includes a detailed skin analysis and discussion of your medical history. A treatment plan is tailored to your needs, and follow-up appointments are scheduled to monitor progress and adjust care.",
    placeholder: false,
  },
  {
    slug: "pigmentation-chemical-peels",
    title: "Pigmentation & Chemical Peels",
    category: "skin",
    shortDescription:
      "Targeted care for dark spots, melasma, uneven tone and sun damage using dermatologist-supervised peels and topical protocols.",
    icon: "Sun",
    imageUrl: "/images/treatment-room.jpg",
    whatItIs:
      "We address pigmentation concerns such as melasma, post-inflammatory hyperpigmentation and sun damage through a combination of topical treatments, chemical peels and sun-protection guidance.",
    whoItSuits:
      "Individuals with uneven skin tone, dark patches, sun spots or post-acne marks looking for a structured, dermatologist-supervised approach.",
    whatToExpect:
      "After a skin assessment, we recommend a combination of in-clinic peels and a home-care regimen. Peels are typically comfortable procedures with minimal downtime. Multiple sessions may be advised depending on your concerns.",
    placeholder: false,
  },
  // TODO: confirm how this differs from anti-ageing care, or combine the two.
  {
    slug: "cosmetic-aesthetic-dermatology",
    title: "Cosmetic & Aesthetic Dermatology",
    category: "skin",
    shortDescription:
      "Non-surgical aesthetic treatments for skin rejuvenation, fine lines and overall skin health improvement.",
    icon: "Droplets",
    imageUrl: "/images/reception-square.jpg",
    whatItIs:
      "Our cosmetic dermatology services encompass a range of non-surgical treatments designed to enhance skin texture, tone and overall appearance. Each treatment plan is customised to your skin goals.",
    whoItSuits:
      "Adults looking to address early signs of ageing, dull skin, fine lines or those who wish to maintain healthy, refreshed skin.",
    whatToExpect:
      "A consultation to discuss your concerns and goals, followed by a personalised treatment recommendation. Procedures are typically performed in-clinic with minimal to no downtime.",
    placeholder: false,
  },
  {
    slug: "pediatric-skin-care",
    title: "Paediatric Skin Care",
    category: "skin",
    shortDescription:
      "Gentle, expert dermatological care for infants, children and adolescents with skin concerns.",
    icon: "Baby",
    imageUrl: "/images/consultation-square.jpg",
    whatItIs:
      "Paediatric dermatology focuses on skin conditions specific to children, including eczema, birthmarks, rashes, infections and allergies. We use gentle, age-appropriate treatments.",
    whoItSuits:
      "Infants, toddlers, children and adolescents with any skin-related concern. Parents seeking a dermatologist experienced in paediatric skin care.",
    whatToExpect:
      "A child-friendly consultation where we take time to explain the condition and treatment to both parent and child. Treatment plans are designed for safety and comfort.",
    placeholder: false,
  },
  {
    slug: "dermatosurgery",
    title: "Dermatosurgery",
    category: "skin",
    shortDescription:
      "Minor surgical procedures for mole removal, cyst excision, skin tags and other dermatological conditions.",
    icon: "Scissors",
    imageUrl: "/images/treatment-room.jpg",
    whatItIs:
      "Dermatosurgery includes minor in-clinic surgical procedures such as mole removal, cyst excision, skin biopsy, wart treatment and management of other benign skin growths.",
    whoItSuits:
      "Patients with skin growths, moles, cysts, or other conditions that may benefit from a minor surgical approach under dermatological supervision.",
    whatToExpect:
      "A clinical assessment is performed first. Procedures are conducted under local anaesthesia in our clinic, with post-procedure care instructions provided. Follow-up is scheduled as needed.",
    placeholder: false,
  },
  // TODO: confirm how this differs from cosmetic and aesthetic dermatology.
  {
    slug: "anti-aging",
    title: "Anti-Ageing",
    category: "skin",
    shortDescription:
      "Focused treatments for fine lines, wrinkles, loss of elasticity and age-related skin changes.",
    icon: "Clock",
    imageUrl: "/images/reception-square.jpg",
    whatItIs:
      "Our anti-ageing treatments address visible signs of ageing with a considered approach including topical treatments, in-clinic procedures and preventive skin-care guidance.",
    whoItSuits:
      "Adults noticing early or established signs of skin ageing, or those interested in preventive skin-care strategies.",
    whatToExpect:
      "A thorough skin assessment followed by a personalised plan that may combine in-clinic treatments with a home-care regimen. Change is gradual and focused on natural-looking outcomes.",
    placeholder: false,
  },

  // TODO: confirm how hair fall and scalp care differs from non-surgical hair loss care.
  {
    slug: "hair-fall-scalp-care",
    title: "Hair Fall & Scalp Care",
    category: "hair",
    shortDescription:
      "Comprehensive evaluation and treatment of hair loss, thinning and scalp conditions.",
    icon: "Microscope",
    imageUrl: "/images/treatment-room.jpg",
    whatItIs:
      "We diagnose and treat various types of hair loss and scalp conditions including androgenetic alopecia, telogen effluvium, dandruff and scalp dermatitis using a combination of medical therapy and procedural treatments.",
    whoItSuits:
      "Men and women experiencing hair thinning, excessive hair shedding, or scalp issues such as itching, flaking or irritation.",
    whatToExpect:
      "A detailed scalp examination, possibly aided by trichoscopy, followed by a personalised treatment plan. Regular follow-ups help monitor progress and adjust therapy.",
    placeholder: false,
  },
  {
    slug: "non-surgical-hair-loss-care",
    title: "Non-Surgical Hair Loss Care",
    category: "hair",
    shortDescription:
      "Non-surgical options to support hair density without invasive procedures.",
    icon: "Leaf",
    imageUrl: "/images/consultation-square.jpg",
    whatItIs:
      "Non-surgical hair loss care includes treatments such as PRP therapy, mesotherapy and medically supervised topical and oral regimens designed to support hair growth and improve density.",
    whoItSuits:
      "Individuals with early to moderate hair loss who prefer non-invasive approaches, or those looking to complement other treatments.",
    whatToExpect:
      "After an initial assessment, a treatment plan is proposed. In-clinic sessions are typically comfortable and require minimal downtime. Ongoing follow-up is recommended to track improvement.",
    placeholder: false,
  },

  {
    slug: "laser-treatments",
    title: "Laser Treatments",
    category: "laser",
    shortDescription:
      "Energy-based laser therapies for pigmentation, hair reduction, scar management and skin rejuvenation.",
    icon: "Zap",
    imageUrl: "/images/laser-suite.jpg",
    whatItIs:
      "We offer a range of laser treatments using energy-based devices for concerns including pigmentation, unwanted hair, acne scars, skin tightening and overall skin rejuvenation.",
    whoItSuits:
      "Individuals seeking targeted treatment for specific skin concerns where laser therapy is considered a suitable option by the dermatologist.",
    whatToExpect:
      "A pre-treatment consultation to determine candidacy, discuss expectations and plan the procedure. Laser sessions vary in duration and number depending on the concern. Post-procedure care guidelines are provided.",
    placeholder: false,
  },
];

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((s) => s.category === category);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
