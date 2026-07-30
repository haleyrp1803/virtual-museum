/**
 * Course navigation coordinator.
 *
 * Owns the active stop index and every route that changes course position:
 * direct index movement, stop-ID backlinks, keyboard commands, wheel gestures,
 * and IntersectionObserver updates from native horizontal scrolling.
 *
 * `App.jsx` supplies the ordered `courseStops` array and uses the returned refs
 * and callbacks to connect this hook to the course canvas, stop wrappers,
 * timeline, header controls, Field Notebook backlinks, and Course Map.
 *
 * This file deliberately does not own rendering, notebook state, learner data,
 * or course content. The shared stop IDs remain defined in `data/course.js`.
 */

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Returns true when a keyboard event began inside a control where course-level
 * navigation would interfere with typing or selection.
 */
function isEditableControl(target) {
  return target instanceof HTMLInputElement
    || target instanceof HTMLTextAreaElement
    || target instanceof HTMLSelectElement
}

export function useCourseNavigation(courseStops) {
  const [activeStopIndex, setActiveStopIndex] = useState(0)
  const courseRef = useRef(null)
  const stopRefs = useRef([])
  const wheelLockRef = useRef(false)

  // This matches the previous App.jsx behavior: reduced-motion preference is
  // read while rendering and controls both scroll behavior and wheel lock time.
  const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  /**
   * Move to a bounded stop index and synchronize state immediately. Native
   * scrolling may later confirm the same index through IntersectionObserver.
   */
  const scrollToStop = useCallback((index, behavior = reducedMotion ? 'auto' : 'smooth') => {
    const bounded = Math.max(0, Math.min(courseStops.length - 1, index))
    stopRefs.current[bounded]?.scrollIntoView({ behavior, inline: 'start', block: 'nearest' })
    setActiveStopIndex(bounded)
  }, [courseStops.length, reducedMotion])

  /** Resolve stable cross-feature stop IDs into the ordered course index. */
  const navigateToStopId = useCallback((stopId) => {
    const index = courseStops.findIndex((stop) => stop.id === stopId)
    if (index >= 0) scrollToStop(index)
  }, [courseStops, scrollToStop])

  /**
   * CourseStop calls this ref callback for each rendered stop. Keeping ref
   * registration here ensures all navigation mechanisms share one node list.
   */
  const registerStopRef = useCallback((index, node) => {
    stopRefs.current[index] = node
  }, [])

  // Native horizontal scrolling and trackpad movement can change the visible
  // stop without calling scrollToStop. Observe the canvas and adopt the most
  // visible stop so timeline, era styling, and notebook context stay current.
  useEffect(() => {
    const root = courseRef.current
    if (!root) return undefined

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

      if (!visible) return
      const index = Number(visible.target.dataset.stopIndex)
      if (Number.isFinite(index)) setActiveStopIndex(index)
    }, { root, threshold: [0.45, 0.65, 0.85] })

    stopRefs.current.forEach((node) => node && observer.observe(node))
    return () => observer.disconnect()
  }, [])

  // Global keyboard navigation mirrors the accepted desktop course behavior.
  // Form controls are excluded so arrows, Page keys, Home, and End remain
  // available for editing learner-authored text and selecting options.
  useEffect(() => {
    const handleKey = (event) => {
      if (isEditableControl(event.target)) return

      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault()
        scrollToStop(activeStopIndex + 1)
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        scrollToStop(activeStopIndex - 1)
      }
      if (event.key === 'Home') {
        event.preventDefault()
        scrollToStop(0)
      }
      if (event.key === 'End') {
        event.preventDefault()
        scrollToStop(courseStops.length - 1)
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeStopIndex, courseStops.length, scrollToStop])

  /**
   * Translate vertical wheel gestures into one-stop horizontal movement.
   * Horizontal trackpad input remains native. The lock prevents one physical
   * gesture from skipping several stops while preserving reduced-motion timing.
   */
  const handleWheel = useCallback((event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
    event.preventDefault()
    if (wheelLockRef.current || Math.abs(event.deltaY) < 18) return

    wheelLockRef.current = true
    scrollToStop(activeStopIndex + (event.deltaY > 0 ? 1 : -1))
    window.setTimeout(() => {
      wheelLockRef.current = false
    }, reducedMotion ? 180 : 650)
  }, [activeStopIndex, reducedMotion, scrollToStop])

  return {
    activeStopIndex,
    courseRef,
    registerStopRef,
    scrollToStop,
    navigateToStopId,
    handleWheel,
  }
}
