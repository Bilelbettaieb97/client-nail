import { z } from 'zod'
import { getSettings } from '@/lib/db'

export const dynamic = 'force-dynamic'

const schema = z.object({
  name: z.string().min(2, 'Minimum 2 caractères').max(100),
  email: z.string().email('Email invalide'),
  phone: z.string().max(20).optional(),
  message: z.string().min(10, 'Minimum 10 caractères').max(2000),
})

export async function POST(req: Request) {
  try {
    const parsed = schema.safeParse(await req.json())
    if (!parsed.success) return Response.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })
    const { name, email, phone, message } = parsed.data

    // 1. Supabase insert
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { createClient } = await import('@supabase/supabase-js')
      const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
      await sb.from('contacts').insert({ name, email, phone: phone ?? null, message })
    }

    // 2. Email Resend
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const { ContactNotification } = await import('@/emails/ContactNotification')
      const resend = new Resend(process.env.RESEND_API_KEY)
      const settings = await getSettings()
      const toEmail = settings.notificationEmail || process.env.CONTACT_EMAIL || 'noreply@nail-paris.fr'
      const receivedAt = new Date().toLocaleDateString('fr-FR', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
      await resend.emails.send({
        from: 'Nail Paris <onboarding@resend.dev>',
        to: toEmail,
        subject: `Nouveau message de ${name}`,
        react: ContactNotification({ name, email, phone: phone ?? null, message, receivedAt }),
      })
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('Contact error:', err)
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
