import { Heart } from 'lucide-react'
import { invite, leadNames } from '../data/invite'
import { Aurora, CornerMotif, MandalaBg, WeaveBorder, Reveal, SectionLabel } from './ui'

const credit = { name: 'zetron.tech', url: 'https://www.instagram.com/zetron.tech' }

function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  )
}

export function Footer() {
  const { first, second } = leadNames
  return (
    <footer className="relative overflow-hidden bg-emerald-ink px-5 pt-20 pb-10">
      <MandalaBg className="opacity-25" size="120%" position="top center" />
      <Aurora intensity={0.5} />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-ink/70 via-emerald-ink/85 to-emerald-ink" />
      <WeaveBorder className="absolute inset-x-0 top-0 opacity-60" />
      <CornerMotif className="pointer-events-none absolute top-10 left-3 w-20 text-gold opacity-30" />
      <CornerMotif className="pointer-events-none absolute top-10 right-3 w-20 -scale-x-100 text-gold opacity-30" />

      <div className="relative mx-auto max-w-md text-center">
        <Reveal>
          <SectionLabel label="With love" />
          <p className="text-gold-foil mt-6 font-script text-4xl leading-snug">Come bless our beginning</p>
          <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-ivory/70">
            Your presence is the only gift we ask for. Bring your laughter, your appetite and your dancing shoes — we have
            saved a seat, and a story, for you.
          </p>
          <p lang="as" className="mt-6 font-bn text-base leading-relaxed text-gold-soft">
            {invite.script.inviteAs}
          </p>
          <p lang="bn" className="mt-1 font-bn text-base leading-relaxed text-gold-soft/80">
            {invite.script.inviteBn}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-9 flex flex-col items-center">
            <span className="rule-gold w-28" />
            <p className="mt-6 font-display text-3xl font-light text-ivory">
              {first.name} <span className="font-script text-gold">&amp;</span> {second.name}
            </p>
            <p className="mt-2 text-[0.6rem] tracking-[0.4em] text-ivory/50 uppercase">
              {invite.dateShort} · {invite.city.split(',')[0]}
            </p>
          </div>
        </Reveal>

        <p className="mt-12 flex items-center justify-center gap-1.5 text-[0.6rem] tracking-[0.3em] text-ivory/35 uppercase">
          Made with <Heart className="h-3 w-3 fill-current text-gold" /> for our people
        </p>

        <a
          href={credit.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Crafted by ${credit.name} on Instagram`}
          className="mx-auto mt-6 flex w-fit items-center gap-2 border-t border-gold/15 pt-4 text-[0.6rem] tracking-[0.3em] text-ivory/40 uppercase transition-colors hover:text-gold"
        >
          <InstagramIcon className="h-3.5 w-3.5" />
          <span>Crafted by {credit.name}</span>
        </a>
      </div>
    </footer>
  )
}
