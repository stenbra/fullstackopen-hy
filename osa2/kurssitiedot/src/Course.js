const Course = ({course}) => {

    const Header = ({ course }) => { 
        return(<h1>{course}</h1>)
    }
    const Content = ({ parts }) => {

        const Part = ({ part }) => {
            return(
            <p>
              {part.name} {part.exercises}
            </p>)
        }

        return (<>{parts.map(x => <Part part={x}/>)}</>)
    }
    const Total = ({ sum }) => { return(<p><strong>total of {sum} exercises</strong></p>)}
    
    return(
    <>
        <Header course= {course.name}/>
        <Content parts ={course.parts}/>
        <Total sum= {course.parts.map(x => x.exercises).reduce((accumulator, y) => accumulator + y, 0)}/>
    </>)
}
export default Course