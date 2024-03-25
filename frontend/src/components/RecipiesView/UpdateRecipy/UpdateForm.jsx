import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateRecipy } from '../../../reducers/recipyReducer'
import UploaderWidget from '../../Uploader/UploaderWidget'
import '../AddRecipe.css'

const UpdateForm = ({ recipy }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [ingredient, setIngredient] = useState({ name: '', amount: '', unit: ''});
    const [units] = useState(['tbsp', 'tsp', 'g', 'kg', 'l', 'dl', 'ml', 'pcs', 'cup', '']);
    const [instructions, setInstructions] = useState('')
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [visible, setVisible] = useState(false)
    const [photos, setPhotos] = useState("");
    const [cookingTime, setCookingTime] = useState('00:00')
    const [error, setError] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isValidTimeFormat = (time) => {
        const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return regex.test(time);
    };

    const setupFields = () => {
        const formattedTime = recipy.cookingTime.split(':').slice(0, 2).join(':')

        setTitle(recipy.title)
        setDescription(recipy.description)
        setIngredients(recipy.recipy_ingredients.map(i => ({ name: i.ingredient.name, amount: i.amount, unit: i.unit })))
        setInstructions(recipy.instructions)
        setCategories(recipy.recipy_categories.map(c => c.category.name))
        setVisible(true)
        setCookingTime(formattedTime)
        setPhotos(recipy.pictureUuid)
    }

    const handleCookingTimeChange = (e) => {
        setCookingTime(e.target.value);
        setError('');
      };

    const addIncredient = () => {
        setIngredients([...ingredients, ingredient]);
        setIngredient({ name: '', amount: '', unit: ''});
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

        if (!isValidTimeFormat(cookingTime)) {
            setError('Invalid time format');
            return;
        }

        try {
            await dispatch(updateRecipy( recipy.id, {
                title, 
                description, 
                instructions,
                date: new Date().toISOString(),
                visible: true,
                ingredients, 
                categories: categories.map(category => ({ name: category })),
                cookingTime,
                pictureUuid: photos
            }))
            navigate(`/recipes/${recipy.id}`)
        }
        catch (error) {
            console.log(error)
        }
        
    }
    return (
        <div className='add-recipe-container'>
            {!visible && setupFields()}
            <h1>Update Recipy</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    Recipy name:
                    <input value={title} onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    Cooking time:
                    <input value={cookingTime} onChange={handleCookingTimeChange} required />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
                <div>
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
                        <option value="">Select unit</option>
                        {units.map((unit) => (
                            <option key={unit} value={unit}>
                                {unit}
                            </option>
                        ))}
                    </select>
                    <button onClick={addIncredient} type="button">add</button>
                    </div>
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
                    <textarea 
                      value={description}
                      rows="3" cols="50" maxLength="1000"
                      onChange={({ target }) => setDescription(target.value)} />
                </div>
                <div>
                    Instructions:
                    <textarea
                      value={instructions}
                      rows="3" cols="50" maxLength="1000"
                      onChange={({ target }) => setInstructions(target.value)} />
                </div>
                <div>
                    Category:
                    <input value={category} onChange={({ target }) => setCategory(target.value)} />
                    <button onClick={addCategory} type="button">add</button>
                </div>
                <div> 
                    {categories.map(category => (
                        <li key={category}>
                            {category} 
                            <button onClick={() => deleteCategory(category)} type="button">delete</button>
                        </li>
                    ))}
                </div>
                <h3>Change picture</h3>
                <UploaderWidget files={photos} onChange={setPhotos} />
                <br></br>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default UpdateForm