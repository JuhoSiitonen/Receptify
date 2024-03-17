import './SingleRecipy.css'

const baseUrl = 'https://ucarecdn.com/'

const SingleRecipy = ({ recipy }) => {
    if (!recipy) {
        return null
    }
    let averageRating = recipy.averageRating
    averageRating !== 0 ? averageRating = Math.round(averageRating*100)/100 : averageRating = 'No ratings yet'

    const timeParts = recipy.cookingTime.split(':');
    const formattedTime = timeParts.slice(0, 2).join(':');

    return (
        <div>
            {recipy.pictureUuid !== "" ? 
            <img
            src={`${baseUrl}/${recipy.pictureUuid}/-/preview/-/resize/x600/`}
            width="500"
            /> :
            <></> 
            }
            <h3>Cooking time {formattedTime}</h3>
            <div className='single-recipe-container'>
              <div className='single-recipe-left'>
                <h3>Ingredients:</h3>
                <ul>
                  {recipy.recipy_ingredients.map(ingredient => (
                    <li key={ingredient.id}>
                      {ingredient.amount} {ingredient.unit} of {ingredient.ingredient.name}
                    </li>
                  ))}
                </ul>
                <h3>Categories:</h3>
                <ul>
                  {recipy.recipy_categories.map(category => (
                    <li key={category.id}>
                      {category.category.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='single-recipe-right'>
                <h3>Description:</h3>
                <p>{recipy.description}</p>
                <h3>Instructions:</h3>
                <p>{recipy.instructions}</p>
              </div>
            </div>
            <p>Created by {recipy.owner.username}</p>
            <p>Rating: {averageRating}</p>
        </div>
    )
}

export default SingleRecipy