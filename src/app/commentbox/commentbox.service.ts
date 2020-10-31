import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommentboxService {

  constructor(private http: HttpClient) { }

  saveComment(comment, post_id){
    this.http.post(`https://ij9wg26fv5.execute-api.us-east-1.amazonaws.com/dev/posts/${post_id}/comments`, {
      currentDate: new Date(),
      commentTxt: comment
    })
    .subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
    });
  }
}
