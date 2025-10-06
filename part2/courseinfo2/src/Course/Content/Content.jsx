import Part from './parts/Part.jsx';

const Content = ({parts}) => {
    return (
        <div> 
            <ul>
                {parts.map((part) => 
                    <Part key={part.id} parts={part}/>
                )}
            </ul>
        </div>
    )
};

export default Content;