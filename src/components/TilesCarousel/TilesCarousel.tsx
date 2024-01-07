import useEmblaCarousel from 'embla-carousel-react'

import { TilesCarouselComponent } from '~api/pageApi'
import classNames from '~shared/utils/classNames'
import useResizeObserver from '~shared/hooks/useResizeObserver'

import pageStyles from '~components/Page/Page.module.css'
import styles from './TilesCarousel.module.css'

const TilesCarousel = ({
  contentWidth = 'content'
}: TilesCarouselComponent) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bindResizeObserver, { width }] = useResizeObserver<HTMLDivElement>()
  const [emblaRef] = useEmblaCarousel()

  return (
    <div
      ref={bindResizeObserver}
      className={classNames(pageStyles[contentWidth], styles.wrapper)}
    >
      <div ref={emblaRef}>
        <div className={styles.container}>
          <div className={styles.card}>
            <img src="/img/thumbs/trench_thumb.jpg" alt="" />
            <div className={styles.cardInfo}>
              <h3>Trench coat</h3>
              <p>
                In depth trench coat guide. How to wear, where to buy, detailed
                description, history.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <img src="/img/thumbs/baudoin_lange_thumb.jpg" alt="" />
            <div className={styles.cardInfo}>
              <h3>Suede shoes care</h3>
              <p>
                Learn how to clean up your suede shoes and keep them in good
                condition.
              </p>
            </div>
          </div>
          <div className={styles.card}>
            <img src="/img/thumbs/white_sneakers_thumb.jpg" alt="" />
            <div className={styles.cardInfo}>
              <h3>White leather sneakers cleaning</h3>
              <p>Guide on how to clean your white leather sneakers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TilesCarousel
