import cn from 'clsx'
import { Link } from 'components/link'
import { useStore } from 'lib/store'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'
import s from './navigation.module.scss'

export function Navigation() {
  const [navIsOpen, setNavIsOpen] = useStore(
    (state) => [state.navIsOpen, state.setNavIsOpen],
    shallow
  )
  const router = useRouter()
  const onRouteChange = () => {
    setNavIsOpen(false)
  }

  useEffect(() => {
    router.events.on('routeChangeStart', onRouteChange)

    return () => {
      router.events.off('routeChangeStart', onRouteChange)
    }
  }, [])

  return (
    <div className={cn(s.navigation, !navIsOpen && s.closed)}>
      <Link href="#hero" onClick={onRouteChange}>
        bliss
      </Link>
      <Link href="#vertical" onClick={onRouteChange}>
        reviews
      </Link>
      <Link href="#history" onClick={onRouteChange}>
        about us
      </Link>
      <Link href="#plan" onClick={onRouteChange}>
        plans
      </Link>
    </div>
  )
}
