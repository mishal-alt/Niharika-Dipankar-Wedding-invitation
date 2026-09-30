import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { invite, leadNames } from '../data/invite'
import { Aurora, Petals, WeaveBorder } from './ui'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero({ start }: { start: boolean }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 24, mass: 0.4 })
  const glowY = useTransform(p, [0, 1], ['0%', '22%'])
  const garlandY = useTransform(p, [0, 1], ['0%', '38%'])
  const textY = useTransform(p, [0, 1], ['0%', '80%'])
  const fade = useTransform(p, [0, 0.55], [1, 0])
  const artY = useTransform(p, [0, 1], ['0%', '-18%'])
  const artScale = useTransform(p, [0, 1], [1, 1.12])
  const { first, second } = leadNames

  return (
    <section ref={ref} className="relative flex h-[100svh] min-h-[640px] w-full flex-col items-center overflow-hidden bg-emerald-deep">
      <Aurora intensity={1} />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-ink/50 via-emerald-deep/20 to-emerald-ink/90" />
      <motion.div
        aria-hidden
        style={{
          y: reduce ? 0 : glowY,
          background: 'radial-gradient(ellipse at 50% 80%, oklch(0.93 0.05 92 / 0.55), transparent 62%)',
        }}
        className="absolute bottom-0 left-1/2 h-[62%] w-[130%] -translate-x-1/2 rounded-t-full blur-2xl"
      />
      <Petals count={12} />

      <motion.div aria-hidden style={{ y: reduce ? 0 : garlandY }} className="pointer-events-none absolute inset-x-0 top-5 opacity-80">
        <WeaveBorder />
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col items-center px-6 pt-32 text-center">
        <motion.div style={{ y: reduce ? 0 : textY, opacity: fade }} className="flex flex-col items-center">
          <motion.p
            lang="as"
            initial={{ opacity: 0, y: 14 }}
            animate={start ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.1, duration: 0.9 }}
            className="mb-3 font-bn text-lg text-gold"
          >
            {invite.script.greeting}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={start ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="text-[0.6rem] tracking-[0.5em] text-gold-soft/90 uppercase"
          >
            Together with their families
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={start ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
            transition={{ delay: 0.4, duration: 1.1, ease }}
            className="mt-5 flex flex-col items-center leading-[0.82]"
          >
            <span className="text-gold-foil font-display text-[4.25rem] font-light">{first.name}</span>
            <span className="my-1 font-script text-3xl text-gold/80">and</span>
            <span className="text-gold-foil font-display text-[4.25rem] font-light">{second.name}</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={start ? { opacity: 1, scaleX: 1 } : undefined}
            transition={{ delay: 1, duration: 0.9 }}
            className="rule-gold mt-7 w-40"
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={start ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 1.15, duration: 0.9 }}
            className="mt-5 text-sm tracking-[0.35em] text-ivory/85 uppercase"
          >
            {invite.dateShort}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={start ? { opacity: 1 } : undefined}
            transition={{ delay: 1.35, duration: 0.9 }}
            className="mt-2 text-[0.7rem] tracking-[0.25em] text-ivory/60 uppercase"
          >
            {invite.city}
          </motion.p>
        </motion.div>

        <motion.img
          src={invite.images.hero}
          alt="Watercolour illustration of the couple"
          width={1024}
          height={1408}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={start ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ delay: 0.7, duration: 1.3, ease }}
          style={{ y: reduce ? 0 : artY, scale: reduce ? 1 : artScale }}
          className="mt-auto w-[88%] max-w-[350px] brightness-110 contrast-105 drop-shadow-[0_24px_40px_rgba(0,0,0,0.35)]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={start ? { opacity: 1 } : undefined}
        transition={{ delay: 1.8 }}
        style={{ opacity: fade }}
        className="absolute bottom-4 z-20 flex flex-col items-center text-gold/70"
      >
        <span className="text-[0.55rem] tracking-[0.4em] uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.div>
    </section>
  )
}
