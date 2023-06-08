import { useDebug } from '@studio-freight/hamo'
import { useLenis } from '@studio-freight/react-lenis'
import { raf } from '@studio-freight/tempus'
import { RealViewport } from 'components/real-viewport'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { GTM_ID } from 'lib/analytics'
import { useStore } from 'lib/store'
import Script from 'next/script'
import { useEffect } from 'react'
import 'styles/global.scss'

/* const Stats = dynamic(
  () => import('components/stats').then(({ Stats }) => Stats),
  { ssr: false }
)

const GridDebugger = dynamic(
  () =>
    import('components/grid-debugger').then(({ GridDebugger }) => GridDebugger),
  { ssr: false }
) */

gsap.registerPlugin(ScrollTrigger)

// merge rafs
if (typeof window !== 'undefined') {
  gsap.ticker.lagSmoothing(0)
  gsap.ticker.remove(gsap.updateRoot)
  raf.add((time) => {
    gsap.updateRoot(time / 1000)
  }, 0)
}

function MyApp({ Component, pageProps }) {
  const debug = useDebug()
  const lenis = useLenis()
  const overflow = useStore(({ overflow }) => overflow)

  // const setHeaderData = useStore((state) => state.setHeaderData)
  // const setFooterData = useStore((state) => state.setFooterData)

  // const [isFetched, setIsFetched] = useState(false)

  // avoid infinite loop
  // if (!isFetched) {
  //   setHeaderData(headerData)
  //   setFooterData(footerData)
  //   setIsFetched(true)
  // }

  useEffect(() => {
    if (overflow) {
      lenis?.start()
      document.documentElement.style.removeProperty('overflow')
    } else {
      lenis?.stop()
      document.documentElement.style.setProperty('overflow', 'hidden')
    }
  }, [lenis, overflow])

  useEffect(() => {
    if (lenis) ScrollTrigger.refresh()
  }, [lenis])

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  ScrollTrigger.defaults({ markers: process.env.NODE_ENV === 'development' })

  return (
    <>
      {debug && (
        <>
          {/* <GridDebugger />
          <Stats /> */}
        </>
      )}
      {/* Google Tag Manager - Global base code */}
      {process.env.NODE_ENV !== 'development' && (
        <>
          <Script
            async
            strategy="worker"
            src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
          />
          <Script
            id="gtm-base"
            strategy="worker"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GTM_ID}');`,
            }}
          />
        </>
      )}
      {/* <PageTransition /> */}
      <RealViewport />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
