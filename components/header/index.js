import cn from 'clsx'
import { Navigation } from 'components/navigation'
import { useStore } from 'lib/store'
import { forwardRef } from 'react'
import { shallow } from 'zustand/shallow'
import s from './header.module.scss'

export const Header = forwardRef((_, ref) => {
  const [navIsOpened, setNavIsOpened] = useStore(
    ({ navIsOpened, setNavIsOpened }) => [navIsOpened, setNavIsOpened],
    shallow
  )

  return (
    <header className={s.header} ref={ref}>
      <Navigation />
      <div className={cn('layout-block', s.head)}>
        <div className={s.brand}>
          <img className={s.brandicon} src="./BlissIco.webp" alt="bliss icon" />
          <p>Bliss</p>
        </div>
        <button
          onClick={() => {
            setNavIsOpened(!navIsOpened)
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
