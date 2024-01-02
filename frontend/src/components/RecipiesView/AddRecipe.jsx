import { useDispatch } from 'react-redux'
import { createRecipy } from '../../reducers/recipyReducer'

const AddRecipe = () => {
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const name = data.get('name')
        const ingredients = data.get('ingredients')
        const instructions = data.get('instructions')
        const category = data.get('category')
        console.log(name, ingredients, instructions, category);
        dispatch(createRecipy(name, ingredients, instructions, category))

    }

    return (
        <div>
            <h1>AddRecipe</h1>
            <form onSubmit={handleSubmit}>
                Recipy name:
                <input type="text" name="name" />
                <br></br>
                Ingredients:
                <input type="text" name="ingredients" />
                <br></br>
                Instructions:
                <input type="text" name="instructions" />
                <br></br>
                Category:
                <input type="text" name="category" />
                <br></br>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default AddRecipe