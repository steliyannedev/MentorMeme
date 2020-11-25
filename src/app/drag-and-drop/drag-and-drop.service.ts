import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  savePost(body){
    this.http.post('https://ij9wg26fv5.execute-api.us-east-1.amazonaws.com/dev/posts', body)
    .subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      (error) => {
          console.log("POST call in error", error);
      },
      () => {
        this.dialog.closeAll()
          console.log("The POST observable is now completed.");
      });
  }
}
