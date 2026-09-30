import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Countdown } from './components/Countdown'
import { Couple } from './components/Couple'
import { EventDetails } from './components/EventDetails'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { IntroGate } from './components/IntroGate'
import { MusicPlayer } from './components/MusicPlayer'
import { Rsvp } from './components/Rsvp'
import { ScrollProgress } from './components/ui'

export default function App() {
  const [opening, setOpening] = useState(false) // seal tapped, doors sliding
  const [open, setOpen] = useState(false) // gate gone
  const [music, setMusic] = useState(true)

  // Lock page scroll until the invitation is opened.
  useEffect(() => {
    document.body.style.overflow = open ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <AnimatePresence>{!open && <IntroGate key="gate" onStart={() => setOpening(true)} onOpen={() => setOpen(true)} />}</AnimatePresence>
      <MusicPlayer start={opening} playing={music} onToggle={() => setMusic((m) => !m)} />
      {open && <ScrollProgress />}
      {/* Rendered behind the gate so the doors reveal the hero, never a blank page. */}
      <main className="mx-auto w-full max-w-[520px] overflow-hidden bg-background">
        <Hero start={opening} />
        <Couple />
        <Countdown />
        <EventDetails />
        <Rsvp />
        <Footer />
      </main>
    </>
  )
}
