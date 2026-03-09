import { useState, useEffect } from 'react'
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import personService from "./services/persons"
import Notification from './components/Notification';

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterText, setFilterText] = useState('');
  const [notif, setNotif] = useState({msg: null, isError: false})

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const setNotification = (msg, time = 5000, isError = false) => {
    setNotif({msg, isError})
    setTimeout(() =>
      setNotif({msg: null}),
     time)
  }

  const addName = (e) => {
    e.preventDefault();

    const personObj = {
      name: newName,
      phone: newPhone
    }

    const existingPerson = persons.find(person => person.name === personObj.name)

    if(existingPerson){
      // alert(`${newName} already in the book!`) 
      if(window.confirm(`${personObj.name} is already in the phonebook, do you want to replace old number with the new one?`)){
        personService
          .update(existingPerson.id, personObj)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setNotification(`${returnedPerson.name} phone was changed`)   
            setNewName('')
            setNewPhone('')
          })
          .catch(error => {
            setNotification(`${personObj.name} does not exist`, 10000, true)
            setPersons(persons.filter(person => person.id !== existingPerson.id))
          })
      }
    }else{
      personService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification(`${returnedPerson.name} phone was added`)
        })
      setNewName('')
      setNewPhone('')
    }
  }

  const removePerson = (id, name) => {
    if(window.confirm(`Do you want to delete ${name} ?`)){
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setNotification(`${name} was already deleted`,10000,true)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }
 
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilterText(e.target.value)
  }

  const filteredPersons = filterText 
    ? persons.filter((person) => person.name.toLowerCase().includes(filterText.toLowerCase())) 
    : [...persons]

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={notif.msg} isError={notif.isError} />
      <Filter onChange={handleFilterChange} />
      <h2>Add new:</h2>
      <PersonForm 
        addName={addName} 
        handleNameChange={handleNameChange} 
        handlePhoneChange={handlePhoneChange} 
        newName={newName} 
        newPhone={newPhone}/>
      <h2>Numbers</h2>
      <Persons 
        persons={filteredPersons} 
        removePerson={removePerson} />
    </div>
  )
}

export default App