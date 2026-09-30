import { invite } from '../data/invite'
import { CornerMotif, MandalaBg, Parallax, Reveal, SectionLabel } from './ui'

type Person = typeof invite.groom

function PersonCard({ person, role, flip }: { person: Person; role: string; flip?: boolean }) {
  return (
    <Reveal className="relative">
      <div className="relative overflow-hidden rounded-[2rem] border border-gold/30 bg-card/70 p-6 shadow-luxe backdrop-blur-sm">
        <MandalaBg className="opacity-[0.07]" />
        <div className="relative flex flex-col items-center text-center">
          <div className="relative h-40 w-40 overflow-hidden rounded-full bg-gradient-to-b from-gold/25 to-transparent">
            <img
              src={person.image}
              alt={person.fullName}
              loading="lazy"
              width={768}
              height={896}
              className={`h-full w-full object-cover object-top ${flip ? 'scale-x-[-1]' : ''}`}
            />
          </div>
          <span className="mt-5 text-[0.6rem] tracking-[0.45em] text-gold uppercase">{role}</span>
          <h3 className="mt-2 text-3xl font-light text-primary">{person.fullName}</h3>
          <p className="mt-1 text-xs tracking-wide text-muted-foreground">{person.line}</p>
          <span className="rule-gold my-4 w-20" />
          <p className="text-sm leading-relaxed text-foreground/75">{person.note}</p>
        </div>
      </div>
    </Reveal>
  )
}

export function Couple() {
  return (
    <section className="relative overflow-hidden px-5 py-20">
      <CornerMotif className="pointer-events-none absolute top-3 left-3 w-24 text-gold opacity-40" />
      <CornerMotif className="pointer-events-none absolute right-3 bottom-3 w-24 rotate-180 text-gold opacity-40" />

      <div className="relative mx-auto max-w-md">
        <Reveal className="text-center">
          <SectionLabel label="The Couple" />
          <h2 className="mt-5 text-4xl font-light text-primary">Two hearts, one thread</h2>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Seven vows, seven steps, and a lifetime of ordinary mornings made beautiful.
          </p>
        </Reveal>

        <div className="mt-10 space-y-8">
          <Parallax speed={26}>
            <PersonCard person={invite.groom} role="The Groom" />
          </Parallax>
          <div className="flex justify-center">
            <span className="animate-float-soft font-script text-5xl text-gold">&amp;</span>
          </div>
          <Parallax speed={-26}>
            <PersonCard person={invite.bride} role="The Bride" flip />
          </Parallax>
        </div>
      </div>
    </section>
  )
}
