import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteFromShoppinglist, sendShoppinglistItems } from '../../reducers/userReducer';
import { combineIngredients } from '../../util/shoppingListFunctions';
import ItemAddForm from './ItemAddForm';
import './Shoppinglist.css';

const Shoppinglist = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const shoppinglist = useSelector(state => state.user.shoppinglist);

    const handleDelete = (id) => {
        dispatch(deleteFromShoppinglist(id))
        shoppinglist.filter(item => item.id !== id)
    }

    if (!shoppinglist) {
        return <>No items on shoppinglist</>
    }

    const combinedShoppingList = combineIngredients(shoppinglist);

    const handleSendShoppinglist = (e) => {
        e.preventDefault();
        const info = {
            email: email,
            items: combinedShoppingList
        }
        dispatch(sendShoppinglistItems(info))
    }

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
            <div>
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type='submit' onClick={handleSendShoppinglist}>Send shoppinglist</button>
            </div>
        </div>
    )
}

export default Shoppinglist