import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import {  Event, NavigationStart } from '@angular/router'
import { map } from 'rxjs/operators';
import { IPost, Post } from './models/post';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  resp: Observable<any>;
  section;

  constructor(private http: HttpClient, private router: Router) { 

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
          this.section = event.url.replace('/', '')
          if(this.section == ''){
            this.section = 'new'
          }
      }
    });
  }

  getPosts(page, number_of_posts): Observable<Array<Post>>{
    console.log('page', page)
    console.log('number', number_of_posts)
    return this.http.get<Array<IPost>>(`https://ij9wg26fv5.execute-api.us-east-1.amazonaws.com/dev/posts?page=${page}&section=${this.section}&number_of_posts=${number_of_posts}`)
    .pipe(
      map((resp) => {
        console.log(resp)
        return resp
      })
    )
    
  }
  upvotePost(post_id, username){
    this.http.post(`https://ij9wg26fv5.execute-api.us-east-1.amazonaws.com/dev/posts/${post_id}/like?username=${username}`, {})
    .subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      (error) => {
          console.log("POST call in error", error);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
  }
  downvotePost(post_id, username){
    this.http.post(`https://ij9wg26fv5.execute-api.us-east-1.amazonaws.com/dev/posts/${post_id}/dislike?username=${username}`, {})
    .subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      (error) => {
          console.log("POST call in error", error);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
  }

  getAllLikedPostsFromUser(username){
    return this.http.get(`https://ij9wg26fv5.execute-api.us-east-1.amazonaws.com/dev/${username}/likes`, {})
    .subscribe(
      (val) => {
        return of(val)
          // console.log("POST call successful value returned in body", 
          //             val);
      });
  }
  getLiked(username){
    return this.http.get(`https://ij9wg26fv5.execute-api.us-east-1.amazonaws.com/dev/${username}/likes`, {}).pipe(map(response => response))
  }
}
