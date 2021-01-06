import { 
  Component, OnInit, Input, Output, OnChanges, EventEmitter
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges {

  @Input() postComment: Array<object> = [];
  @Output() countComments = new EventEmitter();
  public commentIndex = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    if(this.postComment !== undefined){
      console.log('Main array ===> ', this.postComment)
    }
  }

  removeComment(no) {
    // console.log(this.postComment[no]['comment_id'])
    this.route.params.subscribe(params => {
      this.http.delete(`https://ij9wg26fv5.execute-api.us-east-1.amazonaws.com/dev/posts/${params['id']}/comments/${this.postComment[no]['comment_id']}`).subscribe(res => {
        console.log(res)
      })
    })
    this.postComment.splice(no, 1);
    // this.http.delete()
    console.log('After remove array ====> ', this.postComment);
    this.countComments.emit(this.postComment)
  }

}
