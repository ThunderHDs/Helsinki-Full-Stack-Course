
const Total = ({parts}) => {
    const totalExc = parts.reduce((sum, part) => {
        return sum + part.exercises;
    },0);
    
    return (
        <div><h1>Total of {totalExc} exercises</h1></div>
    )
};

export default Total;
