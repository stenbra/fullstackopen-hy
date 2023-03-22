import { useState } from 'react'


const StatisticsLine=({text,value}) =>(
  <tr><td>{text}</td> <td>{value}</td></tr>
)

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
      <table>
        <StatisticsLine text="Good" value={props.good}/>
        <StatisticsLine text="Neutral" value={props.neutral}/>
        <StatisticsLine text="Bad" value={props.bad}/>
        <StatisticsLine text="All" value={props.total}/>
        <StatisticsLine text="Avarage" value={((props.good-props.bad)/props.total).toString()}/>
        <StatisticsLine text="Positive" value={(props.good/props.total*100).toString().concat("%")}/>    
      </table>   
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