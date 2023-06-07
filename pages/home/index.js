import { useLenis } from '@studio-freight/react-lenis'
import { Form } from 'components/form'
import { Image } from 'components/image'
import { Marquee } from 'components/marquee'
import { MarqueeScroll } from 'components/marquee-scroll'
import { Slider } from 'components/slider'
import { Sticky } from 'components/sticky'
import { Layout } from 'layouts/default'
import { useRef, useState } from 'react'
import Experience from '../../components/experience/Experience'
import s from './home.module.scss'

const details = [
  {
    detail: 'Latest technology x8 times faster than regular optical fiber',
  },
  {
    detail: 'Longest atlantic underwater  connection infrastructure',
  },
  {
    detail: 'Fastest growing underground connection wired',
  },
  {
    detail: 'Cutting edge scientists working in the latest innovations',
  },
  {
    detail: 'Biggest fiber-optic cable supplier in the world',
  },
  {
    detail:
      'Safest servers military grade to ensure the quality of VPN and proxies',
  },
]

const plans = [
  [
    'Beginner',
    [
      '10 GB/s symetryc optic fiber',
      'Ethernet 2.4 GHz and 5.4 GHz',
      'Wi-Fi 2.4 GHz',
      'VPN and proxys not included',
      42,
      [0, 183, 202],
    ],
  ],
  [
    'Enhance',
    [
      '50 GB/s symetryc optic fiber ',
      'Ethernet 2.4 GHz and 5.4 GHz  ',
      'Wi-Fi 5.4 GHz',
      'VPN and proxys included ',
      64,
      [0, 202, 0],
    ],
  ],
  [
    'Ultimate',
    [
      '100 GB/s symetryc optic fiber ',
      'Ethernet 2.4 GHz, 5.4 GHz and 6 GHz',
      'Wi-Fi 5.4 GHz and 6e',
      'VPN and proxys included  ',
      99,
      [242, 0, 112],
    ],
  ],
]

export default function Home() {
  const [progres, setProgres] = useState(0)
  const sequenceRef = useRef([1, [0, 2]])
  const [plan, setPlan] = useState(plans[0])

  const handleScrollToView = () => {
    const purchase = document.getElementById('purchase-section')
    purchase.scrollIntoView({ behavior: 'smooth' })
  }

  const handlePlan = (e) => {
    setPlan(plans[e.target.id])
  }

  useLenis(({ progress }) => {
    const roundedProgress = progress.toFixed(2)

    setProgres(roundedProgress)

    const updatedSequence =
      roundedProgress <= 0.01
        ? [1, [0, 3]]
        : roundedProgress <= 0.14
        ? [2, [3, 7]]
        : roundedProgress <= 0.38
        ? [3, [7.1, 11]]
        : roundedProgress <= 0.53
        ? [4, [11.1, 15]]
        : roundedProgress <= 0.62
        ? [5, [15.1, 19]]
        : roundedProgress <= 0.74
        ? [6, [19.1, 21]]
        : roundedProgress <= 0.82
        ? [7, [21.1, 23]]
        : roundedProgress <= 0.93
        ? [8, [23.1, 27]]
        : [9, [27.1, 29]]

    sequenceRef.current = updatedSequence
  })

  /*  useEffect(() => {
    console.log(sequenceRef.current[0])
  }, [sequenceRef.current])
  */
  /* const updatedSequence =
      progress <= 0.01
        ? ['normal', [0, 0.01]]
        : progress <= 0.14
        ? ['normal', [0, 4]]
        : progress <= 0.38
        ? ['normal', [4, 8]]
        : progress <= 0.53
        ? ['normal', [8, 10]]
        : progress <= 0.62
        ? ['normal', [10, 16]]
        : progress <= 0.74
        ? ['normal', [16, 18]]
        : progress <= 0.82
        ? ['normal', [18, 20]]
        : progress <= 0.93
        ? ['normal', [20, 24]]
        : ['normal', [24, 26]]

    sequenceRef.current = updatedSequence */

  /* 

  /* let progres
  let sequenceRef = useRef(['normal', [0, 0.01]])

  useLenis(({ progress }) => {
    progress.toFixed(2)

    progres = progress.toFixed(2)
    //console.log(sequenceRef.current[1])
    //console.log(progress)

    progress <= 0.01
      ? (sequenceRef.current = ['normal', [0, 0.01]])
      : progress <= 0.14
      ? (sequenceRef.current = ['normal', [0, 4]])
      : progress <= 0.38
      ? (sequenceRef.current = ['normal', [4, 8]])
      : progress <= 0.53
      ? (sequenceRef.current = ['normal', [8, 10]])
      : progress <= 0.62
      ? (sequenceRef.current = ['normal', [10, 16]])
      : progress <= 0.74
      ? (sequenceRef.current = ['normal', [16, 18]])
      : progress <= 0.82
      ? (sequenceRef.current = ['normal', [18, 20]])
      : progress <= 0.93
      ? (sequenceRef.current = ['normal', [20, 24]])
      : progress >= 0.93
      ? (sequenceRef.current = ['normal', [24, 26]])
      : null
  }) */

  return (
    <Layout theme="light" className={s['wrap']}>
      <section className={s.home} id="top">
        <Experience sequenceRef={sequenceRef} />

        <div id={'hero'} className={s['hero']}>
          <h1>bliss</h1>
          <h2>Fastest home optic fiber internet supplier</h2>
          {/* <h2>{sequenceRef.current[1]}</h2> */}
        </div>

        <div id={s['plan-over-view']} className={s['plan-over-view']}>
          <div className={s.overView}>
            <p>
              Based on the latest optic fiber technology operating worldwide
              with accessible base connection of 10gb/s
            </p>
          </div>

          <span></span>
          <Marquee className={s.marquee} repeat={3} duration={14}>
            <span className={s.item}>
              {' '}
              <span className={s.plan1}>10 gb/s</span> ---{' '}
              <span className={s.plan2}>50 gb/s</span> ---{' '}
              <span className={s.plan3}>100 gb/s</span> ---
            </span>
          </Marquee>
          <span></span>
        </div>

        <div id={'vertical'} className={s['vertical']}>
          <div className={s['vertical-container']}>
            <div className={s['vertical-content']}>
              <Sticky start="300" end="620">
                <div className={s['col-left']}>
                  <h3>
                    why <span>BLISS</span>?
                  </h3>
                </div>
              </Sticky>
              <div className={s['col-right']}>
                <div className={s['vertical-item']}>
                  <p>
                    “Rising the industry standard BLISS breaks the internet
                    suppliers market.”{' '}
                  </p>
                  <span>- by WIRED</span>
                </div>
                <div className={s['vertical-item']}>
                  <p>
                    “Offers the best combination of price and data speeds.”{' '}
                  </p>
                  <span>- by TechCrunch</span>
                </div>
                <div className={s['vertical-item']}>
                  <p>
                    “The best internet service provider, especially if you work
                    from home.”{' '}
                  </p>
                  <span>- by The Verge</span>
                </div>
                <div className={s['vertical-item']}>
                  <p>
                    “With gaming and streaming, an efficient latency rate is
                    important.”{' '}
                  </p>
                  <span>- by VentureBeat</span>
                </div>
                <div className={s['vertical-item']}>
                  <p>
                    “Coverage is paramount when it comes to which internet
                    provider is best for you.”{' '}
                  </p>
                  <span>- by The Financial Times</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={s['about-pros']}>
          {/* <MarqueeScroll className={s.marquee} inverted speed={0.2} repeat={4}>
            <span className={s.item}>easy set up</span>
          </MarqueeScroll> */}
          <MarqueeScroll className={s.marquee} repeat={4}>
            <span className={s.item}>--- symmetrical</span>
          </MarqueeScroll>
          <MarqueeScroll className={s.marquee} loop={1} repeat={4}>
            <span className={s.item}>--- best latency</span>
          </MarqueeScroll>
          <MarqueeScroll className={s.marquee} repeat={4}>
            <span className={s.item}>--- high bandwidth</span>
          </MarqueeScroll>
        </div>

        <div id={'history'} className={s['our-history']}>
          <div></div>
          <div className={s['history-container']}>
            <h3>Our history</h3>
            <p>
              <span>As technology evolves, so has bliss for 18 years.</span>
              <span>
                Being the leading Internet provider for the largest technology
                companies and governments position us as one of the safest and
                fastest Internet connection providers.
              </span>
              <span>Now we deliver it to your house.</span>
            </p>
          </div>
        </div>

        <Slider
          emblaApi={{
            align: 'center',
            skipSnaps: false,
            autoplay: true,
            loop: false,
          }}
        >
          {({ scrollPrev, scrollNext, emblaRef }) => {
            return (
              <div className={s.slider}>
                <div className={s['slider-header']}>
                  <p>Infraestructure</p>
                </div>
                <div className={s['slide-buttons']}>
                  <button onClick={scrollPrev}>&lt;&lt; prev</button>
                  <button onClick={scrollNext}>next &gt; &gt;</button>
                </div>
                <Slider.Slides ref={emblaRef}>
                  {details.map(({ image, detail }, idx) => (
                    <div className={s['slide']} key={`slide-item-${idx}`}>
                      <div className={s['slide-inner']}>
                        <Image
                          src={'/0' + (idx + 1) + '.webp'}
                          /* `/0{idx + 1}.webp` doesn't work, why ?*/
                          alt="infraestructure"
                          width="400"
                          height="800"
                          className={s['slide-img']}
                          size="20vw"
                        />

                        <p className={s['number']}>0{idx + 1}</p>
                        <p className={s['details']}>{detail}</p>
                      </div>
                    </div>
                  ))}
                </Slider.Slides>
              </div>
            )
          }}
        </Slider>

        <div className={s['device']}>
          <div>
            <p>Device And Installment</p>
            <ul>
              <li>
                - After completing the purchase of a plan an engineer will
                deliver and install the receiver/router in less than{' '}
                <span>4</span> days.
              </li>
              <li>
                - Access to the <span>BLISS</span> app to control and configure
                your network.
              </li>
              <li>
                - <span>24/7</span> IT attention.
              </li>
            </ul>
          </div>
        </div>

        <div id={'plan'} className={s['choose-plan']}>
          <div></div>
          <div className={s['plans-container']}>
            <p className={s['title']}>Choose Your Plan</p>

            <div className={s['plans-array']}>
              <button id="0" className={s['plan-button']} onClick={handlePlan}>
                beginner
              </button>
              <button id="1" className={s['plan-button']} onClick={handlePlan}>
                enhance
              </button>
              <button id="2" className={s['plan-button']} onClick={handlePlan}>
                ultimate
              </button>
            </div>

            <div className={s['plan-container']}>
              <div className={s['characteristics']}>
                <ul>
                  <li> {plan[1][0]} </li>
                  <li> {plan[1][1]} </li>
                  <li> {plan[1][2]} </li>
                  <li> {plan[1][3]} </li>
                </ul>
              </div>
              <div className={s['price']}>
                <p>
                  ${plan[1][4]}
                  <span>/mo.</span>
                </p>
              </div>
            </div>
            <div className={s['select-plan']}>
              <button onClick={handleScrollToView}>select plan</button>
            </div>
          </div>
        </div>

        <div id="purchase-section" className={s['billing-information']}>
          <div className={s['billing-container']}>
            <div className={s['plan-information']}>
              <p>Billing Information</p>
              <p>
                <span
                  style={{
                    color: `rgb(${plan[1][5][0]}, ${plan[1][5][1]}, ${plan[1][5][2]})`,
                  }}
                >
                  {plan[0]}
                </span>{' '}
                plan
              </p>
              <p>
                ${plan[1][4]}
                <span>/mo.</span>
              </p>
            </div>

            <Form />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      id: 'home',
    }, // will be passed to the page component as props
  }
}
