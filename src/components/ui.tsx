import { useId, useMemo, useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export function Aurora({ className = '', intensity = 1 }: { className?: string; intensity?: number }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} style={{ opacity: intensity }}>
      <div
        className="absolute -top-1/3 left-[-20%] h-[80%] w-[90%] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle at 50% 50%, oklch(0.55 0.13 160 / 0.55), transparent 65%)',
          animation: 'aurora-drift 18s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-[10%] right-[-25%] h-[75%] w-[85%] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle at 50% 50%, oklch(0.8 0.12 85 / 0.5), transparent 65%)',
          animation: 'aurora-drift 24s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute bottom-[-25%] left-[10%] h-[70%] w-[80%] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle at 50% 50%, oklch(0.52 0.16 18 / 0.4), transparent 65%)',
          animation: 'aurora-drift 30s ease-in-out infinite',
        }}
      />
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          backgroundImage: 'radial-gradient(oklch(0.98 0.02 92 / 0.35) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
    </div>
  )
}

export function Petals({ count = 14, burst = false }: { count?: number; burst?: boolean }) {
  const reduce = useReducedMotion()
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        left: Math.random() * 100,
        size: 8 + Math.random() * 12,
        delay: burst ? Math.random() * 0.4 : Math.random() * 12,
        duration: (burst ? 3.2 : 11) + Math.random() * 6,
        drift: (Math.random() - 0.5) * 140,
        spin: 180 + Math.random() * 540,
        hue: Math.random() > 0.5 ? 'oklch(0.78 0.115 85)' : 'oklch(0.62 0.13 18)',
        opacity: 0.35 + Math.random() * 0.45,
      })),
    [count, burst],
  )
  if (reduce) return null
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-[-8%]"
          style={{ left: `${p.left}%`, width: p.size, height: p.size * 0.62, borderRadius: '60% 10% 60% 10%', background: p.hue, opacity: p.opacity }}
          initial={{ y: '-10vh', x: 0, rotate: 0 }}
          animate={{ y: '115vh', x: p.drift, rotate: p.spin }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  )
}

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export function Parallax({ children, speed = 40, className = '' }: { children: ReactNode; speed?: number; className?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 })
  const y = useTransform(smooth, [0, 1], [speed, -speed])
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: reduce ? 0 : y }}>{children}</motion.div>
    </div>
  )
}

export function SectionLabel({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="rule-gold w-16" />
      {label ? (
        <span className="font-sans text-[0.65rem] tracking-[0.42em] text-gold uppercase">{label}</span>
      ) : (
        <Japi className="h-4 w-6 text-gold" />
      )}
      <span className="rule-gold w-16" />
    </div>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 })
  return (
    <motion.div
      aria-hidden
      className="fixed top-0 right-0 left-0 z-40 h-[3px] origin-left"
      style={{ scaleX, backgroundImage: 'var(--gradient-gold)' }}
    />
  )
}

export function MandalaBg({ className = '', size = 'cover', position = 'center' }: { className?: string; size?: string; position?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ backgroundImage: "url('/images/mandala-texture.jpg')", backgroundSize: size, backgroundPosition: position }}
    />
  )
}

/** Assamese japi (bamboo hat) glyph. */
export function Japi({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 32 22" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" className={className}>
      <path d="M2 19c8-1.6 20-1.6 28 0-1.5-8-6.5-14-14-16C8.5 5 3.5 11 2 19Z" />
      <path d="M16 3v-1.5M8 14.5c5-1.5 11-1.5 16 0M11 9.5c3.5-1 6.5-1 10 0" />
      <circle cx="16" cy="1.5" r="1" fill="currentColor" />
    </svg>
  )
}

/** Gamosa-style woven border: rows of diamonds between two rules. */
export function WeaveBorder({ className = '' }: { className?: string }) {
  const id = useId()
  return (
    <svg aria-hidden height="34" className={`w-full text-gold ${className}`}>
      <defs>
        <pattern id={id} width="34" height="34" patternUnits="userSpaceOnUse">
          <path d="M17 5 29 17 17 29 5 17Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M17 11 23 17 17 23 11 17Z" fill="currentColor" opacity="0.75" />
          <path d="M0 17h5M29 17h5" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        </pattern>
      </defs>
      <rect y="1" width="100%" height="1.2" fill="currentColor" />
      <rect y="32" width="100%" height="1.2" fill="currentColor" />
      <rect y="1" width="100%" height="32" fill={`url(#${id})`} />
    </svg>
  )
}

/** Corner ornament (top-left); flip with rotate/scale utilities. */
export function CornerMotif({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.2" className={className}>
      <path d="M4 4H116M4 4V116" />
      <path d="M14 14H84M14 14V84" strokeWidth="0.8" />
      <path d="M32 32 50 50 32 68 14 50Z" />
      <path d="M32 40 42 50 32 60 22 50Z" fill="currentColor" opacity="0.6" />
      <path d="M68 14 86 32 68 50 50 32Z" />
      <path d="M14 68 32 86 14 104 -4 86Z" />
      <circle cx="68" cy="68" r="3" fill="currentColor" />
      <circle cx="92" cy="20" r="2" fill="currentColor" />
      <circle cx="20" cy="92" r="2" fill="currentColor" />
    </svg>
  )
}
