import { 
  Component, OnInit, Input, Output, OnChanges, EventEmitter
} from '@angular/core';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges {

  @Input() postComment: Array<object> = [];
  @Output() countComments = new EventEmitter();
  public commentIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    if(this.postComment !== undefined){
      console.log('Main array ===> ', this.postComment)
    }
  }

  removeComment(no) {
    this.postComment.splice(no, 1);
    console.log('After remove array ====> ', this.postComment);
    this.countComments.emit(this.postComment)
  }

}
