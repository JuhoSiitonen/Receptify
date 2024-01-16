import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { createRecipy } from '../../reducers/recipyReducer'

const AddRecipe = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [ingredient, setIngredient] = useState({ name: '', amount: '' });
    const [instructions, setInstructions] = useState('')
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const addIncredient = () => {
        setIngredients([...ingredients, ingredient]);
        setIngredient({ name: '', amount: '' });
    };

    const addCategory = () => {
        setCategories(categories.concat(category))
        setCategory('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(createRecipy({
                title, 
                description, 
                instructions,
                date: new Date().toISOString(),
                visible: true,
                userId: user.id,
                ingredients, 
                categories: categories.map(category => ({ name: category }))
            }))
            setTitle('')
            setDescription('')
            setIngredients([])
            setInstructions('')
            setCategories([])
            navigate('/recipes')
        }
        catch (error) {
            console.log(error)
        }
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
                    <input value={ingredient.name} onChange={({ target }) => setIngredient({ ...ingredient, name: target.value })}
                     placeholder="Ingredient name" />
                    <input value={ingredient.amount} onChange={({ target }) => setIngredient({ ...ingredient, amount: target.value })}
                     placeholder="Amount" />
                    <button onClick={addIncredient} type="button">add</button>
                </div>
                <div>
                {ingredients.map(ingredient => (
                    <li key={`${ingredient.name}-${ingredient.amount}`}>
                        {ingredient.amount} of {ingredient.name}
                    </li>
                ))}
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