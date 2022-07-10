const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {

  const total = parts.reduce((s, p) => {
    // console.log('what is happening', s, p)
    return (
      s + p.exercises
    )
  }, 0)

  return(
    <div>Total of {total} exercises</div>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => (
      <Part key={part.id} part = {part} />
    ))}     
  </>

const Course = ({course}) => {

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course