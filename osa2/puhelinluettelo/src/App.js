import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}
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
const Numbers =({numbers,remove})=>{
  return(<div>
    {numbers.map(x => <div><form onSubmit={remove}>
      {x.name} {x.number}  
      <input type="hidden" name="id" value={x.id}/>
      <input type="hidden" name="name" value={x.name}/>
      <button>Delete</button>
    </form>
    </div>)}
  </div>)
}



const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect(() => {
    console.log('effect')
    personService.getAll().then(response => { 
      console.log('promise fulfilled') 
      setPersons(response.data
        )}
      )}, 
      [])
    console.log('render', persons.length, 'persons')
    console.log(persons)

  const [filteredList,setFiterList ]= useState([])  
  const [newName, setNewName] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const Add = (event) => { 
       event.preventDefault()  
       if(persons.filter(x => x.name.toLowerCase() == newName.toLowerCase()).length>0){
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          const obj = persons.find(x => x.name == newName)
          const updatedObj = { name:obj.name, number:newNumber, id:obj.id}
          console.log(updatedObj)
          personService.update(updatedObj).then(response =>
            {setPersons(persons.map(x => x.name !== newName ? x : response.data))})
        }
        return
      }
       console.log('button clicked', event.target) 
       const phoneObj = { name: newName, number:newNumber, id:persons.length+1} 

      personService.create(phoneObj).then(response => {
       setErrorMessage(`Added ${newName}`)
       setTimeout(()=> {setErrorMessage(null)},5000)
       setPersons(persons.concat(phoneObj))
       setNewName("")
       setNewNumber("")
       setShowAll(true)
      })
  }
  const Remove = (event) => {
    event.preventDefault()
    if(window.confirm(`Delete ${event.target.name.value}?`)){
      console.log(event.target.id.value)
      personService.remove(event.target.id.value).then(response => {
        window.location.reload(true)
        setShowAll(true)
        console.log("deleted i think")
      })
    }
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
      <Notification message={errorMessage} />
        <Filter onChangeThingy={handleFilterNameChange}/>
      <h3>add a new</h3>
       <PersonFrom name={newName} number={newNumber} nameEvent= {handleNameChange} numberEvent={handleNumberChange} addFunction={Add}/>
      <h3>Numbers</h3>
      <Numbers numbers={showAll ? persons:filteredList} remove={Remove}/>
    </div>
  )
}

export default App
