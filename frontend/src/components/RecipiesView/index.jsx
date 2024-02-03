import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Recipies from './Recipies';
import Filter from '../Filter';
import Togglable from '../Togglable';
import { filterBy } from '../../util/filterFunction';
import { getAllRecipies } from '../../reducers/recipyReducer';


const RecipiesView = () => {
    const dispatch = useDispatch()
    dispatch(getAllRecipies())

    const recipies = useSelector(state => state.recipies)
    const [filteredRecipies, setFilteredRecipies] = useState(recipies);

    useEffect(() => {
        setFilteredRecipies(recipies);
    }, [recipies]);

    if (!recipies) {
        return <></>
    }

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