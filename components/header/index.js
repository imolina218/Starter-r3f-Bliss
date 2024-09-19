import cn from 'clsx'
import { Lottie } from 'components/lottie'
import { Navigation } from 'components/navigation'
import { useStore } from 'lib/store'
import { forwardRef } from 'react'
import { shallow } from 'zustand/shallow'
import animationData from '../../public/hamburguer.json'
import s from './header.module.scss'

export const Header = forwardRef((_, ref) => {
  const [navIsOpen, setNavIsOpen] = useStore(
    (state) => [state.navIsOpen, state.setNavIsOpen],
    shallow
  )

  return (
    <header className={s.header} ref={ref}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="0" />
      <link
        href="https://fonts.googleapis.com/css2?family=Electrolize&display=swap"
        rel="stylesheet"
      />
      <Navigation />
      <div className={cn('layout-block', s.head)}>
        <div className={s.brand}>
          <img src="./BlissIco.webp" alt="bliss icon" />
          <p>Bliss</p>
        </div>
        <button
          onClick={() => {
            setNavIsOpen(!navIsOpen)
          }}
        >
          <Lottie
            animation={animationData}
            autoplay={false}
            loop={false}
            className={s.lottie}
            clicked={navIsOpen}
          />
        </button>
        {/* <div>
          <Link href="/">home</Link>/<Link href="/gsap">gsap</Link>/
          <Link href="/contact">contact</Link>
        </div> */}
      </div>
    </header>
  )
})

Header.displayName = 'Header'
