import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { createRecipy } from '../../reducers/recipyReducer'
import UploaderWidget from '../Uploader/UploaderWidget'

const AddRecipe = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [ingredient, setIngredient] = useState({ name: '', amount: '' });
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
        setIngredient({ name: '', amount: '' });
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
                    Cooking time:
                    <input value={cookingTime} onChange={handleCookingTimeChange} required />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
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
                <h3>Upload image</h3>
                <UploaderWidget files={photos} onChange={setPhotos} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default AddRecipe