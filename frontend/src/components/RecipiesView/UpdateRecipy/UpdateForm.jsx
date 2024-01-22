import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateRecipy } from '../../../reducers/recipyReducer'

const UpdateForm = ({ recipy }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [ingredient, setIngredient] = useState({ name: '', amount: '' });
    const [instructions, setInstructions] = useState('')
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    const setupFields = () => {
        setTitle(recipy.title)
        setDescription(recipy.description)
        setIngredients(recipy.recipy_ingredients.map(i => ({ name: i.ingredient.name, amount: i.amount })))
        setInstructions(recipy.instructions)
        setCategories(recipy.recipy_categories.map(c => c.category.name))
    }

    const addIncredient = () => {
        setIngredients([...ingredients, ingredient]);
        setIngredient({ name: '', amount: '' });
    };

    const addCategory = () => {
        setCategories([...categories, category])
        setCategory('')
    }

    const deleteIngredient = (ingredient) => {
        setIngredients(ingredients.filter(i => i.name !== ingredient.name))
    }

    const deleteCategory = (category) => {
        setCategories(categories.filter(c => c !== category))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await dispatch(updateRecipy( recipy.id, {
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
            {!title && setupFields()}
            <h1>Update Recipy</h1>
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
                        <button onClick={() => deleteIngredient(ingredient)} type="button">delete</button>
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
                <div>Categories: 
                    {categories.map(category => (
                        <li key={category}>
                            {category} 
                            <button onClick={() => deleteCategory(category)} type="button">delete</button>
                        </li>
                    ))}
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default UpdateForm