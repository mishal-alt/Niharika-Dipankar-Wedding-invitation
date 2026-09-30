import { Music } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

// Starts when `start` turns true (triggered by the seal tap, a user gesture, so autoplay is allowed).
export function MusicPlayer({ start, playing, onToggle }: { start: boolean; playing: boolean; onToggle: () => void }) {
  const audio = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const el = audio.current
    if (!el || !start) return
    if (playing) el.play().catch(() => {})
    else el.pause()
  }, [start, playing])

  return (
    <>
      <audio ref={audio} src="/wedding-music.mp3" loop preload="auto" />
      {start && (
        <button
          onClick={onToggle}
          aria-label={playing ? 'Turn music off' : 'Turn music on'}
          className="fixed right-4 bottom-4 z-[60] grid h-11 w-11 place-items-center rounded-full border border-gold/50 bg-emerald-ink/80 text-gold shadow-gold backdrop-blur"
        >
          {playing &&
            [0, 1].map((i) => (
              <motion.span
                key={i}
                className="absolute inset-0 rounded-full border border-gold/60"
                animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: i, ease: 'easeOut' }}
              />
            ))}
          <motion.span
            className="grid place-items-center"
            animate={playing ? { rotate: [-8, 8, -8], scale: [1, 1.12, 1] } : { rotate: 0, scale: 1 }}
            transition={{ repeat: playing ? Infinity : 0, duration: 1.2, ease: 'easeInOut' }}
          >
            <Music className={`h-5 w-5 ${playing ? '' : 'opacity-60'}`} />
          </motion.span>
          {!playing && <span className="absolute h-[2px] w-7 rotate-45 rounded bg-gold" />}
        </button>
      )}
    </>
  )
}
