

const Recipies = ({ recipies }) => {
    return (
        <div>
            {recipies.map((recipe) => (
                <div key={recipe.id}>
                    <h1>{recipe.title}</h1>
                    <p>{recipe.description}</p>
                    <p>{recipe.ingredients}</p>
                    <p>{recipe.instructions}</p>
                </div>
            ))}
        </div>
    )
}

export default Recipies