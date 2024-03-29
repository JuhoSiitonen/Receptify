import { useSelector, useDispatch } from 'react-redux';
import { deleteFromShoppinglist } from '../../reducers/userReducer';
import ItemAddForm from './ItemAddForm';

const Shoppinglist = () => {
    const dispatch = useDispatch();
    const shoppinglist = useSelector(state => state.user.shoppinglist);

    const handleDelete = (id) => {
        dispatch(deleteFromShoppinglist(id))
        shoppinglist.filter(item => item.id !== id)
    }

    const combineIngredients = (list) => {
        const combinedList = [];
        list.forEach(item => {
            const existingItemIndex = combinedList.findIndex(elem => elem.ingredient === item.ingredient);
            if (existingItemIndex !== -1) {
                combinedList[existingItemIndex].amount = Number(combinedList[existingItemIndex].amount) + Number(convertToBaseUnit(item.amount, item.unit))
            } else {
                combinedList.push({ ...item, amount: convertToBaseUnit(item.amount, item.unit) });
            }
        });
        return combinedList;
    };

    const convertToBaseUnit = (amount, unit) => {
        switch (unit) {
            case 'tbsp':
                return amount * 15; 
            case 'tsp':
                return amount * 5; 
            case 'kg':
                return amount * 1000; 
            case 'l':
                return amount * 1000; 
            case 'dl':
                return amount * 100; 
            case 'cup':
                return amount * 240;
            case 'pcs':
            case '':
                return amount; 
            default:
                return amount; 
        }
    };


    if (!shoppinglist) {
        return <>No items on shoppinglist</>
    }

    const combinedShoppingList = combineIngredients(shoppinglist);

    return (
        <div>
            <h1>Shoppinglist</h1>
            <ItemAddForm />
            <ul>
                {combinedShoppingList.map(item => (    
                    <li key={item.id}>
                        {item.amount} {item.unit} of {item.ingredient} {item.recipy}
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Shoppinglist