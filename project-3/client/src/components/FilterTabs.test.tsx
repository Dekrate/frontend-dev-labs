import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FilterTabs } from './FilterTabs'

describe('FilterTabs', () => {
  it('renders counts', () => {
    render(
      <FilterTabs
        active="all"
        onChange={vi.fn()}
        counts={{ all: 5, todo: 3, done: 2 }}
      />
    )
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('calls onChange with correct filter', () => {
    const onChange = vi.fn()
    render(
      <FilterTabs
        active="all"
        onChange={onChange}
        counts={{ all: 5, todo: 3, done: 2 }}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /todo/i }))
    expect(onChange).toHaveBeenCalledWith('todo')
  })
})
