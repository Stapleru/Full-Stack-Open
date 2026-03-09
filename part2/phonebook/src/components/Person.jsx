const Person = ({person, removePerson}) =>{
    return(
        <li>
            {person.name} : {person.phone}
            <button onClick={removePerson}>delete</button>
        </li>
    )
}

export default Person;