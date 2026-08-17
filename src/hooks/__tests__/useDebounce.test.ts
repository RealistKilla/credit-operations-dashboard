import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../useDebounce'

describe('useDebounce Hook Suite', () => {
  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 250))
    expect(result.current).toBe('initial')
  })

  it('debounces rapid sequential updates', () => {
    vi.useFakeTimers()

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'first', delay: 300 } }
    )

    expect(result.current).toBe('first')

    // Change value rapidly
    rerender({ value: 'second', delay: 300 })
    rerender({ value: 'third', delay: 300 })

    // Before timer advances
    expect(result.current).toBe('first')

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current).toBe('third')

    vi.useRealTimers()
  })
})
