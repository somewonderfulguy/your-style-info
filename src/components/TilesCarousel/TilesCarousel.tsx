import useEmblaCarousel from 'embla-carousel-react'

import { TilesCarouselComponent } from '~api/pageApi'
import useResizeObserver from '~shared/hooks/useResizeObserver'

import pageStyles from '~components/Page/Page.module.css'
import styles from './TilesCarousel.module.css'

const TilesCarousel = ({
  contentWidth = 'content'
}: TilesCarouselComponent) => {
  const [bindResizeObserver, { width }] = useResizeObserver<HTMLDivElement>()
  const [emblaRef] = useEmblaCarousel()

  return (
    <div ref={bindResizeObserver} className={pageStyles[contentWidth]}>
      <div ref={emblaRef} style={{ width: width }} className={styles.wrapper}>
        <div className={styles.cardContainer}>
          <div
            style={{
              backgroundImage: 'url(/img/thumbs/trench_thumb.jpg)'
            }}
            className={styles.card}
          >
            <img src="/img/thumbs/trench_thumb.jpg" alt="" />
            <div className={styles.cardInfo}>
              <h3>Trench coat</h3>
              <p>
                In depth trench coat guide. How to wear, where to buy, detailed
                description, history.
              </p>
            </div>
            <div className={styles.cardAdditionalInfo}>
              <div>
                <div>👁 23 🗨 3</div>
              </div>
              <div>
                <div>07 Jan 2024</div>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundImage: 'url(/img/thumbs/baudoin_lange_thumb.jpg)'
            }}
            className={styles.card}
          >
            <img src="/img/thumbs/baudoin_lange_thumb.jpg" alt="" />
            <div className={styles.cardInfo}>
              <h3>Suede shoes care</h3>
              <p>
                Learn how to clean up your suede shoes and keep them in good
                condition.
              </p>
            </div>
            <div className={styles.cardAdditionalInfo}>
              <div>
                <div>👁 23</div>
                <div>🗨 3</div>
              </div>
              <div className={styles.dates}>
                <div>11 Nov 2023</div>
                <div>last upd. 07 Jan 2024</div>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundImage: 'url(/img/thumbs/white_sneakers_thumb.jpg)'
            }}
            className={styles.card}
          >
            <img src="/img/thumbs/white_sneakers_thumb.jpg" alt="" />
            <div className={styles.cardInfo}>
              <h3>White leather sneakers cleaning</h3>
              <p>Guide on how to clean your white leather sneakers.</p>
            </div>
            <div className={styles.cardAdditionalInfo}>
              <div>
                <div>👁 23 🗨 3</div>
              </div>
              <div>
                <div>07 Jan 2024</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TilesCarousel
