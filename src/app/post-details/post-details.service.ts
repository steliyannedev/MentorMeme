import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PostDetailsService {

  constructor(private http: HttpClient) { }

  getPostDetails(id){
    var postDetails = new Subject<any>()
    this.http.get(`https://ij9wg26fv5.execute-api.us-east-1.amazonaws.com/dev/posts/${id}`)
    .subscribe(
      resp => {
        postDetails.next(resp[0])
      }
    )
    return postDetails.asObservable()
  }
  getPostComments(id){
    var postComments = new Subject<any>()
    this.http.get(`https://ij9wg26fv5.execute-api.us-east-1.amazonaws.com/dev/posts/${id}/comments`)
    .subscribe(
      resp => {
        postComments.next(resp)
      }
    )
    return postComments.asObservable()
  }
}
