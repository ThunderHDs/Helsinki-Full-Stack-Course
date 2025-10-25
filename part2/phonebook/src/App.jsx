import { useState } from 'react';
import Person from './components/person.jsx';

const App = () => {
  //Main states
  const [persons, setPersons] = useState([ //Person states for storing the data
    { name: 'Arto Hellas', number: '040-123456', key: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', key: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', key: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', key: 4 }
  ]);
  const [newName, setNewName] = useState(''); //State to get the new contact name
  const [newNumber, setNewNumber] = useState(''); //State to get the new contact number
  const [filter, setFilter] = useState(''); //State to get the filter name
  
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
        number: newNumber,
        key: String(persons.length + 1)
      }
      //then we save the new contact and reset the name and number states
      setPersons(persons.concat(personObject));
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
      filter shown with <input value={filter} onChange={handleFilterChange}/>
      <div>debug: {filter}</div>
      <form onSubmit={addNewName}>
        <div>
          name: <input 
            value={newName} 
            onChange={handleNewName}
            />
            <br/>
          number: <input 
            value={newNumber}
            onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {newPersons.map(person=> 
            <Person key={person.key} name={person.name} number={person.number}/>
          )}
        </ul>
      </div>
    </div>
  )
}

export default App