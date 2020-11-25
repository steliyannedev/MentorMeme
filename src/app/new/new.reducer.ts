import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store'

import { IPost } from '../models/post'
import * as PostActions from './new.actions';

export interface IState {
    posts: Array<IPost>;
  }

export const initialState: IState = {
    posts: []
}

export const postsReducer = createReducer(initialState, 
    on(PostActions.successLoad, (state, {payload}) => ({...state, initialPosts: [...initialState.posts, ...payload]})),
    on(PostActions.upvotePost, (state, {payload}) => {
        const postsCopy = [...state.posts]
        const result = postsCopy.map(ele => {
            if(ele['post_id'] == payload){
                ele = {...ele, post_likes: ele.post_likes + 1}
            }
            return ele
        })
        return {
            ...state,
            initialPosts: [...initialState.posts, ...result]
        }
    })
)


