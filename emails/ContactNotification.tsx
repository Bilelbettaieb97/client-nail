import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'

interface Props {
  name: string
  email: string
  phone?: string | null
  message: string
  receivedAt: string
}

export function ContactNotification({ name, email, phone, message, receivedAt }: Props) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Nouveau message de {name} — Nail Paris</Preview>
      <Body style={{ backgroundColor: '#F8F4EF', fontFamily: 'Georgia, serif' }}>
        <Container style={{ maxWidth: '560px', margin: '40px auto', backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden' }}>
          {/* Header */}
          <Section style={{ backgroundColor: '#1A1210', padding: '28px 36px 20px' }}>
            <Heading style={{ color: '#fff', fontSize: '26px', margin: 0, fontFamily: 'Georgia, serif' }}>Nail Paris</Heading>
            <Text style={{ color: '#C08878', fontSize: '12px', margin: '4px 0 0', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Nouveau message reçu
            </Text>
          </Section>

          {/* Accent line */}
          <div style={{ height: '2px', background: 'linear-gradient(to right, #C08878, #B09070)' }} />

          {/* Contact info */}
          <Section style={{ margin: '20px 36px 0', backgroundColor: '#F8F4EF', borderRadius: '10px', padding: '18px 22px' }}>
            <Text style={{ fontSize: '11px', fontWeight: '600', color: '#C08878', textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 10px' }}>Coordonnées</Text>
            <Text style={{ margin: '4px 0', fontSize: '14px', color: '#1A1210' }}><strong>Nom :</strong> {name}</Text>
            <Text style={{ margin: '4px 0', fontSize: '14px', color: '#1A1210' }}><strong>Email :</strong> {email}</Text>
            {phone && <Text style={{ margin: '4px 0', fontSize: '14px', color: '#1A1210' }}><strong>Téléphone :</strong> {phone}</Text>}
          </Section>

          {/* Message */}
          <Section style={{ margin: '12px 36px 0', backgroundColor: '#F8F4EF', borderRadius: '10px', padding: '18px 22px' }}>
            <Text style={{ fontSize: '11px', fontWeight: '600', color: '#C08878', textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 10px' }}>Message</Text>
            <Text style={{ fontSize: '14px', color: '#1A1210', lineHeight: '1.7', whiteSpace: 'pre-wrap', margin: 0 }}>{message}</Text>
          </Section>

          {/* Footer */}
          <Section style={{ padding: '20px 36px 28px', textAlign: 'center' }}>
            <Text style={{ fontSize: '11px', color: '#B09070', margin: '0 0 4px' }}>Reçu le {receivedAt}</Text>
            <Text style={{ fontSize: '11px', color: '#B09070', margin: 0 }}>
              Gérez vos messages sur{' '}
              <a href="https://client-nail.vercel.app/admin/contacts" style={{ color: '#C08878' }}>l'espace admin</a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
