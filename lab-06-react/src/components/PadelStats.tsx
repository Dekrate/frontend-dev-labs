import { useState, useEffect } from 'react'
import MatchForm from './MatchForm'
import './PadelStats.css'

interface Match {
  id: number
  opponent: string
  result: 'win' | 'loss'
}

const INITIAL_ELO = 1500

function PadelStats() {
  const [matches, setMatches] = useState<Match[]>([])
  const [wins, setWins] = useState(0)
  const [elo, setElo] = useState(INITIAL_ELO)

  const winRate = matches.length > 0 ? ((wins / matches.length) * 100).toFixed(1) : '0.0'

  useEffect(() => {
    const newWins = matches.filter((m) => m.result === 'win').length
    setWins(newWins)

    const newElo = calculateElo(matches)
    setElo(newElo)
  }, [matches])

  const calculateElo = (matchList: Match[]): number => {
    let currentElo = INITIAL_ELO
    matchList.forEach((match) => {
      const k = 32
      const expected = 1 / (1 + Math.pow(10, (1500 - currentElo) / 400))
      const actual = match.result === 'win' ? 1 : 0
      currentElo += k * (actual - expected)
    })
    return Math.round(currentElo)
  }

  const addMatch = (opponent: string, result: 'win' | 'loss') => {
    setMatches((prev) => [
      ...prev,
      {
        id: Date.now(),
        opponent,
        result,
      },
    ])
  }

  const lastMatch = matches[matches.length - 1]

  return (
    <div className="section">
      <h2>Marcin Borowski - ELO: {elo}</h2>
      <div className="stats-summary">
        <span>Matches: {matches.length}</span>
        <span>Wins: {wins}</span>
        <span>Win rate: {winRate}%</span>
      </div>
      <MatchForm onAddMatch={addMatch} />
      {lastMatch && (
        <div className="last-match">
          <h3>Last match:</h3>
          <p>
            Opponent: {lastMatch.opponent} | Result: {lastMatch.result === 'win' ? 'Win' : 'Loss'}
          </p>
        </div>
      )}
    </div>
  )
}

export default PadelStats
