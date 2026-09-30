import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { invite, leadNames } from '../data/invite'
import { Aurora, MandalaBg, Petals } from './ui'

export function IntroGate({ onStart, onOpen }: { onStart: () => void; onOpen: () => void }) {
  const [opening, setOpening] = useState(false)
  const { first, second } = leadNames

  const open = () => {
    if (opening) return
    setOpening(true)
    onStart()
    window.setTimeout(onOpen, 1500)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {[-1, 1].map((side) => (
        <motion.div
          key={side}
          className="absolute inset-y-0 w-[51%] overflow-hidden bg-emerald-ink"
          style={{ [side === -1 ? 'left' : 'right']: 0 }}
          animate={opening ? { x: `${side * 105}%` } : { x: 0 }}
          transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
        >
          <Aurora intensity={0.55} />
          <MandalaBg className="opacity-20" position={side === -1 ? 'right center' : 'left center'} />
          <div
            className="absolute inset-y-0 w-[2px]"
            style={{ [side === -1 ? 'right' : 'left']: 0, background: 'var(--gradient-gold)' }}
          />
        </motion.div>
      ))}

      <Petals count={10} />

      <AnimatePresence>
        {!opening && (
          <motion.div
            className="relative z-10 flex flex-col items-center px-8 text-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span lang="as" className="font-bn text-xl text-gold">
              {invite.script.greeting}
            </span>
            <span className="mt-2 text-[0.55rem] tracking-[0.5em] text-gold/80 uppercase">A wedding invitation</span>
            <h1 className="text-gold-foil mt-5 font-display text-[2.15rem] leading-none font-light whitespace-nowrap">
              {first.name}
              <span className="mx-3 font-script text-3xl text-gold/80">&amp;</span>
              {second.name}
            </h1>
            <span className="rule-gold mt-6 w-32" />

            <motion.button
              onClick={open}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              className="group relative mt-12 grid h-28 w-28 place-items-center"
              aria-label="Open the invitation"
            >
              <motion.span
                className="absolute inset-0 rounded-full border border-gold/40"
                animate={{ scale: [1, 1.28, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ repeat: Infinity, duration: 2.6, ease: 'easeOut' }}
              />
              <motion.span
                className="grid h-20 w-20 place-items-center rounded-full shadow-gold"
                style={{ backgroundImage: 'var(--gradient-gold)' }}
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3.4, ease: 'easeInOut' }}
              >
                <span className="font-script text-3xl leading-none text-emerald-ink">
                  {first.name[0]}
                  {second.name[0]}
                </span>
              </motion.span>
            </motion.button>

            <motion.p
              className="mt-8 text-[0.6rem] tracking-[0.4em] text-ivory/60 uppercase"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.4 }}
            >
              Tap the seal to open
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
