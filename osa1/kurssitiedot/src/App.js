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
  
  const Header = (info) =>{
    return(
      <h1>{info.course}</h1>
    )
  }
  const Part = (info) =>{
    return(
      <div>
        <p>
          {info.part} {info.exercise}
        </p>
      </div>
    )
  }
  const Content = (info) => {
    return(
      <div>
        <Part part={info.parts[0]} exercise={info.exercises[0]}/>
        <Part part={info.parts[1]} exercise={info.exercises[1]}/>
        <Part part={info.parts[2]} exercise={info.exercises[2]}/>
      </div>
    )
  }
  const Total = (info) => {
    return(
      <div>
        <p>Number of exercises {info.exercises[0] + info.exercises[1] + info.exercises[2]}</p>
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
