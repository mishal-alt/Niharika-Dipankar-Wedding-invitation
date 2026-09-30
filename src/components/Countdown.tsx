import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { invite } from '../data/invite'
import { MandalaBg, WeaveBorder, Reveal, SectionLabel } from './ui'

const target = new Date(invite.dateISO).getTime()

function remaining() {
  const ms = Math.max(0, target - Date.now())
  return {
    days: Math.floor(ms / 864e5),
    hours: Math.floor((ms / 36e5) % 24),
    minutes: Math.floor((ms / 6e4) % 60),
    seconds: Math.floor((ms / 1e3) % 60),
  }
}

function Tile({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, '0')
  return (
    <div className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-gold/25 bg-emerald-ink/40 px-2 py-4 backdrop-blur-sm">
      <div className="relative h-11 w-full overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: '70%', opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: '-70%', opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-gold-foil absolute inset-0 flex items-center justify-center font-display text-4xl font-light tabular-nums"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[0.55rem] tracking-[0.3em] text-ivory/55 uppercase">{label}</span>
    </div>
  )
}

export function Countdown() {
  const [t, setT] = useState(remaining)
  useEffect(() => {
    const id = setInterval(() => setT(remaining()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative overflow-hidden bg-emerald-ink px-5 py-20">
      <MandalaBg className="opacity-20" size="140%" />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-ink via-emerald-ink/60 to-emerald-ink" />
      <WeaveBorder className="absolute inset-x-0 top-0 opacity-60" />
      <div className="relative mx-auto max-w-md text-center">
        <Reveal>
          <SectionLabel label="Counting down" />
          <h2 className="mt-5 text-4xl font-light text-ivory">
            Until we say <span className="text-gold-foil font-script">forever</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-9 grid grid-cols-4 gap-2.5">
            <Tile value={t.days} label="Days" />
            <Tile value={t.hours} label="Hours" />
            <Tile value={t.minutes} label="Mins" />
            <Tile value={t.seconds} label="Secs" />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-xs tracking-[0.25em] text-ivory/55 uppercase">{invite.dateLabel}</p>
        </Reveal>
      </div>
    </section>
  )
}
