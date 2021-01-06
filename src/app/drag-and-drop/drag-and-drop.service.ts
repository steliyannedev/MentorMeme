import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {

  private data = new BehaviorSubject('');
  currentData = this.data.asObservable()

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) { }

  savePost(body){
    this.http.post('https://ij9wg26fv5.execute-api.us-east-1.amazonaws.com/dev/posts', body)
    .subscribe(
      (val) => {
        this.data.next('val')
          // console.log("POST call successful value returned in body", 
          //             val);
      },
      (error) => {
          console.log("POST call in error", error);
      },
      () => {
        this.dialog.closeAll()
        this.router.navigate(['/new'])
      }
      );
  }
}
