const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  
  const Header = (props) =>{
    return(
      <h1>{props.course}</h1>
    )
  }
  const Part = (props) =>{
    return(
      <div>
        <p>
          {props.part} {props.exercise}
        </p>
      </div>
    )
  }
  const Content = (props) => {
    return(
      <div>
        <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
        <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
        <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
      </div>
    )
  }
  const Total = (props) => {
    return(
      <div>
        <p>Number of exercises {props.exercises[0].exercises + props.exercises[1].exercises + props.exercises[2].exercises}</p>
      </div>
    )
  }

  return (
    <div>
      <Header course= {course}/>
      <Content parts={[part1,part2,part3]}/>
      <Total exercises={[part1,part2,part3]}/>    
    </div>
  )
}

export default App
