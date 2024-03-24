import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllRecipies } from '../../reducers/recipyReducer';
import Recipies from './Recipies';
import Filter from '../Filter';
import Togglable from '../Togglable';
import LoadingSpinner from '../LoadingSpinner';
import SortBy from '../SortBy';
import ShowFavoritesButton from './ShowFavoritesButton';
import ShowSubscribedButton from './ShowSubscribedButton';

const RecipiesView = () => {
    const dispatch = useDispatch()
    const recipies = useSelector(state => state.recipies)
    const [query, setQuery] = useState('');
    const [favorites, setFavorites] = useState(false);
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        dispatch(getAllRecipies(query, favorites, subscribed));
      }, [query, favorites, subscribed]);
    
    if (!recipies) {
        return <LoadingSpinner />
    }

    const handleFilter = ({ option, value }) => {
        if (query === '') {
            let queryParams = `${option}=${value}`
            setQuery(queryParams)
        } else {
            let queryParams = `&${option}=${value}`
            let newQuery = query + queryParams
            setQuery(newQuery)
        }
        
    };

    const handleSort = ({ option, value }) => {
        if (query === '') {
            let queryParams = `sort=${option}&order=${value}`
            setQuery(queryParams)
        } else {
            let queryParams = `&sort=${option}&order=${value}`
            let newQuery = query + queryParams
            setQuery(newQuery)
        }
    }

    const handleCancel = () => {
        setQuery('')
    }

    return (
        <div>
          <div className='user-actions'>
            <div className='action-button'>
              <Togglable buttonLabel="Filter" onCancel={handleCancel}>
                <Filter onFilter={handleFilter} />
              </Togglable>
            </div>
            <div className='action-button'>
              <Togglable buttonLabel="Sort" onCancel={handleCancel}>
                <SortBy onSort={handleSort} />
              </Togglable>
            </div>
            <div className='action-button'>
              <ShowFavoritesButton favorites={favorites} setFavorites={setFavorites} />
            </div>
            <div className='action-button'>
              <ShowSubscribedButton subscribed={subscribed} setSubscribed={setSubscribed} />
            </div>
          </div>
            <Recipies recipies={recipies} />
        </div>
    )
}

export default RecipiesView