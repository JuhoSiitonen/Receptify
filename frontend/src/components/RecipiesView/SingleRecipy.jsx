

const SingleRecipy = ({ recipy }) => {
    return (
        <div className="singleRecipy">
            <h2>{recipy.title}</h2>
            <p>{recipy.description}</p>
            {recipy.ingredients.map(ingredient => <li>{ingredient}</li>)}
            <p>{recipy.instructions}</p>
            <p>{recipy.category.join(", ")}</p>
        </div>
    )
}

export default SingleRecipy