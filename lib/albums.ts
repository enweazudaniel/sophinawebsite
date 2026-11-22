// The photo albums of the website. The bot (/albums) and the pages use the same names.
export const ALBUMS: { slug: string; label: string }[] = [
  { slug: "home-hero", label: "Home page slideshow" },
  { slug: "colour-day", label: "Colour Day" },
  { slug: "graduation", label: "Graduation" },
  { slug: "sports", label: "Sports" },
  { slug: "end-of-year-party", label: "End of year Party" },
  { slug: "science-and-art-club", label: "Science and Art Club" },
  { slug: "computer-lab", label: "Computer Lab" },
  { slug: "ss-3", label: "SS 3" },
  { slug: "ss-2", label: "SS 2" },
  { slug: "ss-1", label: "SS 1" },
  { slug: "jss-3", label: "JSS 3" },
  { slug: "jss-2", label: "JSS 2" },
  { slug: "jss-1", label: "JSS 1" },
  { slug: "basic-5", label: "Basic 5" },
  { slug: "basic-4", label: "Basic 4" },
  { slug: "basic-3", label: "Basic 3" },
  { slug: "basic-2", label: "Basic 2" },
  { slug: "basic-1", label: "Basic 1" },
  { slug: "nursery-3", label: "Nursery 3" },
  { slug: "nursery-2", label: "Nursery 2" },
  { slug: "nursery-1", label: "Nursery 1" },
  { slug: "pre-nursery", label: "Pre-Nursery" },
  { slug: "creche", label: "Creche" },
]

export const slugOf = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
