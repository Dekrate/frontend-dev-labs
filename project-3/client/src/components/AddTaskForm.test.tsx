import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AddTaskForm } from './AddTaskForm'

describe('AddTaskForm', () => {
  it('renders input and button', () => {
    render(<AddTaskForm onAdd={vi.fn()} />)
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
  })

  it('calls onAdd with trimmed title', async () => {
    const onAdd = vi.fn().mockResolvedValue(undefined)
    render(<AddTaskForm onAdd={onAdd} />)

    const input = screen.getByPlaceholderText('What needs to be done?')
    fireEvent.change(input, { target: { value: '  New task  ' } })
    fireEvent.click(screen.getByRole('button', { name: /add/i }))

    await vi.waitFor(() => expect(onAdd).toHaveBeenCalledWith('New task'))
  })

  it('does not call onAdd when empty', () => {
    const onAdd = vi.fn().mockResolvedValue(undefined)
    render(<AddTaskForm onAdd={onAdd} />)

    fireEvent.click(screen.getByRole('button', { name: /add/i }))
    expect(onAdd).not.toHaveBeenCalled()
  })
})
