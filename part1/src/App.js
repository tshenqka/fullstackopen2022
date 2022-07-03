const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const name = 'Shirley'
  const age = 10
  return (
    <>
      <h1>Grettings</h1>
      <Hello name="Shirley" age={26 + 10}/>
      <Hello name={name} age={age}/>
    </>
  )
}




export default App