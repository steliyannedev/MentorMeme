import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentboxService } from './commentbox.service'

@Component({
  selector: 'app-commentbox',
  templateUrl: './commentbox.component.html',
  styleUrls: ['./commentbox.component.scss']
})
export class CommentboxComponent implements OnInit {

  commentForm: FormGroup;
  commentInfo: Array<object> = [];
  submitted: Boolean = false;
  public id = 0;
  @Output() usercomment = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private commentboxService: CommentboxService) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
    });
  }

  onSubmit(){
    this.submitted = true;
    if(this.commentForm.invalid){
      return false
    }
    else{
      this.commentInfo.push({
        created_on: new Date(),
        commnet: this.commentForm.controls['comment'].value
      });
      this.commentboxService.saveComment(this.commentForm.controls['comment'].value, this.route.params['value']['id'])
      this.usercomment.emit(this.commentInfo)
    }
  }

}
