import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useTasks } from './useTasks'
import { tasksApi } from '../api/client'

vi.mock('../api/client', () => ({
  tasksApi: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}))

describe('useTasks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loads tasks on mount', async () => {
    vi.mocked(tasksApi.getAll).mockResolvedValue([
      { id: 1, title: 'A', completed: false, created_at: '2024-01-01' },
    ])

    const { result } = renderHook(() => useTasks())

    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.counts.all).toBe(1)
  })

  it('adds a task', async () => {
    vi.mocked(tasksApi.getAll).mockResolvedValue([])
    vi.mocked(tasksApi.create).mockResolvedValue({
      id: 2, title: 'B', completed: false, created_at: '2024-01-01',
    })

    const { result } = renderHook(() => useTasks())
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.addTask('B')
    })

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].title).toBe('B')
  })

  it('toggles completion', async () => {
    const task = { id: 1, title: 'C', completed: false, created_at: '2024-01-01' }
    vi.mocked(tasksApi.getAll).mockResolvedValue([task])
    vi.mocked(tasksApi.update).mockResolvedValue({ ...task, completed: true })

    const { result } = renderHook(() => useTasks())
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.toggleTask(1)
    })

    expect(result.current.tasks[0].completed).toBe(true)
  })

  it('edits title', async () => {
    const task = { id: 1, title: 'Old', completed: false, created_at: '2024-01-01' }
    vi.mocked(tasksApi.getAll).mockResolvedValue([task])
    vi.mocked(tasksApi.update).mockResolvedValue({ ...task, title: 'New' })

    const { result } = renderHook(() => useTasks())
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.editTask(1, 'New')
    })

    expect(result.current.tasks[0].title).toBe('New')
  })

  it('deletes a task', async () => {
    const task = { id: 1, title: 'D', completed: false, created_at: '2024-01-01' }
    vi.mocked(tasksApi.getAll).mockResolvedValue([task])
    vi.mocked(tasksApi.remove).mockResolvedValue(undefined)

    const { result } = renderHook(() => useTasks())
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(async () => {
      await result.current.deleteTask(1)
    })

    expect(result.current.tasks).toHaveLength(0)
  })

  it('filters tasks', async () => {
    vi.mocked(tasksApi.getAll).mockResolvedValue([
      { id: 1, title: 'Done', completed: true, created_at: '2024-01-01' },
      { id: 2, title: 'Todo', completed: false, created_at: '2024-01-01' },
    ])

    const { result } = renderHook(() => useTasks())
    await waitFor(() => expect(result.current.loading).toBe(false))

    act(() => {
      result.current.setFilter('done')
    })

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].title).toBe('Done')
  })
})
