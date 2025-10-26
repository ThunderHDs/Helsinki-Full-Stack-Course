import Person from "./person";

const Persons = ({newPersons}) => {
    return (
        <ul>
          {newPersons.map(person=> 
            <Person key={person.id} name={person.name} number={person.number}/>
          )}
        </ul>
    )
};

export default Persons