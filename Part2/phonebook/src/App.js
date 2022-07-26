import { useEffect, useState } from 'react'
import axios from 'axios'

const NameList = (props) => {
  let lowerCaseName = props.searchField.toLowerCase()
  let filteredList = props.persons.filter(element => element.name.toLowerCase().includes(lowerCaseName))
  return(
    <div>
      {filteredList.map(person => {
        return(
          <>
          <p key={person.name}>{person.name} {person.number}</p>
          <button onClick={() => props.handleDelete(person.id, person.name)}>delete</button>
          </>
        )})}
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

  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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

    if( persons.filter(person => person.name === newName).length > 0) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        axios
          .put(`http://localhost:3001/persons/${persons.filter(person => person.name === newName)[0].id}`, personObject)
          .then(
            setPersons(persons.filter(person => person.name !== newName).concat(personObject))
          )
      }
    }

    else {
      axios
        .post(`http://localhost:3001/persons`, personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDeletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      axios
      .delete(`http://localhost:3001/persons/${id}`)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
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
      <NameList persons={persons} searchField={newSearchField} handleDelete={handleDeletePerson}/>
    </div>
  )
}

export default App