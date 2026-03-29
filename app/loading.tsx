export default function Loading() {
  return (
    <div className="min-h-dvh flex items-center justify-center" style={{ background: '#F8F4EF' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-px animate-pulse" style={{ background: 'linear-gradient(to bottom, #C08878, transparent)' }} />
        <span className="font-body text-[10px] tracking-[0.3em] uppercase" style={{ color: '#C08878' }}>Chargement</span>
      </div>
    </div>
  )
}
