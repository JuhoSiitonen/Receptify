import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllRecipies } from '../../reducers/recipyReducer';
import Recipies from './Recipies';
import Filter from '../Filter';
import Togglable from '../Togglable';
import LoadingSpinner from '../LoadingSpinner';
import SortBy from '../SortBy';
import ShowFavoritesButton from './Buttons/ShowFavoritesButton';
import ShowSubscribedButton from './Buttons/ShowSubscribedButton';
import InfiniteScroll from "react-infinite-scroll-component";

const RecipiesView = () => {
    const dispatch = useDispatch()
    const recipies = useSelector(state => state.recipies)
    const [filtering, setFiltering] = useState('')
    const [sorting, setSorting] = useState('')
    const [query, setQuery] = useState('');
    const [favorites, setFavorites] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        dispatch(getAllRecipies(query, favorites, subscribed));
        setHasMore(true)
      }, [query, favorites, subscribed]);

    const fetchMoreData = async () => {
        await dispatch(getAllRecipies(query, favorites, subscribed, recipies.length))
        if (recipies.length % 5 === 0) {
            setHasMore(true)
        } else {
            setHasMore(false)
        }
    }
    
    if (!recipies) {
        return <LoadingSpinner />
    }

    const handleFilter = ({ option, value }) => {
        if (query === '') {
            let queryParams = `${option}=${value}`
            setFiltering(queryParams)
            setQuery(queryParams)
        } else if (filtering === '' && query !== '') {
            let queryParams = `&${option}=${value}`
            let newQuery = query + queryParams
            setFiltering(queryParams)
            setQuery(newQuery)
        } 
        else {
            let queryParams = `${option}=${value}&`
            setFiltering(queryParams)
            let newQuery = queryParams + sorting 
            setQuery(newQuery)
        }
        
    };

    const handleSort = ({ option, value }) => {
        if (query === '') {
            let queryParams = `sort=${option}&order=${value}`
            setSorting(queryParams)
            setQuery(queryParams)
        } else if (sorting === '' && query !== '') {
            let queryParams = `sort=${option}&order=${value}`
            let newQuery = query + '&' + queryParams
            setSorting(queryParams)
            setQuery(newQuery)
        }
        else {
            let queryParams = `sort=${option}&order=${value}&`
            setSorting(queryParams)
            let newQuery = queryParams + filtering
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
              <ShowFavoritesButton 
                favorites={favorites} 
                setFavorites={setFavorites}
                subscribed={subscribed}
                setSubscribed={setSubscribed}
                />
            </div>
            <div className='action-button'>
              <ShowSubscribedButton 
                subscribed={subscribed} 
                setSubscribed={setSubscribed}
                favorites={favorites}
                setFavorites={setFavorites}
                />
            </div>
          </div>
            <InfiniteScroll
                dataLength={recipies.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<LoadingSpinner />}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
              <Recipies recipies={recipies} />
            </InfiniteScroll>
        </div>
    )
}

export default RecipiesView