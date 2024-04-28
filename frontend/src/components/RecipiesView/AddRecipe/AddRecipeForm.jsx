import UploaderWidget from "../../Uploader/UploaderWidget";

const AddRecipeForm = ({
    title,
    setTitle,
    cookingTime,
    handleCookingTimeChange,
    error,
    ingredients,
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
    setPhotos,
    handleSubmit
}) => {

    return (
        <form onSubmit={handleSubmit}>
                <div>
                    <p>Recipy name:</p>
                    <input name="title" value={title} onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    Cooking time: 
                    <input name="cookingTime" id='cooking-time' value={cookingTime} onChange={handleCookingTimeChange} required placeholder="00:00" />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
                <p>Ingredients:</p>
                <div className="ingredient-inputs">
                    <input name="ingredient" value={ingredient.name} onChange={({ target }) => setIngredient({ ...ingredient, name: target.value })}
                     placeholder="Ingredient name" />
                    <input name="amount" value={ingredient.amount} onChange={({ target }) => setIngredient({ ...ingredient, amount: target.value })}
                     placeholder="Amount" />
                     <select
                        name="unit"
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
                        <button name="addIngredient" onClick={() => deleteIngredient(ingredient)} type="delete">delete</button>
                    </li>
                ))}
                </div>
                <div>
                    Description:
                    <textarea 
                      name="description"
                      value={description}
                      rows="3" cols="50" maxLength="1000"
                      onChange={({ target }) => setDescription(target.value)} />
                </div>
                <div>
                    Instructions:
                    <textarea 
                      name="instructions"
                      value={instructions}
                      rows="3" cols="50" maxLength="1000"
                      onChange={({ target }) => setInstructions(target.value)} />
                </div>
                <div>
                    <p>Category:</p>
                    <input name="category" value={category} onChange={({ target }) => setCategory(target.value)} />
                    <button name="addCategory" onClick={addCategory} type="button">add</button>
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
                <UploaderWidget onChange={setPhotos} />
                <br></br>
                <button type="submit">Submit</button>
            </form>
    )
}

export default AddRecipeForm;