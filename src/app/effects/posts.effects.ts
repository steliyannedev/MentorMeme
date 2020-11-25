import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostsService } from '../posts.service'
 
@Injectable()
export class PostEffects {

    loadPosts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType('[Posts] Load Posts'),
            map(action => action),
            mergeMap((action) => this.postService.getPosts(action['paginator'], action['number_of_posts'])
                    .pipe(
                        map((posts: any) => ({ type: '[Posts] Success Load Posts', payload: posts })),
                        catchError(() => of({type: '[Posts] Fail Load Posts'}))
                    )
                )
        )
    })
 
  constructor(
    private actions$: Actions,
    private postService: PostsService,
  ) {}
}