
const SingleRecipy = ({ recipy }) => {
    if (!recipy) {
        return null
    }
    let averageRating = recipy.averageRating
    averageRating !== 0 ? averageRating = Math.round(averageRating*100)/100 : averageRating = 'No ratings yet'

    return (
        <div className="singleRecipy">
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
            <p>Categories:</p>
            <ul>
              {recipy.recipy_categories.map(category => (
                <li key={category.id}>
                  {category.category.name}
                </li>
              ))}
            </ul>
            <p>Created by {recipy.user.username}</p>
            <p>Rating: {averageRating}</p>
        </div>
    )
}

export default SingleRecipy