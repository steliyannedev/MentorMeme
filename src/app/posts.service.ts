import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  data = []

  constructor(private http: HttpClient) { }

  getPosts(start, end): any{
    this.http.get<any[]>(`https://0hq1m2l5a7.execute-api.us-east-1.amazonaws.com/dev/get-all-posts?start=${start}&end=${end}`, { observe: 'response'})
      .subscribe(resp => {
        resp.body.forEach(element => {
          this.data.push(element)
        })
      })
    return this.data
  }
}
