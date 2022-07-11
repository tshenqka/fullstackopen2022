import { useState } from 'react'

const NameList = (props) => {
  let lowerCaseName = props.searchField.toLowerCase()
  let filteredList = props.persons.filter(element => element.name.toLowerCase().includes(lowerCaseName))
  return(
    <div>
      {filteredList.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

const SearchFilter = (props) => {
  return(
    <div>
        <label htmlFor="search-field">filter shown with</label>
        <input id='search-field' value={props.newSearchField} onChange={props.handleSearchFieldChange} />
      </div>
  )
}

const Form = (props) => {
  return (
    <form onSubmit={props.handleNewPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/>
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchField, setNewSearchField] = useState('')

  const handleSearchFieldChange = (event) => {
    setNewSearchField(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name : newName,
      number: newNumber,
    }

    if ( persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
    }

    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter newSearchField = {newSearchField} handleSearchFieldChange = {handleSearchFieldChange} />
      <h2>
        add a new
      </h2>
      <Form handleNewPerson={handleNewPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <NameList persons={persons} searchField={newSearchField}/>
    </div>
  )
}

export default App