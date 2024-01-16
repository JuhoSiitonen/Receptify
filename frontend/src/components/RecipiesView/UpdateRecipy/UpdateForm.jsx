

const UpdateForm = ({ recipy }) => {

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event.target.title.value)
        
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Recipy name:
                    <input type="text" name="title" defaultValue={recipy.title} />
                </div>
                <div>
                    Description:
                    <input type="text" name="description" defaultValue={recipy.description} />
                </div>
                <div>
                    Ingredients:
                    <input type="text" name="ingredients" defaultValue={recipy.recipy_ingredients.map(ingredient => ingredient.name)} />
                </div>
                <div>
                    Instructions:
                    <input type="text" name="instructions" defaultValue={recipy.instructions} />
                </div>
                <div>
                    Categories:
                    <input type="text" name="categories" defaultValue={recipy.recipy_categories.map(category => category.name)} />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default UpdateForm