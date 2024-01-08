import { RefObject, useEffect, useCallback, useRef, useState } from 'react'
import { animated, useSpring } from 'react-spring'

import { useHeaderHeightDispatch } from '~contexts/headerHeightContext'

import { useStickyNavBar } from '../hooks'
import { useAnimatedAppearing } from './hooks'
import HamburgerIcon from './HamburgerIcon'
import HeadNavigationMobile from './HeadNavigationMobile'
import Options from './Options'
import OptionsBtn from './OptionsBtn'

import styles from './HeaderMobile.module.css'

const HeaderMobile = () => {
  const setHeaderHeight = useHeaderHeightDispatch()
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isOptionsOpen, setOptionsOpen] = useState(false)

  const { appearingSpring } = useAnimatedAppearing()

  const headerDOM = useRef<HTMLElement>(null)
  const headerHeight = headerDOM.current?.offsetHeight ?? 0

  // used via useImperativeHandle in OptionsBtn
  type optionsBtnRefType = { optionsBtnDOM: RefObject<HTMLButtonElement> }
  const optionsBtnRef = useRef<optionsBtnRefType>()
  const optionsBtnDOM = (optionsBtnRef?.current?.optionsBtnDOM.current ||
    null) as Element

  useEffect(() => {
    setHeaderHeight(headerDOM.current?.offsetHeight ?? 0)
    return () => setHeaderHeight(0)
  }, [headerHeight, setHeaderHeight])

  const { isFixed, isShown, isScrollDown } = useStickyNavBar(headerHeight)

  // animate header on scroll up
  const { headerTop } = useSpring({
    config: { duration: 200 },
    headerTop: isShown ? -1 : -headerHeight
  })

  const onHamburgerClick = useCallback(
    () => setMenuOpen((i) => !i),
    [setMenuOpen]
  )
  const onOptionsClick = useCallback(
    () => setOptionsOpen((i) => !i),
    [setOptionsOpen]
  )

  const menuHeight = headerHeight - (isFixed ? 1 : 0) || 0

  return (
    // keep it in single element (not Fragment) to make css-grid works
    <div>
      <animated.header
        ref={headerDOM}
        className={styles.header}
        style={{
          ...appearingSpring,
          position: isFixed ? 'fixed' : 'absolute',
          transform: isFixed
            ? headerTop.interpolate((i) => `translate3d(0, ${i}px, 0)`)
            : 'initial'
        }}
      >
        <div className={styles.hamburgerContainer}>
          <HamburgerIcon isOpen={isMenuOpen} onClick={onHamburgerClick} />
        </div>
        <h1 className={styles.title}>Your Style</h1>
        <div className={styles.optionsContainer}>
          <OptionsBtn
            isOpen={isOptionsOpen}
            onClick={onOptionsClick}
            ref={optionsBtnRef}
          />
        </div>
      </animated.header>

      {/* Moved outside because animated header (transform) breaks position: fixed for child elements */}
      <HeadNavigationMobile
        isOpen={isMenuOpen}
        menuHeight={menuHeight}
        setMenuOpen={setMenuOpen}
      />
      <Options
        isOpen={isOptionsOpen}
        menuHeight={menuHeight}
        setOptionsOpen={setOptionsOpen}
        isFixed={isFixed}
        isScrollDown={isScrollDown}
        headerTop={headerTop}
        optionsBtnDOM={optionsBtnDOM}
      />
    </div>
  )
}

export default HeaderMobile
