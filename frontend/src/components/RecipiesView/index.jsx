import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Recipies from './Recipies';
import Filter from '../Filter';


const RecipiesView = () => {
    const recipies = useSelector(state => state.recipies)
    const [filteredRecipies, setFilteredRecipies] = useState(recipies);

    useEffect(() => {
        setFilteredRecipies(recipies);
    }, [recipies]);

    const handleFilter = ({ option, value }) => {
        const filtered = recipies.filter((recipe) =>
            recipe[option].toLowerCase().includes(value.toLowerCase())
        );

        setFilteredRecipies(filtered);
    };

    return (
        <div>
            <Filter onFilter={handleFilter} />
            <Recipies recipies={filteredRecipies} />
        </div>
    )
}

export default RecipiesView