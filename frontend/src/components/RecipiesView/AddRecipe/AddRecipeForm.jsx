import UploaderWidget from "../../Uploader/UploaderWidget";

const AddRecipeForm = ({
    title,
    setTitle,
    cookingTime,
    handleCookingTimeChange,
    error,
    ingredients,
    setIngredients,
    ingredient,
    setIngredient,
    addIncredient,
    deleteIngredient,
    description,
    setDescription,
    instructions,
    setInstructions,
    category,
    setCategory,
    categories,
    addCategory,
    deleteCategory,
    units,
    photos,
    setPhotos,
    handleSubmit
}) => {


    return (
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
                        <button onClick={() => deleteIngredient(ingredient)} type="delete">delete</button>
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
                    <p>Category:</p>
                    <input value={category} onChange={({ target }) => setCategory(target.value)} />
                    <button onClick={addCategory} type="button">add</button>
                </div>
                <div>
                    {categories.map(category => (
                        <li key={category}>
                            {category} 
                            <button type="delete" onClick={() => deleteCategory(category)} >delete</button>
                        </li>
                    ))}
                </div>
                <h3>Upload image</h3>
                <UploaderWidget files={photos} onChange={setPhotos} />
                <br></br>
                <button type="submit">Submit</button>
            </form>
    )
}

export default AddRecipeForm;