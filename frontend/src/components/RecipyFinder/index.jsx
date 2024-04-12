import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { recipySearch } from '../../reducers/recipyReducer'
import recipyService from '../../services/recipies'
import SingleRecipy from '../RecipiesView/SingleRecipy'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import './RecipyFinder.css'

const RecipyFinder = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [ingredient, setIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [recipies, setRecipies] = useState([])
    const [allIngredients, setAllIngredients] = useState([])

    useEffect(() => {
        const fetchAllIngredients = async () => {
            let results = await recipyService.getAllIngredients()
            setAllIngredients(results)
        }
        fetchAllIngredients()
    } , [])

    useEffect(() => {
        const fetchIngredients = async () => {
            let results = await dispatch(recipySearch(ingredients))
            setRecipies(results)
        }
        fetchIngredients()
    }, [ingredients])

    const handleIngredientChange = (query) => {
        setIngredient(query)
    }

    const addIngredient = (ingredient) => {
        setIngredients(ingredients.concat(ingredient.name))
        setIngredient('')
    }

    const removeIngredient = (ingredient) => {
        setIngredients(ingredients.filter(i => i !== ingredient))
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
            <ReactSearchAutocomplete
            items={allIngredients}
            onSearch={handleIngredientChange}
            onSelect={addIngredient}
            autoFocus
          />
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