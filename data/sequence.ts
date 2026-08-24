/** Scroll timeline in “seconds” (mapped onto pin progress). Matches the Less Rain cue pattern. */
export const SEQUENCE_DURATION = 16;

export type SequenceBeat = {
  imageStart: number;
  imageEnd: number | null;
  cueStart: number;
  cueEnd: number;
  src: string;
};

export const sequenceBeats: readonly SequenceBeat[] = [
  {
    imageStart: -0.5,
    imageEnd: 2,
    cueStart: 0.3,
    cueEnd: 1.8,
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    imageStart: 2,
    imageEnd: 4,
    cueStart: 2.3,
    cueEnd: 3.8,
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    imageStart: 4,
    imageEnd: 6,
    cueStart: 4.3,
    cueEnd: 5.8,
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
  },
  {
    imageStart: 6,
    imageEnd: 8,
    cueStart: 6.3,
    cueEnd: 7.8,
    src: "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=1600&q=80",
  },
  {
    imageStart: 8,
    imageEnd: 10,
    cueStart: 8.3,
    cueEnd: 9.8,
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80",
  },
  {
    imageStart: 10,
    imageEnd: 12,
    cueStart: 10.3,
    cueEnd: 11.8,
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    imageStart: 12,
    imageEnd: 14,
    cueStart: 12.3,
    cueEnd: 13.8,
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
  },
  {
    imageStart: 14,
    imageEnd: null,
    cueStart: 14.3,
    cueEnd: 15.8,
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
  },
];
