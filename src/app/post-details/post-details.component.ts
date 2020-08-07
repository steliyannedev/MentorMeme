import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  comments: string;
  data: any = {'id': 1, 'post_author': 'gergi', 'post_dislikes': 0, 'post_likes': 0, 'post_title': 'test1', 's3_image_location': "https://s3-image-storing-bucket.s3.eu-central-1.amazonaws.com/image-placeholder-1200x800-1.jpg"}
  count = 0;
  constructor() { }

  ngOnInit(): void {
  }

  receiveComment($event) {
    this.comments = $event;
    this.count = this.comments.length;
    console.log(this.comments.length);
  }

  recieveCount($event) {
    this.comments = $event;
    this.count = this.comments.length;
  }

}
