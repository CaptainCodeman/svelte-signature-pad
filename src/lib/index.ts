import { getStroke } from 'perfect-freehand'
import { cubicInOut } from 'svelte/easing'
import { getSvgPathFromStroke } from './svg-path'

const linear = (t: number) => t

// TODO: pass in / allow overriding
const strokeOptions = {
  size: 8,
  thinning: 0.7,
  smoothing: 0.4,
  streamline: 0.6,
  easing: linear,
  start: {
    taper: 30,
    easing: cubicInOut,
    cap: true,
  },
  end: {
    taper: 10,
    easing: cubicInOut,
    cap: true,
  },
}

interface Options {
  ondraw: (path: string) => void
  oncomplete: (path: string) => void
}

export function signature(node: HTMLElement, options: Options) {
  const points: number[][] = []

  function render(complete: boolean) {
    const stroke = getStroke(points, strokeOptions)
    const path = getSvgPathFromStroke(stroke)
    if (complete) {
      options.oncomplete(path)
    } else {
      options.ondraw(path)
    }
  }

  let down = false

  function pointerDown(e: PointerEvent) {
    node.setPointerCapture(e.pointerId)
    points.push([e.offsetX, e.offsetY, e.pressure])
    render(false)
    down = true
  }

  function pointerMove(e: PointerEvent) {
    if (down && e.isPrimary) {
      points.push([e.offsetX, e.offsetY, e.pressure])
      render(false)
    }
  }

  function pointerUp(e: PointerEvent) {
    node.releasePointerCapture(e.pointerId)

    render(true)

    down = false
    points.length = 0
  }

  node.addEventListener('pointerdown', pointerDown, { passive: true })
  node.addEventListener('pointermove', pointerMove, { passive: true })
  node.addEventListener('pointerup', pointerUp, { passive: true })
  node.addEventListener('pointercancel', pointerUp, { passive: true })

  return {
    destroy() {
      node.removeEventListener('pointerdown', pointerDown)
      node.removeEventListener('pointermove', pointerMove)
      node.removeEventListener('pointerup', pointerUp)
      node.removeEventListener('pointercancel', pointerUp)
    },
  }
}
