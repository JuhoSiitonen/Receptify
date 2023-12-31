import { useState, useEffect } from 'react';
import Recipies from './Recipies';
import recipyService from '../services/recipies';


const RecipiesView = () => {
    const [recipies, setRecipies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipies = async () => {
            const response = await recipyService.getAll();
            setRecipies(response);
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