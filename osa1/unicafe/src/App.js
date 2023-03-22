import { useState } from 'react'

const Stats = (props) => {
  if (props.total == 0) {
    return (
      <div>
        no feedback given
      </div>
    )  
  }  
  return (
    <div>    
      <strong>
        <p>Good {props.good}</p>
        <p>Neutral {props.neutral}</p>
        <p>Bad {props.bad}</p>
        <p>All {props.total}</p>
        <p>Avarage {(props.good-props.bad)/props.total}</p>
        <p>Positive {props.good/props.total*100}%</p>
    </strong>     
    </div>  
  )
}


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}  
  </button>
)


const App = () => {
  const [Good, setGood] = useState(0)
  const [Neutral, setNeutral] = useState(0)
  const [Bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = Good + 1
    setGood(updatedGood)
    setTotal(updatedGood + Neutral+Bad)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = Neutral + 1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + Good+ Bad)
  }
  const handleBadClick = () => {
    const updatedBad = Bad + 1
    setBad(updatedBad)
    setTotal(updatedBad + Good+Neutral)
  }
  return (
    <div>
      <h1>give feedback</h1>
      
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      
      <Button handleClick={handleBadClick} text='Bad' />
      <h2>Statistics</h2>
      <Stats total={total} good={Good} bad={Bad} neutral={Neutral} />
    </div>
  )
}
export default App