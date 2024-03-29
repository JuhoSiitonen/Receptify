import { useSelector, useDispatch } from 'react-redux';
import { deleteFromShoppinglist } from '../../reducers/userReducer';
import { combineIngredients } from '../../util/shoppingListFunctions';
import ItemAddForm from './ItemAddForm';
import './Shoppinglist.css';

const Shoppinglist = () => {
    const dispatch = useDispatch();
    const shoppinglist = useSelector(state => state.user.shoppinglist);

    const handleDelete = (id) => {
        dispatch(deleteFromShoppinglist(id))
        shoppinglist.filter(item => item.id !== id)
    }

    if (!shoppinglist) {
        return <>No items on shoppinglist</>
    }

    const combinedShoppingList = combineIngredients(shoppinglist);

    return (
        <div className='shoppinglist-container'>
            <h1>Shoppinglist</h1>
            <ItemAddForm />
            <ul>
                {combinedShoppingList.map(item => (    
                    <li key={item.id}>
                        {item.amount} {item.unit} of {item.ingredient} {item.recipy}
                        <button type='delete' onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Shoppinglist