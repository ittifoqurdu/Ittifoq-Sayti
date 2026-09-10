import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

const MotionDiv = motion.div

export default function CustomCursor({ children }) {
  const [enabled, setEnabled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const finePointerQuery = window.matchMedia('(pointer: fine)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const syncCapability = () => {
      setEnabled(finePointerQuery.matches && !reducedMotionQuery.matches)
    }

    syncCapability()
    finePointerQuery.addEventListener('change', syncCapability)
    reducedMotionQuery.addEventListener('change', syncCapability)

    return () => {
      finePointerQuery.removeEventListener('change', syncCapability)
      reducedMotionQuery.removeEventListener('change', syncCapability)
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('cursor-none-active')
      return undefined
    }

    const updateMousePosition = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    const handleMouseOver = (event) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const isClickable =
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null

      setIsHovering(isClickable)
    }

    document.body.classList.add('cursor-none-active')
    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.body.classList.remove('cursor-none-active')
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [enabled])

  return (
    <>
      {enabled ? (
        <>
          <MotionDiv
            className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-white mix-blend-difference"
            animate={{
              x: mousePosition.x - 4,
              y: mousePosition.y - 4,
              scale: isHovering ? 0 : 1,
            }}
            transition={{
              type: 'tween',
              ease: 'backOut',
              duration: 0.1,
            }}
          />
          <MotionDiv
            className="pointer-events-none fixed left-0 top-0 z-[99] h-8 w-8 rounded-full border border-white mix-blend-difference"
            animate={{
              x: mousePosition.x - 16,
              y: mousePosition.y - 16,
              scale: isHovering ? 1.5 : 1,
              backgroundColor: isHovering ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
            }}
            transition={{
              type: 'tween',
              ease: 'backOut',
              duration: 0.15,
            }}
          />
        </>
      ) : null}
      {children}
    </>
  )
}

