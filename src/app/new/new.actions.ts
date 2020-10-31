import { createAction, props } from '@ngrx/store'

import { IPost } from '../models/post'


export const addPost = createAction('[Post] Create Post', props<{payload: Array<IPost>}>());
export const loadPosts = createAction('[Posts] Load Posts');
export const successLoad = createAction('[Posts] Success Load Posts', props<{payload: Array<IPost>}>());
export const failLoad = createAction('[Posts] Fail Load Posts');
