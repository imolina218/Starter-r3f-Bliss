import { Image, Kinesis, Slider } from '@studio-freight/compono'
import { useMediaQuery, useRect } from '@studio-freight/hamo'
import { useLenis } from '@studio-freight/react-lenis'
import { types } from '@theatre/core'
import { MarqueeScroll } from 'components/marquee-scroll'
import { Sticky } from 'components/sticky'
import { Layout } from 'layouts/default'
import { useSheet } from 'lib/theatre'
import { useTheatre } from 'lib/theatre/hooks/use-theatre'
import { useRef } from 'react'
import { Marquee } from '../../components/marquee'
import s from './home.module.scss'

/* const devs = [
  {
    name: 'Franco',
    position: 'Pizza of Pizza',
    image: 'https://assets.studiofreight.com/devs/franco.png',
  },
  {
    name: 'Clement',
    position: 'Expert on Dark Magic',
    image: 'https://assets.studiofreight.com/devs/clement.png',
  },
  {
    name: 'Leandro',
    position: 'He didnt fucked it up',
    image: 'https://assets.studiofreight.com/devs/leandro.png',
  },
  {
    name: 'Guido',
    position: 'Avoids owning projects',
    image: 'https://assets.studiofreight.com/devs/guido.png',
  },
] */

//TODO not array of objects, just a simple array
const details = [
  {
    detail: 'Latest technology x8 times faster than regular optical fiber',
  },
  {
    detail: 'Longest transatlantic underwater  connection infrastructure',
  },
  {
    detail: 'Fastest growing underground connection wired',
  },
  {
    detail: 'Cutting edge scientists working in the latest innovations',
  },
  {
    detail: 'Biggest fiber-optic cable manufacturer and supplier in the world',
  },
  {
    detail:
      'Safest servers military grade to ensure the quality of VPN and proxies',
  },
]

export default function Home() {
  const rectRef = useRef()
  const [setRef, rect] = useRect()
  const isDesktop = useMediaQuery('(min-width: 800px)')

  useLenis(
    ({ scroll }) => {
      const top = rect.top - scroll
      const left = rect.left
      const width = rect.width
      const height = rect.height

      const string = `left:${Math.round(left)}px<br>top:${Math.round(
        top
      )}px<br>width:${width}px<br>height:${height}px<br>right:${Math.round(
        left + width
      )}px<br>bottom:${Math.round(top + height)}px`
      // rectRef.current.innerHTML = string
    },
    [rect],
    1
  )

  const theatreRectRef = useRef()

  const sheet = useSheet('Home')

  useTheatre(
    sheet,
    'hero',
    {
      visible: true,
      x: types.number(0, { range: [-100, 100] }),
      y: types.number(0, { range: [-100, 100] }),
    },
    {
      onValuesChange: ({ x, y, visible }) => {
        theatreRectRef.current.style.transform = `translate3d(${x}%,${y}%,0)`
        theatreRectRef.current.style.opacity = visible ? 1 : 0
      },
    }
  )

  return (
    <Layout theme="light">
      <section className={s.home} id="top">
        <div className={s.theatreRect} ref={theatreRectRef} />
        {/* {isDesktop === true ? (
          <span>only desktop and no SSR</span>
        ) : (
          <span>only mobile and SSR</span>
        )} */}
        <Kinesis speed={40}>
          <div className={s['hero']}>
            <h1>bliss</h1>
            <h2>Fastest home optic fiber internet supplier</h2>
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
        </Kinesis>

        <div id={s['vertical']} className={s['vertical']}>
          <div className={s['vertical-container']}>
            <div className={s['vertical-content']}>
              <Sticky start="400" end="740">
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
          <MarqueeScroll className={s.marquee} inverted repeat={4}>
            <span className={s.item}>--- best latency</span>
          </MarqueeScroll>
          <MarqueeScroll className={s.marquee} repeat={4}>
            <span className={s.item}>--- high bandwidth</span>
          </MarqueeScroll>
        </div>

        <Kinesis speed={40}>
          <div className={s['our-history']}>
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
        </Kinesis>

        <Slider
          emblaApi={{
            align: 'center',
            skipSnaps: false,
            autoplay: false,
            loop: true,
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
                          alt=""
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

        <div className={s['choose-plan']}>
          <div></div>
          <div className={s['plans-container']}>
            <p className={s['title']}>Choose Your Plan</p>

            <div className={s['plans-array']}>
              <button className={s['plan-button']}>beginner</button>
              <button className={s['plan-button']}>enhance</button>
              <button className={s['plan-button']}>ultimate</button>
            </div>

            <div className={s['plan-container']}>
              <div className={s['characteristics']}>
                <ul>
                  <li> 10 GB/s symetryc optic fiber</li>
                  <li> Ethernet 2.4 GHz and 5.4 GHz </li>
                  <li> Wi-Fi 2.4 GHz</li>
                  <li> VPN and proxys not included </li>
                </ul>
              </div>
              <div className={s['price']}>
                <p>
                  $42<span>/mo.</span>
                </p>
              </div>
            </div>
            <div className={s['select-plan']}>
              <button>select plan</button>
            </div>
          </div>
        </div>

        <div className={s['billing-information']}>
          <div className={s['billing-container']}>
            <div className={s['plan-information']}>
              <p>Billing Information</p>
              <p>Beginner plan</p>
              <p>
                $42<span>/mo.</span>
              </p>
            </div>

            <form className={s['card-information']}>
              <div className={s['payment-network']}>
                <select name="select">
                  <option value="american express">american express</option>
                  <option value="visa">visa</option>
                  <option value="discover">discover</option>
                  <option value="mastercard">mastercard</option>
                </select>

                {/* <input list="cards" id="myCard" name="myCard" />
                <datalist id="cards">
                  <option value="mastercard" selected></option>
                  <option value="discover"></option>
                  <option value="visa"></option>
                </datalist> */}
              </div>

              <div className={s['card-name']}>
                <label htmlFor="">Name:</label>
                <input type="text" />
              </div>
              <div className={s['card-number']}>
                <label htmlFor="">Card Number:</label>
                <input type="number" />
              </div>
              <div className={s['expiration']}>
                <label htmlFor="">Expiration:</label>
                <input type="number" placeholder="mm" />
                <input type="number" placeholder="yy" />
              </div>
              <div className={s['cvc']}>
                <label htmlFor="">CVC/CVV:</label>
                <input type="number" placeholder="- - -" />
              </div>
            </form>
            <form className={s['user-information']}>
              <input type="text" placeholder="full name" />
              <input type="text" placeholder="city" />
              <input type="number" placeholder="zip code" />
              <input type="text" placeholder="address" />
              <input type="number" placeholder="phone number" />
            </form>

            <button>purchase</button>
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
