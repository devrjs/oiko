'use client'

import { useEffect, useRef } from 'react'

// Tinta da chuva e vazio resolvidas dos tokens --auth-rain/--auth-void
// (DESIGN.md, "The Auth Rain Exception"). fallback mantém o efeito vivo
// se o token faltar no primeiro paint.
const RAIN_FALLBACK = [140, 235, 195]
const VOID_FALLBACK = '0, 0, 0'

const CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF'

// oklch/rgb moderno não entram em fillStyle; a sonda resolve para rgb
// computado. Normalizamos a sintaxe espacial (r g b) para vírgulas antes
// de atribuir — sintaxe não reconhecida era silenciosamente herdada e
// pintava o canvas na cor errada (o dilúvio verde-menta de 2026-09-14).
function probeColor(value: string, probe: HTMLElement): number[] | null {
  const css = value.trim().replace(/^rgb\(([^)]+)\)$/i, (_, inner) => {
    const parts = inner.trim().split(/\s+/)
    return parts.length === 3 && !inner.includes(',')
      ? `rgb(${parts.join(', ')})`
      : value.trim()
  })
  probe.style.color = '#000'
  probe.style.color = css
  const computed = getComputedStyle(probe).color
  // se a atribuição falhou, a sonda retorna o preto da última atribuição
  // válida; preto explícito só é aceito quando foi o próprio valor pedido
  const nums = computed.match(/[\d.]+/g)
  if (!nums || nums.length < 3) return null
  return nums.slice(0, 3).map(Number)
}

export function UnicornBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const probe = document.createElement('span')
    probe.style.display = 'none'
    probe.setAttribute('aria-hidden', 'true')
    document.body.appendChild(probe)
    const styles = getComputedStyle(document.documentElement)
    const rain =
      probeColor(styles.getPropertyValue('--auth-rain'), probe) ?? RAIN_FALLBACK
    const voidRgb =
      probeColor(styles.getPropertyValue('--auth-void'), probe)?.join(', ') ??
      VOID_FALLBACK
    probe.remove()
    const [gr, gg, gb] = rain

    // prefers-reduced-motion: um frame estático do campo de chuva e para.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let animationId = 0
    let time = 0
    let visible = true
    let resizeTimer = 0

    const fontSize = 14
    let columns: number
    let drops: number[]
    let speeds: number[]
    let brightness: number[]
    let cssW = window.innerWidth
    let cssH = window.innerHeight

    const init = () => {
      columns = Math.ceil(cssW / fontSize)
      drops = Array.from({ length: columns }, () => {
        return (Math.random() * -cssH) / fontSize
      })
      speeds = Array.from({ length: columns }, () => 0.2 + Math.random() * 0.6)
      brightness = Array.from(
        { length: columns },
        () => 0.3 + Math.random() * 0.7
      )
    }

    const paintStatic = () => {
      ctx.fillStyle = `rgb(${voidRgb})`
      ctx.fillRect(0, 0, cssW, cssH)
      ctx.font = `${fontSize}px monospace`
      for (let i = 0; i < columns; i++) {
        // ~80% das colunas recebem uma trilha: o frame parado precisa
        // carregar a identidade do efeito, não só insinuar ela
        if (Math.random() > 0.8) continue
        const headY = Math.random() * cssH
        const b = 0.3 + Math.random() * 0.7
        for (let t = 0; t < 8; t++) {
          const a = (0.9 - t * 0.11) * b
          if (a <= 0) break
          ctx.fillStyle = `rgba(${gr},${gg},${gb},${a})`
          ctx.fillText(
            CHARS[Math.floor(Math.random() * CHARS.length)],
            i * fontSize,
            headY - t * fontSize
          )
        }
      }
    }

    const resize = () => {
      // DPR capado a 2: nitidez em HiDPI sem estourar fill-rate
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cssW = window.innerWidth
      cssH = window.innerHeight
      canvas.width = Math.floor(cssW * dpr)
      canvas.height = Math.floor(cssH * dpr)
      canvas.style.width = `${cssW}px`
      canvas.style.height = `${cssH}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      init()
      if (reducedMotion.matches) paintStatic()
    }
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resize, 150)
    }
    resize()
    window.addEventListener('resize', onResize)

    // aba oculta não precisa de 60fps queimando bateria
    const onVisibility = () => {
      visible = document.visibilityState === 'visible'
    }
    document.addEventListener('visibilitychange', onVisibility)

    if (reducedMotion.matches) {
      paintStatic()
      const onMotionPref = () => window.location.reload()
      reducedMotion.addEventListener('change', onMotionPref)
      return () => {
        window.removeEventListener('resize', onResize)
        document.removeEventListener('visibilitychange', onVisibility)
        reducedMotion.removeEventListener('change', onMotionPref)
        window.clearTimeout(resizeTimer)
      }
    }

    const draw = () => {
      time += 0.016
      const w = cssW
      const h = cssH

      if (visible) {
        // Fade trail
        ctx.fillStyle = `rgba(${voidRgb}, 0.04)`
        ctx.fillRect(0, 0, w, h)

        ctx.font = `${fontSize}px monospace`

        for (let i = 0; i < columns; i++) {
          const x = i * fontSize
          const y = drops[i] * fontSize

          // Bright head character
          const headAlpha = 0.9 * brightness[i]
          ctx.fillStyle = `rgba(${gr},${gg},${gb},${headAlpha})`
          const char = CHARS[Math.floor(Math.random() * CHARS.length)]
          ctx.fillText(char, x, y)

          // Dimmer trail characters
          for (let t = 1; t < 4; t++) {
            const trailY = y - t * fontSize
            const trailAlpha = (0.3 - t * 0.07) * brightness[i]
            if (trailAlpha > 0) {
              ctx.fillStyle = `rgba(${gr},${gg},${gb},${trailAlpha})`
              ctx.fillText(
                CHARS[Math.floor(Math.random() * CHARS.length)],
                x,
                trailY
              )
            }
          }

          // Reset when off screen
          if (y > h && Math.random() > 0.985) {
            drops[i] = Math.random() * -20
            speeds[i] = 0.2 + Math.random() * 0.6
            brightness[i] = 0.3 + Math.random() * 0.7
          }

          drops[i] += speeds[i]
        }

        // Horizontal scanline
        const scanY = (time * 30) % h
        ctx.fillStyle = `rgba(${gr},${gg},${gb},0.03)`
        ctx.fillRect(0, scanY, w, 2)

        // Occasional glitch
        if (Math.random() > 0.98) {
          const glitchY = Math.random() * h
          const glitchH = 2 + Math.random() * 6
          const shift = -10 + Math.random() * 20
          const dpr = Math.min(window.devicePixelRatio || 1, 2)
          ctx.save()
          ctx.setTransform(1, 0, 0, 1, 0, 0)
          ctx.drawImage(
            canvas,
            0,
            glitchY * dpr,
            canvas.width,
            glitchH * dpr,
            shift * dpr,
            glitchY * dpr,
            canvas.width,
            glitchH * dpr
          )
          ctx.restore()
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    // fundo sólido antes do primeiro fade, senão o trail acumula translúcido
    ctx.fillStyle = `rgb(${voidRgb})`
    ctx.fillRect(0, 0, cssW, cssH)
    draw()

    return () => {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      window.clearTimeout(resizeTimer)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      // decorativo e fora da ordem de tab — a semente do efeito, não conteúdo
      tabIndex={-1}
      aria-hidden='true'
      className='pointer-events-none fixed inset-0'
    />
  )
}
