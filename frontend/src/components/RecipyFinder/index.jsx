import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { recipySearch } from '../../reducers/recipyReducer'
import SingleRecipy from '../RecipiesView/SingleRecipy'
import './RecipyFinder.css'

const RecipyFinder = () => {
    const dispatch = useDispatch()
    const [ingredient, setIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [recipies, setRecipies] = useState([])

    const handleIngredientChange = (event) => {
        setIngredient(event.target.value)
    }

    const addIngredient = (event) => {
        event.preventDefault()
        setIngredients(ingredients.concat(ingredient))
        setIngredient('')
    }

    const removeIngredient = (ingredient) => {
        setIngredients(ingredients.filter(i => i !== ingredient))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(ingredients)
    }

    const searchRecipies = async () => {
        await dispatch(recipySearch(ingredients))
        let results = useSelector(state => state.recipies)
        setRecipies(results)
        console.log('Search recipies')
    }

    return (
        <div>
          <div className="recipy-finder-container">
            <h2>Find recipies based on ingredients</h2>
            <form className="recipy-finder-form" onSubmit={handleSubmit}>
                <input type="text" value={ingredient} onChange={handleIngredientChange} />
                <button type="submit" onClick={addIngredient}>Add ingredient</button>
            </form>
            <ul className="recipy-finder-list">
                {ingredients.map(ingredient => (
                    <li key={ingredient}>
                        {ingredient}
                        <button onClick={() => removeIngredient(ingredient)}>Remove</button>
                    </li>
                ))}
            </ul>
            {ingredients.length > 0 && 
            <button onClick={searchRecipies}>Search recipies</button>
            }
          </div>
          <div>
            {recipies.length > 0 && (
            <div>
              <h2>Recipies</h2>
                {recipies.map(recipy => (
                  <SingleRecipy key={recipy.id} recipy={recipy} />
              ))}
            </div>
            )}
          </div>
        </div>
    )
}

export default RecipyFinder