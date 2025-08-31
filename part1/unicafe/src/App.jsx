import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //Event handlers
  const handleGoodClick = () => {
    setGood(good +1);
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }
  const handleBadClick = () => {
    setBad(bad + 1);
  }

//App Child Components
  //Statistics Component
  const Statistics = (props) => {
    if (good === 0 && neutral === 0 && bad === 0) {
      return (<>
        <p>No feedback given</p>
      </>)
    }else{
      return (<>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
        <StatisticLine text="Average" value={(props.good-props.bad)/(props.good+props.neutral+props.bad)} />
        <StatisticLine text="Positive Feedback" value={props.good/(props.good+props.neutral+props.bad)*100} />
      </>)
    }
  }

  //Buttons component
  const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

  //Statistic Line Component
  const StatisticLine = (props) => (
    <>
      <p>{props.text}: {props.value}</p>
    </>
  )
  //Main App Return
  return (
    <div>
      {/* Input section */}
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      {/* Statistics section */}
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App