import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { createRecipy } from '../../reducers/recipyReducer'

const AddRecipe = () => {
    const [name, setName] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [ingredient, setIngredient] = useState('')
    const [instructions, setInstructions] = useState('')
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])

    const dispatch = useDispatch()

    const addIncredient = () => {
        setIngredients(ingredients.concat(ingredient))
        setIngredient('')
    }

    const addCategory = () => {
        setCategories(categories.concat(category))
        setCategory('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, ingredients, instructions, categories);
        dispatch(createRecipy(name, ingredients, instructions, categories))
        setName('')
        setIngredients([])
        setInstructions('')
        setCategories('')
    }

    return (
        <div>
            <h1>AddRecipe</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    Recipy name:
                    <input value={name} onChange={({ target }) => setName(target.value)} />
                </div>
                <div>
                    Ingredients:
                    <input value={ingredient} onChange={({ target }) => setIngredient(target.value)} />
                    <button onClick={addIncredient} type="button">add</button>
                </div>
                <div>
                    {ingredients.map(ingredient => <li>{ingredient}</li>)}
                </div>
                <div>
                    Instructions:
                    <input value={instructions} onChange={({ target }) => setInstructions(target.value)} />
                </div>
                <div>
                    Category:
                    <input value={category} onChange={({ target }) => setCategory(target.value)} />
                    <button onClick={addCategory} type="button">add</button>
                </div>
                <div>Categories: {categories.join(", ")}</div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default AddRecipe