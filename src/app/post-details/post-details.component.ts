import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostDetailsService } from './post-details.service'
import * as moment from 'moment'
import { AuthService } from '../auth.service';
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  comments: any = [];
  data: any = {}
  count = 0;
  uplaoded: string;
  loaded: boolean = false;
  @ViewChild('thisDiv') scrollTo: ElementRef;
  allLikedPostsByUser: any = [];
  allDislikedPostsByUser: any = [];

  constructor(
    private router: ActivatedRoute, 
    private postDetailService: PostDetailsService, 
    private authService: AuthService,
    private postService: PostsService  
  ) { }

  ngOnInit(): void {
    this.postDetailService.getPostDetails(this.router.params['value']['id']).subscribe( data => 
      {
        console.log(data)
        this.data = data; 
        this.uplaoded = moment(data['created_on']).fromNow(); 
        this.loaded = true
      })
    this.postDetailService.getPostComments(this.router.params['value']['id']).subscribe( comments => 
      {
        this.comments = comments; 
        this.count = this.comments.length
      }) 

    if(this.router.fragment['_value'] == 'comments'){
      const interval = setInterval(() => {
        this.scrollTo.nativeElement.scrollIntoView({behavior: 'smooth'})
        clearInterval(interval)
      }, 1000)
    }
    this.authService.auth$.subscribe(val => {
      if(val.isLoggedIn){
        this.postService.getLiked(val.username).subscribe(response => {
          this.handleLikedDislikedPosts(response)
        })
      }
    })
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

  receiveComment($event) {
    this.comments.push($event[0]);
    this.count = this.comments.length;
  }

  recieveCount($event) {
    this.comments = $event;
    this.count = this.comments.length;
  }

}
