import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'

const commentSlice = createSlice({
    name: 'comment',
    initialState: null,
    reducers: {
        setComment(state, action) {
        return action.payload
        },
        removeComment(state, action) {
        return null
        }
    },
})

export const { setComment, removeComment } = commentSlice.actions

export const createComment = (id, newObject) => {
    return async dispatch => {
        const comment = await commentService.create(id, newObject)
        dispatch(setComment(comment))
    }
}

export const getAllComments = (id) => {
    return async dispatch => {
        const comments = await commentService.getAllComments(id)
        dispatch(setComment(comments))
    }
}

export default commentSlice.reducer