import { useState, useEffect } from 'react';
import Recipies from './Recipies';


const RecipiesView = () => {
    const [recipies, setRecipies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipies = async () => {
            const response = await fetch('http://localhost:3001/api/recipies');
            const data = await response.json();
            setRecipies(data);
            setLoading(false);
        }
        fetchRecipies();
    }, []);

    return (
        <div>
            {loading ? <h1>Loading...</h1> : <Recipies recipies={recipies} />}
        </div>
    )
}

export default RecipiesView