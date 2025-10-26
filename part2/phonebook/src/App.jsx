import { useState, useEffect } from 'react';
import personService from './services/persons.js'
import Persons from './components/persons.jsx';
import Filter from './components/filter.jsx';
import PersonForm from './components/personForm.jsx';
import Notification from './components/notification.jsx';

const App = () => {
  //Main states
  const [persons, setPersons] = useState([]); //Initial state now is empty, we get the data from the json server
  const [newName, setNewName] = useState(''); //State to get the new contact name
  const [newNumber, setNewNumber] = useState(''); //State to get the new contact number
  const [filter, setFilter] = useState(''); //State to get the filter name
  const [notMessage, setNotMessage] = useState(null); //Notifications
  const [error, setError] = useState(false);
  
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
      setError(false);
      setMessageNotificacion(`Added ${personObject.name}`);
      setNewName('');
      setNewNumber('');
    } else {
      //if the person already exists in the data, we ask confirm changing the number
      const confirmed = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (confirmed) { //if its confirmed, we obtain the index in the actual data to obtain the id
        const index = persons.findIndex((person)=>person.name===newName);
        changeNumber(newNumber, index); //then we call the changing number function
      }
    }
  };

  //function to changing number
  const changeNumber = (newNumber, index) => {
    //obtainin the data based on the index provided
    const person = persons[index];
    const id = person.id;
    const changedPerson = {...person, number: newNumber}

    personService //calling the put request to change de number and reloading the page with the new changes
    .update(id,changedPerson)
    .then(returnedPerson => {
      setPersons(persons.map(person=>person.id===id ? returnedPerson : person))
      setError(false);
      setMessageNotificacion(`Updated ${person.name} number!`);
    })
    .catch(error=> {
      setError(true);
      setMessageNotificacion(`the contact '${person.name}' was already deleted from server`);
      setPersons(persons.filter(person=>person.id!==id))
      })
    
  }

  //function to set notif message
  const setMessageNotificacion = (message) => {
    setNotMessage(message);
    setTimeout(()=>{
      setNotMessage(null)
    }, 5000)
  }
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

  const handleDelete = (id, name) => {
    const confirmed = confirm(`Do you really want to delete the contact ${name}`);
    if (confirmed){
      console.log(`the user is ${name} with id ${id}`);
      personService
      .deleteUser(id)
      .then(()=>{
        setPersons(persons.filter(person=>person.id!==id))
      })
      .catch(error=> {
        alert(
          `${error} the contact '${id}' was already deleted from server`
        )
        setPersons(persons.filter(person=>person.id!==id))
      })
    }
    console.log('the user says ',confirmed);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification  message={notMessage} error={error}/>
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
        <Persons newPersons={newPersons} handleDelete={handleDelete}/>
      </div>
    </div>
  )
}

export default App