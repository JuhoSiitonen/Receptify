import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
    const user = useSelector(state => state.user)

    const setupFields = () => {
        setTitle(recipy.title)
        setDescription(recipy.description)
        setIngredients(recipy.recipy_ingredients)
        setInstructions(recipy.instructions)
        setCategories(recipy.recipy_categories)
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
        setIngredients(ingredients.filter(i => i.id !== ingredient.id))
    }

    const deleteCategory = (category) => {
        setCategories(categories.filter(c => c.id !== category.id))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event.target.title.value)
        
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
                    <li key={`${ingredient.id}-${ingredient.ingredient.id}`}>
                        {ingredient.amount} of {ingredient.ingredient.name}
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
                    {categories.map(category => {
                        <li key={category.id}>
                            {category.category.name} 
                            <button onClick={() => deleteCategory(category)} type="button">delete</button>
                        </li>
                    })}
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default UpdateForm