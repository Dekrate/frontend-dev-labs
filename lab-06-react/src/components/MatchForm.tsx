import { useState } from 'react'
import './MatchForm.css'

interface Props {
  onAddMatch: (opponent: string, result: 'win' | 'loss') => void
}

function MatchForm({ onAddMatch }: Props) {
  const [opponent, setOpponent] = useState('')
  const [result, setResult] = useState<'win' | 'loss'>('win')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!opponent.trim()) return
    onAddMatch(opponent, result)
    setOpponent('')
  }

  return (
    <form className="match-form" onSubmit={handleSubmit}>
      <span>Opponent:</span>
      <input
        type="text"
        value={opponent}
        onChange={(e) => setOpponent(e.target.value)}
        placeholder="Jan K."
      />
      <span>Result:</span>
      <select value={result} onChange={(e) => setResult(e.target.value as 'win' | 'loss')}>
        <option value="win">Win</option>
        <option value="loss">Loss</option>
      </select>
      <button type="submit">ADD</button>
    </form>
  )
}

export default MatchForm
