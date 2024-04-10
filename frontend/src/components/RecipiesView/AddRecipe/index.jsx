import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { createRecipy } from '../../../reducers/recipyReducer'
import UploaderWidget from '../../Uploader/UploaderWidget'
import './AddRecipe.css'
import AddRecipeForm from './AddRecipeForm'

const AddRecipe = ({ recipy }) => {
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
            <AddRecipeForm 
                title={title}
                setTitle={setTitle}
                cookingTime={cookingTime}
                handleCookingTimeChange={handleCookingTimeChange}
                error={error}
                ingredients={ingredients}
                setIngredients={setIngredients}
                ingredient={ingredient}
                setIngredient={setIngredient}
                addIncredient={addIncredient}
                deleteIngredient={deleteIngredient}
                description={description}
                setDescription={setDescription}
                instructions={instructions}
                setInstructions={setInstructions}
                category={category}
                setCategory={setCategory}
                categories={categories}
                addCategory={addCategory}
                deleteCategory={deleteCategory}
                units={units}
                photos={photos}
                setPhotos={setPhotos}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default AddRecipe