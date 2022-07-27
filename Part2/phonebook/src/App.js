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

const Notification = ({message, status}) => {

  if(message === '') {
    console.log('This should be null')
    return null
  }

  const notificationStyleOkay =  {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const notificationStyleError =  {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  let notificationStyle = status ? notificationStyleOkay : notificationStyleError

  return (
    <div className='notification' style={notificationStyle}>
      {message}
    </div>
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
  const [notification, setNotification] = useState('')
  const [messageStatus, setMessageStatus] = useState(true)

  const handleSearchFieldChange = (event) => {
    setNewSearchField(event.target.value)
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPerson = (event) => {
    if(newName === '' || newNumber ==='') {
      window.alert(`'name' or 'number' field must not be empty`)
      return
    }
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
          setNotification(`${personObject.name} has been added to the phonebook`)
          setTimeout(() => {
            setNotification('')
          }, 5000);
      }
    }

    else {
      axios
        .post(`http://localhost:3001/persons`, personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setNotification(`${personObject.name} has been added to the phonebook`)
          setTimeout(() => {
            setNotification('')
          }, 5000);
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
      .catch(error => {
        setMessageStatus(false)
        setNotification(`Information of ${name} has already been removed from the server`)
        setPersons(persons.filter(person => person.name !== name))
        setTimeout(() => {
          setMessageStatus(true)
          setNotification('')
        }, 5000)
      })
    }
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }



  return (
    <div>
      <Notification message={notification} status={messageStatus}/>
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