import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <>
      <p>{text} {value}</p>
    </>
  )
}

const Statistics = ({goodCount, neutralCount, badCount}) => {

  let sum = (goodCount + neutralCount + badCount)
  console.log(sum)
  let average = (sum / 3)
  let positive = (goodCount / sum) * 100

  if( sum === 0 ) {
    return (
      <dir>
        No feedback given
      </dir>
    )
  }

  return (
    <div>

       
      <table>
        <tr>
          <td>good</td>
          <td>{goodCount}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutralCount}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{badCount}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{sum}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{average}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{positive}</td>
        </tr>
      </table>
    </div>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const handleResetClick = () => {
    setGood(0)
    setNeutral(0)
    setBad(0)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button onClick={handleGoodClick} text='good' />
        <Button onClick={handleNeutralClick} text='neutral' />
        <Button onClick={handleBadClick} text='bad' />
        <Button onClick={handleResetClick} text='reset' />
      </div>
      <h2>Statistics</h2>
      <Statistics goodCount={good} neutralCount={neutral} badCount={bad} />
    </div>
  )
}

export default App