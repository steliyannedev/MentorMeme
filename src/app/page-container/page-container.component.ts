import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Store, select } from '@ngrx/store';
import { Post } from '../models/post';
import { loadPosts } from '../new/new.actions'
import { skip } from 'rxjs/operators'
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service';
import { DragAndDropService } from '../drag-and-drop/drag-and-drop.service';
import { Hub } from '@aws-amplify/core';


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
  cachedPosts: any = [];
  currentLoggedUser;
  allLikedPostsByUser: any = [];
  allDislikedPostsByUser: any = [];
  isLogged: boolean;

  constructor(
    private router: Router, 
    private store: Store<{post: Post}>, 
    private postService: PostsService,
    private authService: AuthService,
    private dndService: DragAndDropService
  ) {}
  
  onScrollDown(){
    this.dataForDisplaying.push(...this.cachedPosts)
    this.paginator = this.paginator + 10
    this.store.dispatch(loadPosts({paginator: this.paginator, number_of_posts: 5}))
  }

  upvote(post_id){
    if(!this.allLikedPostsByUser.includes(post_id)){
      this.dataForDisplaying.forEach(element => {
        if(element['post_id'] === post_id){
          element['post_likes']++
        }
      })
      this.allLikedPostsByUser.push(post_id)
      this.allDislikedPostsByUser = this.allDislikedPostsByUser.filter(item => item !== post_id)
      this.postService.upvotePost(post_id, this.currentLoggedUser)
    }else{
      this.dataForDisplaying.forEach(element => {
        if(element['post_id'] === post_id){
          element['post_likes']--
        }
      })
      this.allLikedPostsByUser = this.allLikedPostsByUser.filter(item => item !== post_id)
      this.postService.downvotePost(post_id, this.currentLoggedUser)
    }
  }

  downvote(post_id){
    if(!this.allDislikedPostsByUser.includes(post_id)){
      this.dataForDisplaying.forEach(element => {
        if(element['post_id'] === post_id){
          element['post_likes']--
        }
      })
      this.allDislikedPostsByUser.push(post_id)
      this.allLikedPostsByUser = this.allLikedPostsByUser.filter(item => item !== post_id)
      this.postService.downvotePost(post_id, this.currentLoggedUser)
    }else{
      this.dataForDisplaying.forEach(element => {
        if(element['post_id'] === post_id){
          element['post_likes']++
        }
      })
      this.allDislikedPostsByUser = this.allDislikedPostsByUser.filter(item => item !== post_id)
      this.postService.upvotePost(post_id, this.currentLoggedUser)
    }
  }

  focusCommentbox(record){
    this.router.navigate([`/post/${record.post_id}`], {fragment: 'comments'})
  }

  openDetailPage(record): void{
    let isLiked = 0;
    if(this.allLikedPostsByUser.includes(record.post_id)){
      isLiked = 1
    }
    if(this.allDislikedPostsByUser.includes(record.post_id)){
      isLiked = -1
    }
    this.router.navigate([`/post/${record.post_id}`], {state: {'liked': isLiked}})

  }

  retrevePosts(posts): void{
    if(posts['posts'].length > 1){
      this.dataForDisplaying.push(...posts['posts'][0])
      this.cachedPosts = posts['posts'][1]
    }else{
      // if(posts['posts'].length < 5){
      //   this.dataForDisplaying.push(...posts['posts'][0])
      // }
      this.cachedPosts = posts['posts'][0]
    }
  }

  handleLikedDislikedPosts(data){
    data.forEach(element => {
      if(element.likes_dislikes == 1){
        this.allLikedPostsByUser.push(element['post_id'])
      }
      if(element.likes_dislikes == -1){
        this.allDislikedPostsByUser.push(element['post_id'])
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadPosts({paginator: this.paginator, number_of_posts: 10}))
    this.store.pipe(
      select(state => state.post),
      skip(1)
    ).subscribe(posts =>{
      this.retrevePosts(posts)
    })
    this.authService.auth$.subscribe(val => {
      console.log('val', val)
      if(val.isLoggedIn){
        this.isLogged = true
        this.postService.getLiked(val.username).subscribe(response => {
          this.handleLikedDislikedPosts(response)
        })
        this.currentLoggedUser = val.username
      }
      if(!val.isLoggedIn){
        this.allDislikedPostsByUser = []
        this.allLikedPostsByUser = []
      }
    })
    Hub.listen('auth', ({payload: {event, data, message}})=>{
      if(event = 'signIn'){
        this.dataForDisplaying = []
        this.paginator = 0
        this.store.dispatch(loadPosts({paginator: this.paginator, number_of_posts: 10}))
      }
      if(event == 'signOut'){
        this.dataForDisplaying = []
        this.paginator = 0
        this.store.dispatch(loadPosts({paginator: this.paginator, number_of_posts: 10}))
        // this.allDislikedPostsByUser = []
        // this.allLikedPostsByUser = []
      }
    })
    this.dndService.currentData.pipe(skip(1)).subscribe(asd => {
      this.dataForDisplaying = []
      this.paginator = 0
      this.store.dispatch(loadPosts({paginator: this.paginator, number_of_posts: 10}))
    })
  }
}

