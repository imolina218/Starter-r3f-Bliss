import { Lenis, useLenis } from '@studio-freight/react-lenis'
import '@theatre/core'
//import extension from '@theatre/r3f/dist/extension'
//import studio from '@theatre/studio'
import cn from 'clsx'
import { Cursor } from 'components/cursor'
import { CustomHead } from 'components/custom-head'
import { Footer } from 'components/footer'
import { Header } from 'components/header'
import { LoadingScreen } from 'components/loading-screen'
import { Scrollbar } from 'components/scrollbar'
import { Shade } from 'components/shade'
import Router from 'next/router'
import { Suspense, useEffect } from 'react'

import s from './layout.module.scss'

/* studio.initialize()
studio.extend(extension) */

export function Layout({
  seo = { title: 'BLISS', description: '', image: '', keywords: '' },
  children,
  theme = 'light',
  className,
}) {
  const lenis = useLenis()

  useEffect(() => {
    window.lenis = lenis
    function onHashChangeStart(url) {
      url = '#' + url.split('#').pop()
      lenis.scrollTo(url)
    }

    Router.events.on('hashChangeStart', onHashChangeStart)

    return () => {
      Router.events.off('hashChangeStart', onHashChangeStart)
    }
  }, [lenis])

  return (
    <>
      <CustomHead {...seo} />

      <Lenis root>
        <Suspense fallback={<LoadingScreen />}>
          <div className={cn(`theme-${theme}`, s.layout, className)}>
            <Shade />
            <Cursor />
            <Scrollbar />
            <Header />
            <main className={s.main}>{children}</main>
            <Footer />
          </div>
        </Suspense>
      </Lenis>
    </>
  )
}
