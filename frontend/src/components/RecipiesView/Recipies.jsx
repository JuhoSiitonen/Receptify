import SingleRecipy from "./SingleRecipy"

const Recipies = ({ recipies }) => {
    return (
        <div>
            {recipies.map((recipe) => (
                <div key={recipe.id}>
                    <SingleRecipy recipy={recipe} />
                </div>
            ))}
        </div>
    )
}

export default Recipies