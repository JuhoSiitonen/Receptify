import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { recipySearch } from '../../reducers/recipyReducer'
import recipyService from '../../services/recipies'
import SingleRecipy from '../RecipiesView/SingleRecipy/SingleRecipy'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import '../../styles/RecipyFinder.css'

const RecipyFinder = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
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

    const addIngredient = (ingredient) => {
        if (ingredients.some( i => i === ingredient.name)) {
            return 
        }
        setIngredients(ingredients.concat(ingredient.name))
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
            onSelect={addIngredient}
            autoFocus
          />
            <ul className="recipy-finder-list">
                {ingredients.map(ingredient => (
                    <li key={ingredient}>
                        {ingredient}
                        <button onClick={() => removeIngredient(ingredient)}> ❌ </button>
                    </li>
                ))}
            </ul>
          </div>
          <div>
            {!recipies && <></>}
            {recipies.length > 0 && (
            <div>
                {recipies.map(recipy => (
                  <div className="single-recipe" key={recipy.id}>
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