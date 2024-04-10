import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { recipySearch } from '../../reducers/recipyReducer'
import SingleRecipy from '../RecipiesView/SingleRecipy'
import './RecipyFinder.css'

const RecipyFinder = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [ingredient, setIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [recipies, setRecipies] = useState([])

    useEffect(() => {
        const fetchIngredients = async () => {
            let results = await dispatch(recipySearch(ingredients))
            setRecipies(results)
        }
        fetchIngredients()
    }, [ingredients])

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

    const matches = (recipy) => {
        const matchCount = recipy.recipy_ingredients.filter(
            (ingredient) => ingredient.ingredient && ingredients.includes(ingredient.ingredient.name)
        ).length
        return matchCount
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
          </div>
          <div>
            {!recipies && <></>}
            {recipies.length > 0 && (
            <div>
              <h2>Recipies</h2>
                {recipies.map(recipy => (
                  <div className="single-recipe">
                    {matches(recipy) > 0 && <p><b> Ingredient matches: {matches(recipy)}</b></p>}
                    <SingleRecipy recipy={recipy} user={user} />
                  </div>
              ))}
            </div>
            )}
          </div>
        </div>
    )
}

export default RecipyFinder