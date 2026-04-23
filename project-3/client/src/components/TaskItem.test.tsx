import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TaskItem } from './TaskItem'

describe('TaskItem', () => {
  const task = { id: 1, title: 'Buy milk', completed: false, created_at: '2024-01-01' }

  it('renders title and checkbox', () => {
    render(<TaskItem task={task} onToggle={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('calls onToggle when checkbox clicked', () => {
    const onToggle = vi.fn().mockResolvedValue(undefined)
    render(<TaskItem task={task} onToggle={onToggle} onEdit={vi.fn()} onDelete={vi.fn()} />)

    fireEvent.click(screen.getByRole('checkbox'))
    expect(onToggle).toHaveBeenCalledWith(1)
  })

  it('enters edit mode on double click', () => {
    render(<TaskItem task={task} onToggle={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />)

    fireEvent.doubleClick(screen.getByText('Buy milk'))
    expect(screen.getByDisplayValue('Buy milk')).toBeInTheDocument()
  })

  it('calls onEdit when save is clicked', async () => {
    const onEdit = vi.fn().mockResolvedValue(undefined)
    render(<TaskItem task={task} onToggle={vi.fn()} onEdit={onEdit} onDelete={vi.fn()} />)

    fireEvent.doubleClick(screen.getByText('Buy milk'))
    const input = screen.getByDisplayValue('Buy milk')
    fireEvent.change(input, { target: { value: 'Buy eggs' } })
    fireEvent.click(screen.getByRole('button', { name: /save/i }))

    await vi.waitFor(() => expect(onEdit).toHaveBeenCalledWith(1, 'Buy eggs'))
  })

  it('calls onDelete when delete clicked', () => {
    const onDelete = vi.fn().mockResolvedValue(undefined)
    render(<TaskItem task={task} onToggle={vi.fn()} onEdit={vi.fn()} onDelete={onDelete} />)

    fireEvent.click(screen.getByRole('button', { name: /delete/i }))
    expect(onDelete).toHaveBeenCalledWith(1)
  })
})
