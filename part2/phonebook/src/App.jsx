import { useState, useEffect } from 'react'
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import personService from "./services/persons"

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])


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
            setNewName('')
            setNewPhone('')   
          })
      }
    }else{
      personService
        .create(personObj)
        .then(returnedPerson => 
          setPersons(persons.concat(returnedPerson)));
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