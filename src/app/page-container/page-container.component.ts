import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Store, select } from '@ngrx/store';
import { Post } from '../models/post';
import { loadPosts } from '../new/new.actions'
import { skip, take } from 'rxjs/operators'
import * as _ from 'lodash'

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss']
})
export class PageContainerComponent implements OnInit {

  dataForDisplaying: any = [];
  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 500;
  paginator = 0;
  dataPlaceholder: any = [];

  constructor(private router: Router, private store: Store<{post: Post}>) {}
  
  onScrollDown(){
    this.paginator +=10
    this.getRecords(5)
  }

  getRecords(number_of_posts){
    this.store.dispatch(loadPosts({paginator: this.paginator, number_of_posts: number_of_posts}))
    this.store.pipe(
      select(state => state.post),
      skip(1),
      take(1)
    ).subscribe(result => {
      this.dataPlaceholder.push(..._.chunk(result['initialPosts'], 5))
      if(this.dataPlaceholder.length == 1){
        this.dataForDisplaying.push(...this.dataPlaceholder[0])
      }else{
        this.dataForDisplaying.push(...this.dataPlaceholder[this.dataPlaceholder.length - 2])
      }
    })
  }

  upvote(post_id){
    this.dataForDisplaying.forEach(element => {
      if(element['post_id'] === post_id){
        element['post_likes']++
      }
    })
  }

  downvote(post_id){
    this.dataForDisplaying.forEach(element => {
      if(element['post_id'] === post_id){
        element['post_likes']--
      }
    })
  }

  focusCommentbox(record){
    this.router.navigate([`/post/${record.post_id}`], {fragment: 'comments'})
  }

  openDetailPage(record): void{
    this.router.navigate([`/post/${record.post_id}`])
  }

  ngOnInit(): void {
    this.getRecords(10)
  }
}

