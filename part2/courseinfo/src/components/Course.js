const Header = (props) => (
    <h1>{props.course}</h1>
)

const Part = (props) => (
    <p>
        {props.part} {props.exercises}
    </p>
)

const Content = (props) => (
    <>
        {props.parts.map(part =>
            <Part key={part.id} part={part.name} exercises={part.exercises}/>
        )}
    </>
)

const Total = (props) => (
    <p><b>Number of exercises {props.parts.map(part=>part.exercises).reduce((prev,next)=>prev+next)}</b></p>
)

const Course = ({course}) => (
    <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
    </div>
)

export default Course