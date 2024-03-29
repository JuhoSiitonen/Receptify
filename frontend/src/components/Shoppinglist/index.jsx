import { useSelector, useDispatch } from 'react-redux';
import { deleteFromShoppinglist } from '../../reducers/userReducer';

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

    return (
        <div>
            <h1>Shoppinglist</h1>
            <ul>
                {shoppinglist.map(item => (    
                    <li key={item.ingredient}>
                        {item.amount} {item.unit} of {item.ingredient} {item.recipy}
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Shoppinglist