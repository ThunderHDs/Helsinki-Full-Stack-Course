import { useState, useEffect } from 'react';
import personService from './services/persons.js'
import Persons from './components/persons.jsx';
import Filter from './components/filter.jsx';
import PersonForm from './components/personForm.jsx';

const App = () => {
  //Main states
  const [persons, setPersons] = useState([]); //Initial state now is empty, we get the data from the json server
  const [newName, setNewName] = useState(''); //State to get the new contact name
  const [newNumber, setNewNumber] = useState(''); //State to get the new contact number
  const [filter, setFilter] = useState(''); //State to get the filter name
  
  //Effect to fetch data from server
  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
      .then(allPersons => {
        console.log('promise fulfilled')
        setPersons(allPersons)
      })
  }, []);


  //Creating the new array of persons based on the filter applied, if the input is empty, it shows all
  const newPersons = persons.filter(person=>person.name.includes(filter));

  //Function to create new contact
  const addNewName = (event) => {
    event.preventDefault();
    //Validation of repeating contact
    const found = persons.find((person)=>person.name===newName);

    if(!found){
      //if contact is new, we create a new contact object
      const personObject = {
        name: newName,
        number: newNumber
      }
      //then we save the new contact in the server and reset the name and number states
      personService
      .create(personObject)
      .then(person=>setPersons(persons.concat(person)))
      setNewName('');
      setNewNumber('');
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  //Change handlers
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handler={handleFilterChange}/>
      <div>debug: {filter}</div>
      <PersonForm 
        addNewName={addNewName} 
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName} 
        handleNewNumber={handleNewNumber}
        />
      <h2>Numbers</h2>
      <div>
        <Persons newPersons={newPersons}/>
      </div>
    </div>
  )
}

export default App