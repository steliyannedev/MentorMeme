import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { PostsService } from '../posts.service'
import * as fromActions from '../new/new.actions'
import { select, Store } from '@ngrx/store';
import { IState, postsReducer } from '../new/new.reducer'
import { Action } from 'rxjs/internal/scheduler/Action';
import { IPost } from '../models/post';
 
@Injectable()
export class PostEffects {
 
//   loadMovies$ = createEffect(() => this.actions$.pipe(
//     ofType('[Movies Page] Load Movies'),
//     mergeMap(() => this.postService.getPosts()
//       .pipe(
//         map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
//         catchError(() => EMPTY)
//       ))
//     )
//   );
    loadPosts$ = createEffect(() => {
        // this.actions$.pipe(
        //     ofType(fromActions.loadPosts),
        //     withLatestFrom(this.store.pipe(
        //         select(postsReducer)
        //     )),
        //     switchMap(([_, optionState]) => {
        //         this.getPosts(optionState.start, optionState.end)
        //     })
        // )
        let start;
        let end;
        this.store.subscribe(result => {
            start = result['post'].start
            end = result['post'].end
        })
        return this.actions$.pipe(
            ofType('[Posts] Load Posts'),
            switchMap(() => this.postService.getPosts(start, end)
                .pipe(
                    map((posts: any) => ({ type: '[Posts] Success Load Posts', payload: posts })),
                    catchError(() => of({type: '[Posts] Fail Load Posts'}))
                )
            )
        )
    })

    // getPosts = (start: number, end:number):Observable<any> => {
    //     return this.postService.getPosts(start, end)
    //         .pipe(
    //             map((post: Array<IPost>) => fromActions.successLoad({payload: post})),
    //             catchError(() => of({type: '[Posts] Fail Load Posts'}))
    //         )
    // }
 
  constructor(
    private actions$: Actions,
    private postService: PostsService,
    private store: Store
  ) {}
}