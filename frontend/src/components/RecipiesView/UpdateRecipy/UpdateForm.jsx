import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateRecipy } from '../../../reducers/recipyReducer'
import '../../../styles/AddRecipe.css'
import AddRecipeForm from '../AddRecipe/AddRecipeForm'

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
        if (!ingredient.name || !ingredient.amount) {
            alert('Please fill in ingredient name and amount fields');
            return;
        }
        setIngredients([...ingredients, ingredient]);
        setIngredient({ name: '', amount: '', unit: ''});
    };

    const addCategory = () => {
        if (!category) {
            alert('Please fill in category field');
            return;
        }
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

        if (title === '' || description === '' || instructions === '' || ingredients.length === 0 || categories.length === 0) {
            alert('Please fill in all fields');
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

export default UpdateForm