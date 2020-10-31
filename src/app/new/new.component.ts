import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service'
import { Router } from '@angular/router'
import { Store, select } from '@ngrx/store';
import { Post } from '../models/post';
import { loadPosts } from './new.actions'
import { IState, initialState } from './new.reducer'
import { skip, subscribeOn } from 'rxjs/operators'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  data: any = [];
  lastBatch;
  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 500;
  start = 0
  end = 10


  constructor(private postService: PostsService, private router: Router, private store: Store<{post: Post}>) {
    
  }
  
  onScrollDown(){
    this.store.pipe(
      select(state => state.post['initialPosts']),
    ).subscribe(result => {
      this.data.push(result.slice(4,8))
    })
    this.getRecords()
  }

  getRecords(){
    this.store.dispatch(loadPosts())
    this.store.pipe(
      select(state => state.post['initialPosts']),
      skip(1)
    ).subscribe(result => {this.data.push(result.slice(1,11))})
  }

  upvote(post_id){
    this.postService.upvotePost(post_id)
  }

  downvote(post_id){
    this.postService.downvotePost(post_id)
  }

  focusCommentbox(record){
    this.router.navigate([`/post/${record.post_id}`], {fragment: 'comments'})
  }

  openDetailPage(record): void{
    this.router.navigate([`/post/${record.post_id}`])
  }

  ngOnInit(): void {
    this.getRecords()
  }
}
