import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { createRecipy } from '../../reducers/recipyReducer'
import UploaderWidget from '../Uploader/UploaderWidget'
import './AddRecipe.css'

const AddRecipe = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [ingredient, setIngredient] = useState({ name: '', amount: '', unit: ''});
    const [units] = useState(['tbsp', 'tsp', 'g', 'kg', 'l', 'dl', 'ml', 'pcs', 'cup', '']);
    const [instructions, setInstructions] = useState('')
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [photos, setPhotos] = useState("");
    const [cookingTime, setCookingTime] = useState('00:00')
    const [error, setError] = useState('')

    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isValidTimeFormat = (time) => {
        const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return regex.test(time);
    };

    const handleCookingTimeChange = (e) => {
        setCookingTime(e.target.value);
        setError('');
      };

    const addIncredient = () => {
        setIngredients([...ingredients, ingredient]);
        setIngredient({ name: '', amount: '', unit: ''});
    };

    const addCategory = () => {
        setCategories(categories.concat(category))
        setCategory('')
    }

    const deleteIngredient = (ingredient) => {
        setIngredients(ingredients.filter(i => i.name !== ingredient.name))
    }

    const deleteCategory = (category) => {
        setCategories(categories.filter(c => c !== category))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidTimeFormat(cookingTime)) {
            setError('Invalid time format');
            return;
          }
        
        try {
            const response = await dispatch(createRecipy({
                title, 
                description, 
                instructions,
                visible: true,
                userId: user.id,
                ingredients, 
                categories: categories.map(category => ({ name: category })),
                cookingTime,
                pictureUuid: photos
            }))
            setTitle('')
            setDescription('')
            setIngredients([])
            setInstructions('')
            setCategories([])
            setCookingTime('00:00')
            navigate('/recipes')
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='add-recipe-container'>
            <h1>Add Recipe</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <p>Recipy name:</p>
                    <input value={title} onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    Cooking time: 
                    <input id='cooking-time' value={cookingTime} onChange={handleCookingTimeChange} required />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
                <p>Ingredients:</p>
                <div className="ingredient-inputs">
                    <input value={ingredient.name} onChange={({ target }) => setIngredient({ ...ingredient, name: target.value })}
                     placeholder="Ingredient name" />
                    <input value={ingredient.amount} onChange={({ target }) => setIngredient({ ...ingredient, amount: target.value })}
                     placeholder="Amount" />
                     <select
                        value={ingredient.unit}
                        onChange={({ target }) => setIngredient({ ...ingredient, unit: target.value })}
                    >
                        <option value="">Unit</option>
                        {units.map((unit) => (
                            <option key={unit} value={unit}>
                                {unit}
                            </option>
                        ))}
                    </select>
                    <button onClick={addIncredient} type="button">add</button>
                </div>
                <div>
                {ingredients.map(ingredient => (
                    <li key={`${ingredient.name}-${ingredient.amount}`}>
                        {ingredient.amount} {ingredient.unit} of {ingredient.name}
                        <button onClick={() => deleteIngredient(ingredient)} type="button">delete</button>
                    </li>
                ))}
                </div>
                <div>
                    Description:
                    <textarea value={description} onChange={({ target }) => setDescription(target.value)} />
                </div>
                <div>
                    Instructions:
                    <textarea value={instructions} onChange={({ target }) => setInstructions(target.value)} />
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
                <h3>Upload image</h3>
                <UploaderWidget files={photos} onChange={setPhotos} />
                <br></br>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddRecipe