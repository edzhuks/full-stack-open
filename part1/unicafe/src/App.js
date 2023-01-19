import {useState} from 'react'

const Button = ({onClick, name}) => (
    <button onClick={onClick}>{name}</button>
)

const StatisticLine = ({value, text}) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

const Statistics = (props) => {
    if (props.totalVotes() > 0) {
        return (
            <>
                <h1>Statistics</h1>
                <table>
                    <tbody>
                        <StatisticLine text={"good"} value={props.good}/>
                        <StatisticLine text={"neutral"} value={props.neutral}/>
                        <StatisticLine text={"bad"} value={props.bad}/>
                        <StatisticLine text={"all"} value={props.totalVotes()}/>
                        <StatisticLine text={"average"} value={(props.good - props.bad) / props.totalVotes()}/>
                        <StatisticLine text={"positive"} value={props.good / props.totalVotes() * 100 + ' %'}/>
                    </tbody>
                </table>
            </>
        )
    } else {
        return (
            <>
                <h1>Statistics</h1>
                <p>No feedback given</p>
            </>
        )
    }
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const voteGood = () => () => (setGood(good + 1))
    const voteNeutral = () => () => (setNeutral(neutral + 1))
    const voteBad = () => () => (setBad(bad + 1))

    const totalVotes = () => (good + neutral + bad)

    return (
        <div>
            <h1>Give feedback!</h1>
            <Button onClick={voteGood()} name={"good"}/>
            <Button onClick={voteNeutral()} name={"neutral"}/>
            <Button onClick={voteBad()} name={"bad"}/>
            <Statistics good={good} neutral={neutral} bad={bad} totalVotes={totalVotes}/>

        </div>
    )
}

export default App