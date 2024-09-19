import { useDocumentReadyState, useIsVisible } from '@studio-freight/hamo'
import { useEffect, useRef, useState } from 'react'

export function Lottie({
  animation,
  speed = 1,
  loop = true,
  autoplay = true,
  clicked = false,
  className,
}) {
  const lottieRef = useRef(null)
  const animator = useRef(null)
  const [lottie, setLottie] = useState()

  const { setRef /* inView */ } = useIsVisible({
    threshold: 0,
  })
  const readyState = useDocumentReadyState()

  useEffect(() => {
    if (readyState === 'complete') {
      import('lottie-web/build/player/lottie_canvas.min').then((Lottie) =>
        setLottie(Lottie.default)
      )
    }
  }, [readyState])

  useEffect(() => {
    if (!lottie) return

    animator.current = lottie?.loadAnimation({
      container: lottieRef.current,
      animationData: animation,
      // renderer: 'svg', // "canvas", "html"
      renderer: 'canvas',
      loop,
      autoplay,
    })

    animator.current?.setSpeed(speed)

    return () => animator.current?.destroy()
  }, [lottie])

  useEffect(() => {
    if (animator.current && clicked) {
      animator.current?.playSegments([0, 16], true)
    } else {
      animator.current?.playSegments([16, 28], true)
    }
  }, [animator.current, clicked])

  return (
    <div
      aria-hidden="true"
      className={className}
      ref={(node) => {
        lottieRef.current = node
        setRef(node)
      }}
    />
  )
}
