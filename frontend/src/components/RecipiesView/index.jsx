import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Recipies from './Recipies';
import Filter from '../Filter';
import Togglable from '../Togglable';
import { filterBy } from '../../util/filterFunction';


const RecipiesView = () => {
    const recipies = useSelector(state => state.recipies)
    const [filteredRecipies, setFilteredRecipies] = useState(recipies);

    useEffect(() => {
        setFilteredRecipies(recipies);
    }, [recipies]);

    const handleFilter = ({ option, value }) => {
        const filtered = recipies.filter((recipe) =>
            filterBy({ option, value, recipe })
        );

        setFilteredRecipies(filtered);
    };

    const handleCancel = () => {
        setFilteredRecipies(recipies);
    }

    return (
        <div>
            <Togglable buttonLabel="Filter" onCancel={handleCancel}>
                <Filter onFilter={handleFilter} />
            </Togglable>
            <br></br>
            <Recipies recipies={filteredRecipies} />
        </div>
    )
}

export default RecipiesView