import Person from "./person";

const Persons = ({newPersons, handleDelete}) => {
    return (
        <ul>
          {newPersons.map(person=> 
            <Person key={person.id} name={person.name} number={person.number} handleDelete={()=> handleDelete(person.id, person.name)}/>
          )}
        </ul>
    )
};

export default Persons