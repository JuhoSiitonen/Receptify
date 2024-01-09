
const Rating = () => {

    return (
        <div>
            Rating
            <form> 
                <input type="radio" id="1" name="rating" value="1" />
                <label for="1">1</label>
                <input type="radio" id="2" name="rating" value="2" />
                <label for="2">2</label>
                <input type="radio" id="3" name="rating" value="3" />
                <label for="3">3</label>
                <input type="radio" id="4" name="rating" value="4" />
                <label for="4">4</label>
                <input type="radio" id="5" name="rating" value="5" />
                <label for="5">5</label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Rating