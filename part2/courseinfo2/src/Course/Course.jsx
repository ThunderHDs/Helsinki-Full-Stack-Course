import Header from './Header/Header.jsx';
import Content from './Content/Content.jsx';
import Total from './Total/Total.jsx';

const Course = ({course}) => {
    return (
        <div>  
            <li key={course.id}>
                <Header name={course.name}/>
                <Content parts={course.parts}/>
                <Total parts={course.parts}/>
            </li>
        </div>
    )
};

export default Course;