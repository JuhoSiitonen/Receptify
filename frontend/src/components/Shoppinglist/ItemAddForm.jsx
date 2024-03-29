import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToShoppinglist } from '../../reducers/userReducer';

const ItemAddForm = () => {
    const dispatch = useDispatch();
    const [ingredient, setIngredient] = useState('');
    const [amount, setAmount] = useState('');
    const [units] = useState(['tbsp', 'tsp', 'g', 'kg', 'l', 'dl', 'ml', 'pcs', 'cup', '']);
    const [unit, setUnit] = useState('');
    
    const handleAddItem = (e) => {
        e.preventDefault();

        const item = {
            id: Math.floor(Math.random() * 10000000),
            ingredient,
            amount,
            unit,
        }

        const items = [item];

        dispatch(addToShoppinglist(items));

        setIngredient('');
        setAmount('');
        setUnit('');
    };
    
    return (
        <form onSubmit={handleAddItem}>
        <input
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
        />
        <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
        />
        <select
            value={unit}
            onChange={({ target }) => setUnit(target.value)}>
                <option value="">Unit</option>
                    {units.map((unit) => (
                        <option key={unit} value={unit}>
                            {unit}
                        </option>
                    ))}
            </select>
        <button type="submit">Add</button>
        </form>
    );
    }

export default ItemAddForm;