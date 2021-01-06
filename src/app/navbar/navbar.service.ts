import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private http: HttpClient) { }

  searchPost(words){
    return this.http.get<any[]>(`https://ij9wg26fv5.execute-api.us-east-1.amazonaws.com/dev/posts/search?letters=${words}`, { observe: 'response'})
    .pipe(
      map((resp) => {
        return resp.body
      })
    )
  }
}
