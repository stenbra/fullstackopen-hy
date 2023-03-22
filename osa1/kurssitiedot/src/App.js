const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const parts =[part1,part2,part3]
  const exercises =[exercises1,exercises2,exercises3]
  
  const Header = () =>{
    return(
      <h1>{course}</h1>
    )
  }
  
  const Content = () => {
    return(
      <div>
        <p>
          {parts[0]} {exercises[0]}
        </p>
        <p>
          {parts[1]} {exercises[1]}
        </p>
        <p>
          {parts[2]} {exercises[2]}
        </p>
      </div>
    )
  }
  const Total = () => {
    return(
      <div>
        <p>Number of exercises {exercises[0] + exercises[1] + exercises[2]}</p>
      </div>
    )
  }

  return (
    <div>
      <Header course= {course}/>
      <Content parts={parts} exercises={exercises}/>
      <Total exercises={exercises}/>    
    </div>
  )
}

export default App
