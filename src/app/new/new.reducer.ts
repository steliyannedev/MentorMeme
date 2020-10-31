import { createReducer, on } from '@ngrx/store'

import { IPost } from '../models/post'
import * as PostActions from './new.actions';

export interface IState {
    initialPosts: Array<IPost>;
    start: number;
    end: number;
  }

export const initialState: IState = {
    initialPosts: [],
    start: 0,
    end: 10
}

export const postsReducer = createReducer(initialState, 
    on(PostActions.successLoad, (state, {payload}) => ({...state, initialPosts: payload, start: state.end + 1, end: state.end + 10}))
)


