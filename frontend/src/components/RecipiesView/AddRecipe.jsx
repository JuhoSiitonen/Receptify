import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { createRecipy } from '../../reducers/recipyReducer'

const AddRecipe = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [ingredient, setIngredient] = useState('')
    const [instructions, setInstructions] = useState('')
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const user = useSelector(state => state.user)

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
        console.log(title, ingredients, instructions, categories);
        dispatch(createRecipy({
            title, 
            description, 
            instructions,
            visible: true,
            userId: user.id,
            ingredients, 
            categories
        }))
        setTitle('')
        setDescription('')
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
                    <input value={title} onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    Description:
                    <input value={description} onChange={({ target }) => setDescription(target.value)} />
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