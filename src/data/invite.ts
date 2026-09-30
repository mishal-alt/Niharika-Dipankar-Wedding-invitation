// Single source of truth for all invitation content.

const person = {
  groom: {
    name: 'Dipankar',
    fullName: 'Dipankar Debnath',
    line: 'Son of Mr. Sanat Debnath & Mrs. Rekha Debnath',
    note: 'Together with his family, he looks forward to celebrating this new beginning with you.',
    image: '/images/groom.png', // template stock art: replace with a real portrait
  },
  bride: {
    name: 'Niharika',
    fullName: 'Niharika Nath',
    line: 'Daughter of Mr. Kushram Nath & Mrs. Manju Nath',
    note: 'Together with her family, she looks forward to celebrating this new beginning with you.',
    image: '/images/bride.png', // template stock art: replace with a real portrait
  },
}

export const invite = {
  ...person,
  // Which name leads in headings ("Niharika & Dipankar").
  nameOrder: ['bride', 'groom'] as const,

  // No wedding time was provided, so the event is treated as all-day.
  dateISO: '2026-11-21T00:00:00+05:30',
  endISO: '2026-11-22T00:00:00+05:30',
  dateLabel: 'Saturday, 21 November 2026',
  dateShort: '21 · 11 · 2026',
  day: '21',
  monthYear: 'November 2026',
  city: 'Silapathar, Assam',

  venue: {
    name: 'Notun Mising Gaon',
    address: 'Sani Mandir Road, Silapathar, Assam 787059',
    mapUrl:
      'https://www.google.com/maps/place/Natun+Mising+Gaon/@27.5970371,94.7321972,17z/data=!3m1!4b1!4m6!3m5!1s0x37409334c45b687b:0x47a593e4f9db2e4f!8m2!3d27.5970371!4d94.7321972!16s%2Fg%2F11cn6dvn12',
  },

  // Time and venue not provided yet; shown as a date-only card at the same venue.
  reception: {
    dateISO: '2026-11-23T00:00:00+05:30',
    endISO: '2026-11-24T00:00:00+05:30',
    dateLabel: 'Monday, 23 November 2026',
    day: '23',
    monthYear: 'November 2026',
  },

  // Assamese / Bengali script lines. Draft wording: have a native speaker confirm before going live.
  script: {
    greeting: 'শুভ বিবাহ',
    inviteAs: 'আপোনালোকৰ আশীৰ্বাদ কামনা কৰোঁ',
    inviteBn: 'আপনাদের আশীর্বাদ কামনা করি',
  },

  whatsapp: '919678100167',

  images: {
    hero: '/images/couple-hero.png',
    mandala: '/images/mandala-texture.jpg',
    map: '/images/map-preview.jpg',
  },
}

const [first, second] = invite.nameOrder
export const leadNames = { first: invite[first], second: invite[second] }
