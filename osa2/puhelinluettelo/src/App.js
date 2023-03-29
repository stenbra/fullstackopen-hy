import { useState } from 'react'


const Filter =({onChangeThingy})=>{
  return(<div>
    <div>
          filter shown with <input onChange={onChangeThingy}/>
        </div>
  </div>)
}
const PersonFrom =({name,number,nameEvent,numberEvent,addFunction})=>{
  return(<div>
    <form onSubmit={addFunction}>
        <div>
          name: <input value={name} onChange={nameEvent}/>
          <br></br>number: <input value={number} onChange={numberEvent}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  </div>)
}
const Numbers =({numbers})=>{
  return(<div>
    {numbers.map(x => <p>{x.name} {x.number}</p>)}
  </div>)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [filteredList,setFiterList ]= useState([])  
  const [newName, setNewName] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newNumber, setNewNumber] = useState('')

  const Add = (event) => { 
       event.preventDefault()  
       if(persons.filter(x => x.name.toLowerCase() == newName.toLowerCase()).length>0){
        alert(`${newName} is already added to phonebook`)
        return
      }
       console.log('button clicked', event.target) 
       const phoneObj = { name: newName, number:newNumber, id:persons.length+1} 
       setPersons(persons.concat(phoneObj))
       setNewName("")
       setNewNumber("")
       setShowAll(true)
  }
  const handleNameChange = (event) => {   
    console.log(event.target.value)    
    setNewName(event.target.value)  
  }
  const handleFilterNameChange = (event) => {   
    console.log(event.target.value)   
    if(event.target.value !=''){
      const filtered=persons.filter( x=> x.name.toLowerCase().includes(event.target.value.toLowerCase()) ) 
      setFiterList(filtered)
      setShowAll(false)
    }
    else{
      setShowAll(true)
    }
  }
  const handleNumberChange = (event) => {   
    console.log(event.target.value)    
    setNewNumber(event.target.value)  
  }
  return (
    <div>
      <h2>Phonebook</h2>
        <Filter onChangeThingy={handleFilterNameChange}/>
      <h3>add a new</h3>
       <PersonFrom name={newName} number={newNumber} nameEvent= {handleNameChange} numberEvent={handleNumberChange} addFunction={Add}/>
      <h3>Numbers</h3>
      <Numbers numbers={showAll ? persons:filteredList}/>
    </div>
  )
}

export default App
