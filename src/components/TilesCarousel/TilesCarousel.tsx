import useEmblaCarousel from 'embla-carousel-react'

import { TilesCarouselComponent } from '~api/pageApi'
import useResizeObserver from '~shared/hooks/useResizeObserver'
import LinkExtended from '~components/LinkExtended'
import { LocaleType, useLocalization } from '~contexts/localizationContext'
import { LOCALE_STRINGS } from '~constants/languages'
import classNames from '~shared/utils/classNames'

import pageStyles from '~components/Page/Page.module.css'
import styles from './TilesCarousel.module.css'

const dateOptions: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
}

const getDateString = (date: string, locale: LocaleType) =>
  new Date(date).toLocaleDateString(LOCALE_STRINGS.get(locale), dateOptions)

const TilesCarousel = ({
  contentWidth = 'content',
  items
}: TilesCarouselComponent) => {
  const [bindResizeObserver, { width }] = useResizeObserver<HTMLDivElement>()
  const [emblaRef] = useEmblaCarousel()
  const [{ locale }, , { data }] = useLocalization()
  const lastUpdated = data?.lastUpdated as string

  return (
    <div
      ref={bindResizeObserver}
      className={classNames(pageStyles[contentWidth], styles.root)}
    >
      <div
        ref={emblaRef}
        style={{ width }}
        className={styles.carouselContainer}
      >
        <div className={styles.cardContainer}>
          {items.map((item, idx) => (
            <LinkExtended key={idx} to={`/${locale}${item.link}`}>
              <div
                style={{
                  backgroundImage: `url(${item.image})`
                }}
                className={styles.card}
              >
                <img src={item.image} alt="" />
                <div className={styles.cardInfo}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className={styles.cardAdditionalInfo}>
                  <div>
                    <div>
                      {item.updated ? (
                        <>
                          <div>👁 {item.views}</div>
                          <div>🗨 {item.comments}</div>
                        </>
                      ) : (
                        <>
                          👁 {item.views} 🗨 {item.comments}
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    {item.updated ? (
                      <div className={styles.dates}>
                        <div>{getDateString(item.created, locale)}</div>
                        <div>
                          {lastUpdated} {getDateString(item.updated, locale)}
                        </div>
                      </div>
                    ) : (
                      <div>{getDateString(item.created, locale)}</div>
                    )}
                  </div>
                </div>
              </div>
            </LinkExtended>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TilesCarousel
