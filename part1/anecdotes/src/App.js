import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  let anecdotes_size = anecdotes.length
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes_size).fill(0))

  let max_votes = Math.max(...votes)
  let i = 0
  for(;i < anecdotes_size; i++) {
    if (votes[i] === max_votes) {
      break;
    }
  }

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * (anecdotes_size)))
    console.log(selected)
  }

  const handleVote = () => {
    let newArray = votes.slice()
    newArray[selected] = newArray[selected] + 1
    setVotes(newArray)
  }

  ;


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <div>
        <Button onClick={handleVote} text='vote' />
        <Button onClick={handleNext} text='next anecdote' />
      </div>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[i]}</p>
      <p>has {max_votes} votes</p>
    </div>
  )
}

export default App