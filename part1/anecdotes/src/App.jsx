import { useState } from 'react'

function getRandomInt(min, max){
  return Math.floor(Math.random() * (max-min)) + min;
}



const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const DisplayAnecdote = ({headerText,anecdotes, votes, selected}) => {
  return(
    <div>
      <h2>{headerText}</h2>
      <p>{anecdotes[selected]}</p>
      Votes: {votes[selected]}
    </div>
  )
}

const App = () => {

  const [votes, setVotes] = useState(Array(8).fill(0))

  const setToVotes = (votes, selected) => () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy)
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  return (
    <div>
      <DisplayAnecdote headerText="Random anecdote: " anecdotes={anecdotes} votes={votes} selected={selected} />
      <Button onClick={() => setSelected(getRandomInt(0,anecdotes.length))} text="random anecdote" />
      <Button onClick={setToVotes(votes, selected)} text="vote" />
      <DisplayAnecdote headerText="Anecdote with most votes: " anecdotes={anecdotes} votes={votes} selected={votes.indexOf(Math.max(...votes))} />
    </div>
  )
}

export default App