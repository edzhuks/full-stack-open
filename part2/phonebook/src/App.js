import {useState} from 'react'

const Filter = ({value, onChange}) => {
  return (
      <div>
          filter shown with <input value={value} onChange={onChange}/>
      </div>
  )
}

const PersonForm = ({nameValue, numberValue, onNameChange, onNumberChange, onSubmit}) => {
  return (
      <form onSubmit={onSubmit}>
          <div>
              name: <input value={nameValue} onChange={onNameChange}/>
          </div>
          <div>
              number: <input value={numberValue} onChange={onNumberChange}/>
          </div>
          <div>
              <button type="submit">add</button>
          </div>
      </form>
  )
}

const Persons = ({persons}) => {
  return (
      <div>
          {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
  )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [name, setNewName] = useState('')
    const [number, setNewNumber] = useState('')
    const [filterValue, setNewFilterValue] = useState('')

    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        console.log("filtering",event.target.value)
        setNewFilterValue(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (persons.map(p => p.name).includes(name)){
            alert(`${name} is already in the phonebook`)
        } else {
            setPersons(persons.concat({name: name, number: number}))
            setNewName('')
            setNewNumber('')
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={filterValue} onChange={handleFilterChange}/>
            <h2>Add new</h2>
            <PersonForm nameValue={name} numberValue={number} onNameChange={handleNameChange} onNumberChange={handleNumberChange} onSubmit={handleSubmit}/>
            <h2>Numbers</h2>
            <Persons persons={personsToShow}/>
        </div>
    )
}

export default App