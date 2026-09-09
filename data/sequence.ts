/** Scroll timeline in “seconds” (mapped onto pin progress). Matches the Less Rain cue pattern. */
export const SEQUENCE_DURATION = 12;

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
    src: "/scroll/01-clinica.png",
  },
  {
    imageStart: 2,
    imageEnd: 4,
    cueStart: 2.3,
    cueEnd: 3.8,
    src: "/scroll/02-comunidad.png",
  },
  {
    imageStart: 4,
    imageEnd: 6,
    cueStart: 4.3,
    cueEnd: 5.8,
    src: "/scroll/03-tecnologia.png",
  },
  {
    imageStart: 6,
    imageEnd: 8,
    cueStart: 6.3,
    cueEnd: 7.8,
    src: "/scroll/04-privacidad.jpeg",
  },
  {
    imageStart: 8,
    imageEnd: 10,
    cueStart: 8.3,
    cueEnd: 9.8,
    src: "/scroll/05-educacion.jpeg",
  },
  {
    imageStart: 10,
    imageEnd: null,
    cueStart: 10.3,
    cueEnd: 11.8,
    src: "/scroll/06-redviva.png",
  },
];
