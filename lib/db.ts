import { createClient } from '@supabase/supabase-js'
import type { Service, Testimonial, GalleryItem, HeroData, AboutData, ContactInfo, SiteSettings } from './types'

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

const DEFAULT_HERO: HeroData = {
  title: "L'Art du Geste",
  subtitle: 'Salon de manucure d\'exception à Paris',
  description: 'Chaque détail compte. Chaque soin est une œuvre.',
  cta: 'Prendre rendez-vous',
  image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&q=80',
}

const DEFAULT_ABOUT: AboutData = {
  title: "L'Atelier",
  subtitle: 'Un espace pensé pour vous',
  description: 'Nail Paris est un salon de manucure haut de gamme niché au cœur de Paris.',
  values: ['Matériaux premium certifiés', 'Techniciens formés aux dernières tendances', 'Hygiène irréprochable', 'Personnalisation totale'],
  image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&q=80',
  years: '8',
  clients: '2 000+',
}

const DEFAULT_CONTACT_INFO: ContactInfo = {
  phone: '+33 1 23 45 67 89',
  email: 'contact@nail-paris.fr',
  address: '12 Rue du Faubourg Saint-Honoré, 75008 Paris',
  hours: 'Lun–Sam : 10h–19h30',
  instagram: '@nail.paris',
}

export async function getHeroData(): Promise<HeroData> {
  const sb = getServiceClient()
  if (!sb) return DEFAULT_HERO
  const { data } = await sb.from('site_content').select('data').eq('section', 'hero').single()
  return (data?.data as HeroData) ?? DEFAULT_HERO
}

export async function getAboutData(): Promise<AboutData> {
  const sb = getServiceClient()
  if (!sb) return DEFAULT_ABOUT
  const { data } = await sb.from('site_content').select('data').eq('section', 'about').single()
  return (data?.data as AboutData) ?? DEFAULT_ABOUT
}

export async function getContactInfo(): Promise<ContactInfo> {
  const sb = getServiceClient()
  if (!sb) return DEFAULT_CONTACT_INFO
  const { data } = await sb.from('site_content').select('data').eq('section', 'contact_info').single()
  return (data?.data as ContactInfo) ?? DEFAULT_CONTACT_INFO
}

export async function getServices(): Promise<Service[]> {
  const sb = getServiceClient()
  if (!sb) return []
  const { data } = await sb.from('services').select('*').eq('active', true).order('display_order')
  return (data as Service[]) ?? []
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const sb = getServiceClient()
  if (!sb) return []
  const { data } = await sb.from('testimonials').select('*').eq('active', true).order('created_at')
  return (data as Testimonial[]) ?? []
}

export async function getGallery(): Promise<GalleryItem[]> {
  const sb = getServiceClient()
  if (!sb) return []
  const { data } = await sb.from('gallery').select('*').eq('active', true).order('display_order')
  return (data as GalleryItem[]) ?? []
}

export async function getSettings(): Promise<SiteSettings> {
  const sb = getServiceClient()
  const fallback = { notificationEmail: process.env.CONTACT_EMAIL ?? '' }
  if (!sb) return fallback
  const { data } = await sb.from('site_content').select('data').eq('section', 'settings').single()
  return (data?.data as SiteSettings) ?? fallback
}

export async function adminGetStats() {
  const sb = getServiceClient()
  if (!sb) return { services: 0, testimonials: 0, gallery: 0, unread: 0 }
  const [s, t, g, c] = await Promise.all([
    sb.from('services').select('id', { count: 'exact' }),
    sb.from('testimonials').select('id', { count: 'exact' }),
    sb.from('gallery').select('id', { count: 'exact' }),
    sb.from('contacts').select('id', { count: 'exact' }).eq('read', false),
  ])
  return { services: s.count ?? 0, testimonials: t.count ?? 0, gallery: g.count ?? 0, unread: c.count ?? 0 }
}
