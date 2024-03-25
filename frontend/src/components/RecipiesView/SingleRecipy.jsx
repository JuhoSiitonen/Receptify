import { useState } from 'react'
import UserActions from './UserActions'
import OwnerActions from './OwnerActions'

import './SingleRecipy.css'

const baseUrl = 'https://ucarecdn.com/'

const SingleRecipy = ({ recipy, user }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    if (!recipy) {
        return null
    }

    const calculateStars = (rating) => {
      const stars = [];
      for (let i = 0; i < Math.floor(rating); i++) {
          stars.push(<span key={i} role="img" aria-label="star">⭐</span>);
      }
      return stars;
    };

    let averageRating = recipy.averageRating
    averageRating !== 0 ? averageRating = Math.round(averageRating*100)/100 : averageRating = 'No ratings yet'

    const timeParts = recipy.cookingTime.split(':');
    const formattedTime = timeParts.slice(0, 2).join(':');

    return (
        <div>
          <div onClick={toggleDetails} id='single-recipy-clickarea'>
            {recipy.pictureUuid !== "" ? 
            <img
            src={`${baseUrl}/${recipy.pictureUuid}/-/preview/-/resize/x600/`}
            width="500"
            /> :
            <></> 
            }
            <h2>{recipy.title}</h2>
            <h3>Cooking time {formattedTime}</h3>
            {showDetails && (
            <div className='single-recipe-container'>
              <div className='single-recipe-left'>
                <h3>Ingredients:</h3>
                <ul>
                  {recipy.recipy_ingredients.map(ingredient => (
                    <li key={ingredient.id + ingredient.amount}>
                      {ingredient.amount} {ingredient.unit} of {ingredient.ingredient.name}
                    </li>
                  ))}
                </ul>
                <h3>Categories:</h3>
                <ul>
                  {recipy.recipy_categories.map(category => (
                    <li key={category.id + category.category.name }>
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
            )}
            </div>
            <h3>Created by: {recipy.owner.username}</h3>
            <h3>
              Rating: {calculateStars(averageRating)}
            </h3>
            {showDetails && (
            <div >
              {user && user.id !== recipy.owner.id && <UserActions recipe={recipy} user={user}/>}
              {user && user.id === recipy.owner.id && <OwnerActions recipe={recipy} user={user}/>}
            </div>
            )}
        </div>
    )
}

export default SingleRecipy