import { motion } from 'framer-motion'
import { CalendarDays, CalendarPlus, MapPin, Navigation } from 'lucide-react'
import { invite, leadNames } from '../data/invite'
import { Reveal, SectionLabel } from './ui'

const icsDate = (iso: string) => iso.slice(0, 10).replace(/-/g, '')
const icsStamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

type EventInfo = { dateISO: string; endISO: string; dateLabel: string; day: string; monthYear: string }

// All-day event: no ceremony time has been provided.
function addToCalendar(event: EventInfo, title: string) {
  const { first, second } = leadNames
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invite//EN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@wedding`,
    `DTSTAMP:${icsStamp(new Date().toISOString())}`,
    `DTSTART;VALUE=DATE:${icsDate(event.dateISO)}`,
    `DTEND;VALUE=DATE:${icsDate(event.endISO)}`,
    `SUMMARY:${first.name} & ${second.name} — ${title}`,
    `LOCATION:${invite.venue.name}\\, ${invite.venue.address}`,
    'DESCRIPTION:With love\\, we invite you to celebrate with us.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `${title.toLowerCase()}.ics`
  a.click()
  URL.revokeObjectURL(url)
}

function EventCard({ event, dayLabel, title, delay }: { event: EventInfo; dayLabel: string; title: string; delay: number }) {
  const rows = [
    { icon: CalendarDays, label: dayLabel, value: event.dateLabel },
    { icon: MapPin, label: 'Venue', value: invite.venue.name },
  ]
  return (
    <Reveal delay={delay}>
      <div className="overflow-hidden rounded-[2rem] border border-gold/30 bg-card shadow-luxe">
        <div className="bg-gradient-to-br from-primary to-emerald-ink px-6 py-7 text-center">
          <p className="text-[0.6rem] tracking-[0.45em] text-gold/80 uppercase">Save the date</p>
          <p className="mt-2 font-display text-5xl font-light text-ivory">{event.day}</p>
          <p className="text-sm tracking-[0.35em] text-ivory/85 uppercase">{event.monthYear}</p>
        </div>
        <div className="divide-y divide-gold/15">
          {rows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 px-6 py-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">{label}</p>
                <p className="truncate text-sm text-foreground">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 pt-2 pb-6">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => addToCalendar(event, title)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-emerald-ink py-4 text-xs tracking-[0.3em] text-ivory uppercase shadow-gold"
          >
            <CalendarPlus className="h-4 w-4" />
            Add to calendar
          </motion.button>
        </div>
      </div>
    </Reveal>
  )
}

export function EventDetails() {
  return (
    <section className="relative px-5 py-20">
      <div className="mx-auto max-w-md">
        <Reveal className="text-center">
          <SectionLabel label="When & Where" />
          <h2 className="mt-5 text-4xl font-light text-primary">The celebration</h2>
        </Reveal>

        <div className="mt-8 space-y-6">
          <EventCard event={invite} dayLabel="Wedding Day" title="Wedding" delay={0.1} />
          <EventCard event={invite.reception} dayLabel="Reception" title="Reception" delay={0.12} />
        </div>

        <Reveal delay={0.16}>
          <div className="mt-6 overflow-hidden rounded-[2rem] border border-gold/30 bg-card shadow-luxe">
            <div className="relative">
              <img
                src={invite.images.map}
                alt={`Map to ${invite.venue.name}`}
                loading="lazy"
                width={1024}
                height={768}
                className="h-48 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            </div>
            <div className="px-6 pt-2 pb-6 text-center">
              <p className="text-xl text-primary">{invite.venue.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{invite.venue.address}</p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <motion.a
                  whileTap={{ scale: 0.97 }}
                  href={invite.venue.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 px-7 py-3.5 text-xs tracking-[0.3em] text-primary uppercase transition-colors hover:bg-secondary"
                >
                  <Navigation className="h-4 w-4" />
                  Get directions
                </motion.a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
