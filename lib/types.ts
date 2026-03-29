export interface Service {
  id: string
  title: string
  description: string | null
  price: string | null
  category: string | null
  display_order: number
  active: boolean
}

export interface Testimonial {
  id: string
  name: string
  location: string | null
  rating: number
  text: string
  service: string | null
  active: boolean
  created_at: string
}

export interface GalleryItem {
  id: string
  image_url: string
  alt: string | null
  category: string | null
  display_order: number
  active: boolean
}

export interface ContactInfo {
  phone: string
  email: string
  address: string
  hours: string
  instagram: string
}

export interface HeroData {
  title: string
  subtitle: string
  description: string
  cta: string
  image: string
}

export interface AboutData {
  title: string
  subtitle: string
  description: string
  values: string[]
  image: string
  years: string
  clients: string
}

export interface SiteSettings {
  notificationEmail: string
}
