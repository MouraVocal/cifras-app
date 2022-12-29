export interface IMusic {
  id: number
  startTime: number
  speed: number
  artist: string
  title: string
  chords: string
}

export interface IChordsPage {
  music: IMusic
}
