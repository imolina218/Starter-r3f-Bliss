import cn from 'clsx'
import { Navigation } from 'components/navigation'
import { useStore } from 'lib/store'
import { forwardRef } from 'react'
import { shallow } from 'zustand/shallow'
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
          <img src="./hamburguesa.svg" alt="menu" />
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
