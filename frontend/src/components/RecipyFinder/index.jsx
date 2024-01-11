import { useState } from 'react'

const RecipyFinder = () => {
    const [ingredient, setIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])

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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={ingredient} onChange={handleIngredientChange} />
                <button type="submit" onClick={addIngredient}>Add ingredient</button>
            </form>
            <ul>
                {ingredients.map(ingredient => (
                    <li key={ingredient}>
                        {ingredient}
                        <button onClick={() => removeIngredient(ingredient)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RecipyFinder