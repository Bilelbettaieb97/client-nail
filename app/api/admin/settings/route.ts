import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { isAdminRequest } from '@/lib/admin-auth'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

function getDb() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

export async function GET(req: Request) {
  if (!isAdminRequest(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { data } = await getDb().from('site_content').select('data').eq('section', 'settings').single()
  return Response.json(data?.data ?? { notificationEmail: process.env.CONTACT_EMAIL ?? '' })
}

export async function PUT(req: Request) {
  if (!isAdminRequest(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const parsed = z.object({ notificationEmail: z.string().email() }).safeParse(await req.json())
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 })
  const { error } = await getDb().from('site_content')
    .upsert({ section: 'settings', data: parsed.data, updated_at: new Date().toISOString() }, { onConflict: 'section' })
  if (error) return Response.json({ error: error.message }, { status: 500 })
  revalidatePath('/')
  return Response.json({ success: true })
}
