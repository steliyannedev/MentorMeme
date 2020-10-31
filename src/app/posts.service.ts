import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { Cacheable } from '../app/utils/cacheable'
import { IPost, Post } from './models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  resp: Observable<any>;
  // private counter: number = 0;

  // private serverList: Cacheable<string[]> = new Cacheable<string[]>();

  constructor(private http: HttpClient) { 
    // this.serverList.getHandler = () => {
    //   // get data from server
    //   return this.getPosts(0, 10).map((r: Response) => r)
    //   .map((r: Response) => r.json() as string[]);
    //   }
  }

  // public getList() : Observable<string[]> {
  //   return this.serverList.getData();
  // }
  // public refresh() : Observable<string[]> {
  //   return this.serverList.refresh();
  // }

  getPosts(start, end): Observable<Array<Post>>{
    // console.log('start', start, 'end', end)
    // return this.http.get<any[]>(`https://ij9wg26fv5.execute-api.us-east-1.amazonaws.com/dev/posts?start=${start}&end=${end}`, { observe: 'response'})
    return this.http.get<Array<IPost>>(`https://ij9wg26fv5.execute-api.us-east-1.amazonaws.com/dev/posts?start=${start}&end=${end}`)
    .pipe(
      map((resp) => resp),
      // publishReplay(1),
      // refCount()
    )
    // return new Post(resp.body)
  }
  upvotePost(post_id){
    this.http.post(`https://ij9wg26fv5.execute-api.us-east-1.amazonaws.com/dev/posts/${post_id}/like`, {})
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
  downvotePost(post_id){
    this.http.post(`https://ij9wg26fv5.execute-api.us-east-1.amazonaws.com/dev/posts/${post_id}/dislike`, {})
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
}
