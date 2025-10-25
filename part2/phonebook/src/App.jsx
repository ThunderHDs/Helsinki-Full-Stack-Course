import { useState } from 'react';
import Person from './components/person.jsx';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', key: 1}
  ]);
  const [newName, setNewName] = useState('');


  const addNewName = (event) => {
    event.preventDefault();
    console.log('log',newName);
    const found = persons.find((person)=>person.name===newName);

    if(!found){
      const personObject = {
        name: newName,
        key: String(persons.length + 1)
      }

      setPersons(persons.concat(personObject));
      setNewName('');
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    console.log('persons', persons);
  };

  const handleNewName = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={addNewName}>
        <div>
          name: <input 
            value={newName} 
            onChange={handleNewName}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map(person=> 
            <Person key={person.key} name={person.name} />
          )}
        </ul>
      </div>
    </div>
  )
}

export default App