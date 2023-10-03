import { useState, useRef } from 'react'
import gsap from 'gsap'
import styles from './style.scss'

const Container = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  const slotRef = useRef(null)

  const emojis = ['🍰', '🍣', '🍑', '🍓']

  const fiesta = () => {
    if (isAnimating) return

    setIsAnimating(true)

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div')
      confetti.innerText = emojis[Math.floor(Math.random() * emojis.length)]
      slotRef.current.appendChild(confetti)
    }

    animateConfettis()
  }

  const animateConfettis = () => {
    const TLCONF = gsap.timeline()

    TLCONF.to(slotRef.current.querySelectorAll('div'), {
      y: 'random(-100,100)',
      x: 'random(-100,100)',
      z: 'random(0,2000)',
      rotation: 'random(-90,90)',
      duration: 1,
    })
      .to(
        slotRef.current.querySelectorAll('div'),
        { autoAlpha: 0, duration: 0.8 },
        '-=0.2'
      )
      .add(() => {
        slotRef.current.innerHTML = ''
        setIsAnimating(false)
      })
  }

  return (
    <div className="container">
      <div ref={slotRef} className="slot"></div>
      <button onClick={fiesta} className="btn_confettis">
        Click
      </button>
    </div>
  )
}

export default Container
