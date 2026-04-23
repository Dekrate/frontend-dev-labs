import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TaskList } from './TaskList'

describe('TaskList', () => {
  it('shows no tasks message', () => {
    render(<TaskList tasks={[]} onToggle={async () => {}} onEdit={async () => {}} onDelete={async () => {}} />)
    expect(screen.getByText('No tasks found.')).toBeInTheDocument()
  })

  it('renders tasks', () => {
    const tasks = [
      { id: 1, title: 'A', completed: false, created_at: '2024-01-01' },
      { id: 2, title: 'B', completed: true, created_at: '2024-01-01' },
    ]
    render(<TaskList tasks={tasks} onToggle={async () => {}} onEdit={async () => {}} onDelete={async () => {}} />)
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
  })
})
