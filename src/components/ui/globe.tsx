import { useEffect, useRef } from 'react'
import createGlobe, { type COBEOptions } from 'cobe'
import { cn } from '@/lib/utils'
import { useTheme } from '@/context/ThemeContext'

const PARTNER_MARKERS = [
  { location: [41.55, 60.63], size: 0.15 }, // Urganch, Uzbekistan (Headquarters)
  { location: [46.62, 14.30], size: 0.08 }, // Klagenfurt, Austria
  { location: [50.98, 11.32], size: 0.08 }, // Weimar, Germany
  { location: [42.35, 13.39], size: 0.08 }, // L'Aquila, Italy
  { location: [37.88, -4.77], size: 0.08 }, // Cordoba, Spain
  { location: [52.23, 21.01], size: 0.08 }, // Warsaw, Poland
  { location: [41.00, 28.97], size: 0.09 }, // Istanbul, Turkey
  { location: [55.75, 37.61], size: 0.08 }, // Moscow, Russia
  { location: [31.23, 121.47], size: 0.08 }, // Shanghai, China
  { location: [3.13, 101.68], size: 0.08 }, // Malaysia
  { location: [43.23, 76.88], size: 0.08 }, // Almaty, Kazakhstan
]

export function Globe({
  className,
  config = {},
}: {
  className?: string
  config?: Partial<COBEOptions>
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phiRef = useRef(-1.2)
  const pointerInteractingRef = useRef<number | null>(null)
  const pointerRotationRef = useRef(0)
  const { isDark } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const themeConfig: Partial<COBEOptions> = isDark
      ? {
          dark: 1,
          diffuse: 1.2,
          mapSamples: 16000,
          mapBrightness: 2.5,
          baseColor: [0.15, 0.2, 0.28],
          markerColor: [16 / 255, 185 / 255, 129 / 255],
          glowColor: [0.08, 0.2, 0.3],
          backgroundColor: [0, 0, 0, 0],
        }
      : {
          dark: 0,
          diffuse: 0.8,
          mapSamples: 16000,
          mapBrightness: 1.2,
          baseColor: [0.93, 0.89, 0.83],
          markerColor: [16 / 255, 185 / 255, 129 / 255],
          glowColor: [0.96, 0.93, 0.88],
          backgroundColor: [0, 0, 0, 0],
        }

    const mergedConfig: COBEOptions = {
      width: 700,
      height: 700,
      onRender: () => {},
      devicePixelRatio: 2,
      phi: -1.2,
      theta: 0.32,
      dark: isDark ? 1 : 0,
      diffuse: 1,
      mapSamples: 16000,
      mapBrightness: 1.5,
      baseColor: [0.2, 0.25, 0.35],
      markerColor: [16 / 255, 185 / 255, 129 / 255],
      glowColor: [0.1, 0.2, 0.3],
      backgroundColor: [0, 0, 0, 0],
      markers: PARTNER_MARKERS,
      ...themeConfig,
      ...config,
    }

    const onResize = () => {
      const size = canvas.offsetWidth
      canvas.width = size * 2
      canvas.height = size * 2
    }

    onResize()
    window.addEventListener('resize', onResize)
    canvas.style.cursor = 'grab'
    canvas.style.touchAction = 'none'

    const handlePointerDown = (event: PointerEvent) => {
      pointerInteractingRef.current = event.clientX
      canvas.style.cursor = 'grabbing'
      canvas.setPointerCapture?.(event.pointerId)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (pointerInteractingRef.current === null) return
      const deltaX = event.clientX - pointerInteractingRef.current
      pointerInteractingRef.current = event.clientX
      pointerRotationRef.current += (deltaX / canvas.offsetWidth) * Math.PI * 0.9
    }

    const stopPointerInteraction = (event?: PointerEvent) => {
      if (pointerInteractingRef.current === null) return
      phiRef.current += pointerRotationRef.current
      pointerRotationRef.current = 0
      pointerInteractingRef.current = null
      canvas.style.cursor = 'grab'
      if (event) {
        canvas.releasePointerCapture?.(event.pointerId)
      }
    }

    canvas.addEventListener('pointerdown', handlePointerDown)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerup', stopPointerInteraction)
    canvas.addEventListener('pointercancel', stopPointerInteraction)
    canvas.addEventListener('pointerleave', stopPointerInteraction)

    const userOnRender = mergedConfig.onRender

    const globe = createGlobe(canvas, {
      ...mergedConfig,
      width: canvas.width,
      height: canvas.height,
      onRender: (state) => {
        if (pointerInteractingRef.current === null) {
          phiRef.current += 0.001
        }
        state.phi = phiRef.current + pointerRotationRef.current
        state.width = canvas.width
        state.height = canvas.height
        userOnRender?.(state)
      },
    })

    canvas.style.opacity = '1'

    return () => {
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('pointerdown', handlePointerDown)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerup', stopPointerInteraction)
      canvas.removeEventListener('pointercancel', stopPointerInteraction)
      canvas.removeEventListener('pointerleave', stopPointerInteraction)
      globe.destroy()
    }
  }, [config, isDark])

  return (
    <div className={cn('relative z-[1] mx-auto aspect-square w-[300px] sm:w-[360px] lg:w-[380px]', className)}>
      <canvas
        ref={canvasRef}
        className="size-full opacity-0 transition-opacity duration-500"
      />
    </div>
  )
}

export default Globe
