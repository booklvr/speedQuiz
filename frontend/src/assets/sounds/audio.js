import {Howl, howler} from 'howler'
// import {useSelector} from 'react-redux'
// const startSound = new Audio('../../audio/start')



const correctSound = new Howl({
  src: ['../../audio/correct.wav'],
  volume: 0.5,
});

const skipSound = new Howl({
  src: ['../../audio/skip.mp3'],
  volume: 0.5,
})

const backSound = new Howl({
  src: ['../../audio/back.wav'],
  volume: 0.5,
})

const endSound = new Howl({
  src: ['../../audio/end.wav'],
  volume: 0.5,
})

const nextSound = new Howl({
  src: ['../../audio/next.wav'],
  volume: 0.5,
})

const timesUpSound = new Howl({
  src: ['../../audio/timesUp.flac'],
  volume: 0.2,
})

const exitSound = new Howl({
  src: ['../../auido/exit.wav'],
  volume: 0.5,
})

// const correctSound = new Audio('../../audio/correct.wav')


export { correctSound, skipSound, backSound, endSound, nextSound, timesUpSound, exitSound }
