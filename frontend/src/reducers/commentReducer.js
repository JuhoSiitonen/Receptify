import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'
import { addNotification } from './notificationReducer'

const commentSlice = createSlice({
    name: 'comment',
    initialState: null,
    reducers: {
        setComment(state, action) {
            return action.payload
        },
        removeComment(state, action) {
            const id = action.payload
            return state.filter(r => r.id !== id)
        }
    },
})

export const { setComment, removeComment } = commentSlice.actions

export const createComment = (id, newObject) => {
    return async dispatch => {
        try {
            await commentService.create(id, newObject)
            dispatch(addNotification({
                message: 'Comment added successfully!', 
                error: false}))
        } catch (error) {
            dispatch(addNotification({
                message: 'Comment could not be added!', 
                error: true}))
            console.log(error)
            throw error
        }
    }
}

export const getAllComments = (id) => {
    return async dispatch => {
        try {
            const comments = await commentService.getAllComments(id)
            dispatch(setComment(comments))
            return comments
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export const deleteComment = (id) => {
    return async dispatch => {
        try {
            await commentService.deleteComment(id)
            dispatch(removeComment(id))
            dispatch(addNotification({
                message: 'Comment deleted successfully!', 
                error: false}))
        } catch (error) {
            dispatch(addNotification({
                message: 'Comment could not be deleted!', 
                error: true}))
            console.log(error)
            throw error
        }
    }
}

export default commentSlice.reducer