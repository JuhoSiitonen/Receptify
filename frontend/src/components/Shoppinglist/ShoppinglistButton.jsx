import { useDispatch } from "react-redux";
import { addToShoppinglist } from "../../reducers/userReducer";

const ShoppinglistButton = ({ recipy }) => {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();

        const shoppinglist = 
            recipy.recipy_ingredients.map(ingredient => {
                return {
                    ingredient: ingredient.ingredient.name,
                    amount: ingredient.amount,
                    unit: ingredient.unit
                }
            })
        
        console.log(shoppinglist);
        dispatch(addToShoppinglist(shoppinglist));
    }

    return (
        <div>
            <button onClick={handleClick}>Add to Shoppinglist</button>
        </div>
    )
}

export default ShoppinglistButton;