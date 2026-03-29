import type { ContactInfo } from '@/lib/types'

export function Footer({ data }: { data: ContactInfo }) {
  return (
    <footer className="border-t border-[#E8E0D8] bg-[#F8F4EF] py-12" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          {/* Logo */}
          <div className="flex flex-col leading-none">
            <span className="font-display text-2xl font-semibold text-[#1A1210]">Nail</span>
            <span className="font-body text-[10px] font-medium tracking-[0.3em] text-[#C08878] uppercase">Paris</span>
          </div>

          {/* Infos */}
          <div className="flex flex-col gap-1">
            <p className="font-body text-sm text-[#7A6A62]">{data.address}</p>
            <p className="font-body text-sm text-[#7A6A62]">{data.hours}</p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-1">
            <a href={`tel:${data.phone}`} className="font-body text-sm text-[#1A1210] hover:text-[#C08878] transition-colors">
              {data.phone}
            </a>
            <a href={`mailto:${data.email}`} className="font-body text-sm text-[#1A1210] hover:text-[#C08878] transition-colors">
              {data.email}
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-[#E8E0D8] pt-6 flex flex-col items-center gap-2 md:flex-row md:justify-between">
          <p className="font-body text-xs text-[#7A6A62]">
            © {new Date().getFullYear()} Nail Paris. Tous droits réservés.
          </p>
          <p className="font-body text-xs text-[#7A6A62]">
            Conçu avec soin · Paris
          </p>
        </div>
      </div>
    </footer>
  )
}
