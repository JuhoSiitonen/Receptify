

const SingleRecipy = ({ recipy }) => {
    console.log(recipy)
    return (
        <div className="singleRecipy">
            <h2>{recipy.title}</h2>
            <p>{recipy.description}</p>
            <p>Ingredients:</p>
            <ul>
              {recipy.recipy_ingredients.map(ingredient => (
                <li key={ingredient.id}>
                  {ingredient.amount} of {ingredient.ingredient.name}
                </li>
              ))}
            </ul>
            <p>{recipy.instructions}</p>
        </div>
    )
}

export default SingleRecipy