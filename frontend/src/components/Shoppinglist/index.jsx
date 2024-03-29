import { useSelector } from 'react-redux';

const Shoppinglist = () => {
    const shoppinglist = useSelector(state => state.user.shoppinglist);

    const handleDelete = () => {
        console.log('delete')
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
                        {item.amount} {item.unit} of {item.ingredient}
                        <button onClick={() => handleDelete()}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Shoppinglist