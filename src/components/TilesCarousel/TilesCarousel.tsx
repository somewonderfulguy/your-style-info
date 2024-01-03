// import useEmblaCarousel from 'embla-carousel-react'

import { TilesCarouselComponent } from '~api/pageApi'

import pageStyles from '~components/Page/Page.module.css'
import styles from './TilesCarousel.module.css'
import classNames from '~shared/utils/classNames'

const TilesCarousel = ({
  contentWidth = 'content'
}: TilesCarouselComponent) => (
    <>
      <div />
      <div className={classNames(styles.grid, pageStyles[contentWidth])}>
        <div>
          <img src="/img/thumbs/trench_thumb.jpg" alt="" />
        </div>
        <div>
          <img src="/img/thumbs/baudoin_lange_thumb.jpg" alt="" />
        </div>
        <div>
          <img src="/img/thumbs/white_sneakers_thumb.jpg" alt="" />
        </div>
      </div>
    </>
  )

export default TilesCarousel
