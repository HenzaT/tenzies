import { useState, useEffect, useRef } from 'react'
import Die from './Die.jsx'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import './App.css'

function App() {
  // set state of dice, with initial value of the random numbers
  // () => generateAllNewDice() means function isn't run every single time
  const [dice, setDice] = useState(() => generateAllNewDice())

  const gameWon = dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value)

  useEffect(() => {
    if (gameWon) {
      newGameButtonRef.current.focus()
    }
  }, [gameWon])

  const newGameButtonRef = useRef(null)

  // random number function for dice
  function generateAllNewDice() {
    const numbers = []
    for (let i = 0; i < 10; i++) {
      const random = Math.ceil(Math.random() * 6)
      numbers.push({
        value: random,
        isHeld: false,
        id: nanoid()
      })
    }
    return numbers
  }

  //* map and create dice elements for each dice, saves having to hard code each Die element
  const diceElements = dice.map(dieObj =>
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={hold}
      id={dieObj.id}
      />
    )

  // look at prevValue, map over the array (to look at each one),
  // if die.isHeld is truthy, return the dice, else return the dice AND change the value
  function newNumbers() {
    if (!gameWon) {
      setDice(prevDice => prevDice.map(die =>
        die.isHeld ?
          die :
          {...die, value: Math.ceil(Math.random() * 6)}))
    } else {
      setDice(generateAllNewDice)
    }
  }

  function hold(id) {
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.id === id ?
          {...die, isHeld: !die.isHeld} : die
      })
    })
  }

  return (
    <main>
      {gameWon && <Confetti />}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same <br /> Click each dice to freeze it's value</p>
      <div className="dice-container">
        {diceElements}
      </div>

      <button
        ref={newGameButtonRef}
        className="roll-button"
        onClick={newNumbers}>
          {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

export default App
