import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1A1210',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ color: '#C08878', fontSize: 18, letterSpacing: '0.35em', textTransform: 'uppercase' }}>
            Salon Parisien
          </div>
          <div style={{ color: '#ffffff', fontSize: 96, fontWeight: 600, lineHeight: 0.9, fontFamily: 'Georgia' }}>
            Nail Paris
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 24, marginTop: 16 }}>
            Salon de manucure d'exception · Paris 8e
          </div>
          <div
            style={{
              marginTop: 32,
              padding: '12px 32px',
              borderRadius: 999,
              background: '#C08878',
              color: '#fff',
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Prendre rendez-vous
          </div>
        </div>
      </div>
    ),
    size
  )
}
