"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RotateCcw } from "lucide-react"

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [winner, setWinner] = useState<string | null>(null)
  const [vsComputer, setVsComputer] = useState(false)

  useEffect(() => {
    // Computer's turn
    if (vsComputer && !xIsNext && !winner) {
      const timeoutId = setTimeout(() => {
        makeComputerMove()
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [xIsNext, vsComputer, winner, board])

  const makeComputerMove = () => {
    const emptySquares = board.map((square, i) => (square === null ? i : null)).filter((val) => val !== null)

    if (emptySquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptySquares.length)
      const computerMove = emptySquares[randomIndex] as number
      handleClick(computerMove)
    }
  }

  const handleClick = (i: number) => {
    if (winner || board[i]) return

    const boardCopy = [...board]
    boardCopy[i] = xIsNext ? "X" : "O"
    setBoard(boardCopy)
    setXIsNext(!xIsNext)

    const gameWinner = calculateWinner(boardCopy)
    if (gameWinner) {
      setWinner(gameWinner)
    } else if (!boardCopy.includes(null)) {
      setWinner("draw")
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
    setWinner(null)
  }

  const toggleGameMode = () => {
    setVsComputer(!vsComputer)
    resetGame()
  }

  const calculateWinner = (squares: Array<string | null>) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const renderSquare = (i: number) => {
    return (
      <button
        className={`h-20 w-20 border border-gray-300 dark:border-gray-700 text-3xl font-bold flex items-center justify-center transition-all hover:bg-gray-100 dark:hover:bg-gray-800 ${
          board[i] === "X" ? "text-blue-500" : board[i] === "O" ? "text-red-500" : ""
        }`}
        onClick={() => handleClick(i)}
        disabled={!!winner || !!board[i]}
      >
        {board[i]}
      </button>
    )
  }

  let status
  if (winner === "draw") {
    status = "Game ended in a draw!"
  } else if (winner) {
    status = `Winner: ${winner}`
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/#projects">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Tic Tac Toe</h1>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="text-lg font-medium">{status}</div>
          <Button variant="outline" size="sm" onClick={resetGame}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="mb-6">
          <Button variant={vsComputer ? "default" : "outline"} className="w-full" onClick={toggleGameMode}>
            {vsComputer ? "Playing vs Computer" : "Playing vs Human"}
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {Array(9)
            .fill(null)
            .map((_, i) => (
              <div key={i}>{renderSquare(i)}</div>
            ))}
        </div>
      </div>
    </div>
  )
}

