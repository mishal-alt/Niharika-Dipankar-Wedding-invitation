import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { invite, leadNames } from '../data/invite'
import { MandalaBg, Reveal, SectionLabel } from './ui'

const field =
  'w-full rounded-2xl border border-gold/40 bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30'

export function Rsvp() {
  const { first, second } = leadNames
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const send = (e: FormEvent) => {
    e.preventDefault()
    const body = message.trim() || `We would love to be part of ${first.name} & ${second.name}'s celebration!`
    const text = `${body}${name.trim() ? `\n\n— ${name.trim()}` : ''}`
    window.open(`https://wa.me/${invite.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  return (
    <section className="relative overflow-hidden px-5 pb-20">
      <div className="relative mx-auto max-w-md">
        <Reveal className="text-center">
          <SectionLabel label="RSVP" />
          <h2 className="mt-5 text-4xl font-light text-primary">Will you join us?</h2>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Write us a message or your blessings. It opens in WhatsApp, ready for you to send.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={send}
            className="relative mt-8 overflow-hidden rounded-[2rem] border border-gold/30 bg-card/70 p-6 shadow-luxe backdrop-blur-sm"
          >
            <MandalaBg className="opacity-[0.07]" />
            <div className="relative space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                aria-label="Your name"
                className={field}
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message or blessings here…"
                rows={5}
                aria-label="Your message"
                className={`${field} resize-none`}
              />
              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-emerald-ink py-4 text-xs tracking-[0.3em] text-ivory uppercase shadow-gold"
              >
                <Send className="h-4 w-4" />
                Send on WhatsApp
              </motion.button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
