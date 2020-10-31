import { 
  Component, OnInit, Input, Output, OnChanges, EventEmitter
} from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges {

  @Input() postComment: Array<object> = [];
  @Output() countComments = new EventEmitter();
  public commentIndex = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    if(this.postComment !== undefined){
      console.log('Main array ===> ', this.postComment)
    }
  }

  removeComment(no) {
    console.log(no)
    this.postComment.splice(no, 1);
    // this.http.delete()
    console.log('After remove array ====> ', this.postComment);
    this.countComments.emit(this.postComment)
  }

}
