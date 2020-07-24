import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostsService } from '../posts.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  data = [];
  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 500;
  start = 0
  end = 10


  constructor(private http: HttpClient, private postService: PostsService, private router: Router) {}
  
  onScrollDown(){
    // this.start += 10
    // return this.http.get<any[]>(`https://0hq1m2l5a7.execute-api.us-east-1.amazonaws.com/dev/get-all-posts?start=${this.start}&end=${this.end}`, { observe: 'response'})
    //   .subscribe(
    //     resp => {
    //       resp.body.forEach(element => {
    //         this.data.push(element)
    //       })
    //     }
    //   ),
      console.log(this.data)
  }
  getRecords(){
    // return this.http.get<any[]>(`https://0hq1m2l5a7.execute-api.us-east-1.amazonaws.com/dev/get-all-posts?start=${this.start}&end=${this.end}`, { observe: 'response'})
    //   .subscribe(
    //     resp => {
    //       resp.body.forEach(element => {
    //         this.data.push(element)
    //       })
    //     }
    //   )
    
      this.data.push(
        {'id': 1, 'post_author': 'gergi', 'post_dislikes': 0, 'post_likes': 0, 'post_title': 'test1', 's3_image_location': "https://s3-image-storing-bucket.s3.eu-central-1.amazonaws.com/image-placeholder-1200x800-1.jpg"},
        {'id': 2, 'post_author': 'gergi', 'post_dislikes': 0, 'post_likes': 0, 'post_title': 'test2', 's3_image_location': "https://s3-image-storing-bucket.s3.eu-central-1.amazonaws.com/image-placeholder-1200x800-1.jpg"},
        {'id': 3, 'post_author': 'gergi', 'post_dislikes': 0, 'post_likes': 0, 'post_title': 'test3', 's3_image_location': "https://s3-image-storing-bucket.s3.eu-central-1.amazonaws.com/image-placeholder-1200x800-1.jpg"}
      )
  }
  openDetailPage(record): void{
    this.router.navigate([`/post/${record.id}`])
  }
  ngOnInit(): void {
    this.getRecords()
  }
}
