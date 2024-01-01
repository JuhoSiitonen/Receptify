

const SingleRecipy = ({ recipy }) => {
    return (
        <div className="singleRecipy">
            <h2>{recipy.title}</h2>
            <p>{recipy.description}</p>
            <p>{recipy.ingredients}</p>
            <p>{recipy.instructions}</p>
            <p>{recipy.category}</p>
        </div>
    )
}

export default SingleRecipy