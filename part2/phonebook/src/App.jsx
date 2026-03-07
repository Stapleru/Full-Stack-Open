import { useState } from 'react'
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterText, setFilterText] = useState('');

  const addName = (e) => {
    e.preventDefault();

    const personObj = {
      name: newName,
      phone: newPhone,
      id: persons.length +1
    }

    persons.some((person) => person.name === personObj.name ) 
      ? alert(`${newName} already in the book!`) 
      : setPersons(persons.concat(personObj))  ;
    setNewName('')
    setNewPhone('')
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
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App