

const AddRecipe = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        console.log(data);
        fetch('http://localhost:8000/api/recipes/', {
            method: 'POST',
            body: data,
        });
    }

    return (
        <div>
            <h1>AddRecipe</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" />
                <input type="text" name="ingredients" />
                <input type="text" name="instructions" />
                <input type="text" name="category" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default AddRecipe